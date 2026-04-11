"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { getTenantIdFromJWT } from "@/lib/supabase/tenant-jwt";
import ResourceCard from "./ResourceCard";

interface Resource {
  id: string;
  name: string;
  description: string | null;
  capacity: number | null;
  is_active: boolean;
  created_at: string;
}

export default function ResourcesList() {
  const supabase = createClient();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [tenantId, setTenantId] = useState<string | null>(null);

  useEffect(() => {
    getTenantIdFromJWT().then(tid => {
      setTenantId(tid);
      loadResources(tid);
    });
  }, []);

  const loadResources = async (tid: string | null) => {
    if (!tid) {
      setLoading(false);
      return;
    }
    try {
      const { data, error } = await supabase
        .from("resources")
        .select("*")
        .eq("tenant_id", tid)
        .order("name");

      if (error) throw error;
      setResources(data || []);
    } catch (error) {
      console.error("Error loading resources:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (resource: Resource) => {
    setEditingResource(resource);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este recurso?")) return;
    try {
      const { error } = await supabase.from("resources").delete().eq("id", id);
      if (error) throw error;
      loadResources(tenantId);
    } catch (error) {
      console.error("Error deleting resource:", error);
    }
  };

  const toggleActive = async (id: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from("resources")
        .update({ is_active: !isActive })
        .eq("id", id);

      if (error) throw error;
      loadResources(tenantId);
    } catch (error) {
      console.error("Error toggling resource:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-black">Recursos</h1>
          <p className="text-gray-500 mt-1">
            Gestiona tus recursos físicos (sillas, canchas, boxes)
          </p>
        </div>
        <button
          onClick={() => {
            setEditingResource(null);
            setShowModal(true);
          }}
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
        >
          + Nuevo Recurso
        </button>
      </div>

      {/* Resources Grid */}
      {resources.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-6 text-center text-gray-500">
          No hay recursos todavía. ¡Crea tu primer recurso!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className={`bg-white rounded-xl border border-gray-100 p-6 ${
                !resource.is_active && "opacity-60"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-black">{resource.name}</h3>
                  {resource.description && (
                    <p className="text-sm text-gray-500 mt-1">{resource.description}</p>
                  )}
                </div>
                {resource.capacity && (
                  <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                    Cap: {resource.capacity}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <button
                  onClick={() => toggleActive(resource.id, resource.is_active)}
                  className={`text-sm ${
                    resource.is_active ? "text-green-600" : "text-gray-400"
                  } hover:underline`}
                >
                  {resource.is_active ? "Activo" : "Inactivo"}
                </button>

                <div className="flex gap-3">
                  <a
                    href={`/cms/resources/${resource.id}`}
                    className="text-sm text-gray-600 hover:underline"
                  >
                    Editar
                  </a>
                  <a
                    href={`/cms/resources/${resource.id}/services`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Servicios
                  </a>
                  <button
                    onClick={() => handleDelete(resource.id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for quick add */}
      {showModal && (
        <ResourceFormModal
          resource={editingResource}
          tenantId={tenantId}
          onClose={() => {
            setShowModal(false);
            setEditingResource(null);
          }}
          onSuccess={() => {
            setShowModal(false);
            setEditingResource(null);
            loadResources(tenantId);
          }}
        />
      )}
    </div>
  );
}

// Inline modal component to avoid extra file for now
function ResourceFormModal({
  resource,
  onClose,
  onSuccess,
  tenantId,
}: {
  resource?: Resource | null;
  onClose: () => void;
  onSuccess: () => void;
  tenantId: string | null;
}) {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: resource?.name || "",
    description: resource?.description || "",
    capacity: resource?.capacity || 1,
    is_active: resource?.is_active ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (resource) {
        const { error } = await supabase
          .from("resources")
          .update({
            name: formData.name,
            description: formData.description || null,
            capacity: formData.capacity,
            is_active: formData.is_active,
          })
          .eq("id", resource.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("resources").insert({
          name: formData.name,
          description: formData.description || null,
          capacity: formData.capacity,
          is_active: formData.is_active,
          // tenant_id is auto-set by trigger
        });

        if (error) throw error;
      }

      onSuccess();
    } catch (error) {
      console.error("Error saving resource:", error);
      alert("Error al guardar el recurso");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {resource ? "Editar Recurso" : "Nuevo Recurso"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ej: Barber 1, Cancha 1"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
              rows={2}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Capacidad
            </label>
            <input
              type="number"
              min="1"
              value={formData.capacity}
              onChange={(e) =>
                setFormData({ ...formData, capacity: parseInt(e.target.value) || 1 })
              }
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_active"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              className="w-4 h-4"
            />
            <label htmlFor="is_active" className="text-sm text-gray-700">
              Recurso activo
            </label>
          </div>
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
            >
              {loading ? "..." : resource ? "Guardar" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}