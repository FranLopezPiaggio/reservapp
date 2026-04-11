"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface ResourcePageProps {
  params: Promise<{
    id: string;
  }>;
}

interface Resource {
  id: string;
  name: string;
  description: string | null;
  capacity: number | null;
  is_active: boolean;
  created_at: string;
}

export default function CMSResourceEditPage({ params }: ResourcePageProps) {
  const router = useRouter();
  const [resource, setResource] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);
  const [resourceId, setResourceId] = useState<string>("");

  useEffect(() => {
    params.then((p) => {
      setResourceId(p.id);
      loadResource(p.id);
    });
  }, [params]);

  const loadResource = async (id: string) => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("resources")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setResource(data);
    } catch (error) {
      console.error("Error loading resource:", error);
      router.push("/cms/resources");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (formData: {
    name: string;
    description: string;
    capacity: number;
    is_active: boolean;
  }) => {
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("resources")
        .update({
          name: formData.name,
          description: formData.description || null,
          capacity: formData.capacity,
          is_active: formData.is_active,
        })
        .eq("id", resourceId);

      if (error) throw error;
      router.push("/cms/resources");
    } catch (error) {
      console.error("Error saving resource:", error);
      alert("Error al guardar el recurso");
    }
  };

  const handleDelete = async () => {
    if (!confirm("¿Estás seguro de eliminar este recurso?")) return;
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("resources")
        .delete()
        .eq("id", resourceId);

      if (error) throw error;
      router.push("/cms/resources");
    } catch (error) {
      console.error("Error deleting resource:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Recurso no encontrado</p>
        <Link href="/cms/resources" className="text-black underline mt-2 block">
          Volver a Recursos
        </Link>
      </div>
    );
  }

  return (
    <ResourceEditForm
      resource={resource}
      onSave={handleSave}
      onDelete={handleDelete}
      onCancel={() => router.push("/cms/resources")}
    />
  );
}

// Inline form component
function ResourceEditForm({
  resource,
  onSave,
  onDelete,
  onCancel,
}: {
  resource: Resource;
  onSave: (data: {
    name: string;
    description: string;
    capacity: number;
    is_active: boolean;
  }) => void;
  onDelete: () => void;
  onCancel: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: resource.name,
    description: resource.description || "",
    capacity: resource.capacity || 1,
    is_active: resource.is_active,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    onSave(formData);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link
            href="/cms/resources"
            className="text-sm text-gray-500 hover:text-gray-700 mb-2 block"
          >
            ← Volver a Recursos
          </Link>
          <h1 className="text-2xl font-bold text-black">Editar Recurso</h1>
        </div>
        <button
          onClick={onDelete}
          className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
        >
          Eliminar Recurso
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6 max-w-md">
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
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
              rows={3}
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
                setFormData({
                  ...formData,
                  capacity: parseInt(e.target.value) || 1,
                })
              }
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_active"
              checked={formData.is_active}
              onChange={(e) =>
                setFormData({ ...formData, is_active: e.target.checked })
              }
              className="w-4 h-4"
            />
            <label htmlFor="is_active" className="text-sm text-gray-700">
              Recurso activo
            </label>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
            >
              {loading ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>

      {/* Services Link */}
      <div className="mt-8">
        <Link
          href={`/cms/resources/${resource.id}/services`}
          className="inline-flex items-center gap-2 text-blue-600 hover:underline"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          Gestionar servicios para este recurso
        </Link>
      </div>
    </div>
  );
}