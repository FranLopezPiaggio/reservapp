"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface Resource {
  id: string;
  name: string;
  is_active: boolean;
}

interface ScheduleException {
  id: string;
  tenant_id: string;
  resource_id: string | null;
  date: string;
  start_time: string | null;
  end_time: string | null;
  is_closure: boolean;
  reason: string | null;
  created_at: string;
}

export default function CMSExceptionsPage() {
  const supabase = createClient();
  const [resources, setResources] = useState<Resource[]>([]);
  const [exceptions, setExceptions] = useState<ScheduleException[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingException, setEditingException] = useState<ScheduleException | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    resource_id: "",
    date: "",
    start_time: "",
    end_time: "",
    is_closure: true,
    reason: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Load resources
      const { data: resourcesData, error: resourcesError } = await supabase
        .from("resources")
        .select("id, name, is_active")
        .order("name");

      if (resourcesError) throw resourcesError;
      setResources(resourcesData || []);

      // Load exceptions
      const { data: exceptionsData, error: exceptionsError } = await supabase
        .from("schedule_exceptions")
        .select("*")
        .order("date", { ascending: true });

      if (exceptionsError) throw exceptionsError;
      setExceptions(exceptionsData || []);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        resource_id: formData.resource_id || null,
        date: formData.date,
        start_time: formData.start_time || null,
        end_time: formData.end_time || null,
        is_closure: formData.is_closure,
        reason: formData.reason || null,
      };

      if (editingException) {
        const { error } = await supabase
          .from("schedule_exceptions")
          .update(data)
          .eq("id", editingException.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("schedule_exceptions").insert(data);

        if (error) throw error;
      }

      setShowModal(false);
      setEditingException(null);
      resetForm();
      loadData();
    } catch (error) {
      console.error("Error saving exception:", error);
    }
  };

  const handleEdit = (exception: ScheduleException) => {
    setEditingException(exception);
    setFormData({
      resource_id: exception.resource_id || "",
      date: exception.date,
      start_time: exception.start_time || "",
      end_time: exception.end_time || "",
      is_closure: exception.is_closure,
      reason: exception.reason || "",
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar esta excepción?")) return;
    try {
      const { error } = await supabase
        .from("schedule_exceptions")
        .delete()
        .eq("id", id);

      if (error) throw error;
      loadData();
    } catch (error) {
      console.error("Error deleting exception:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      resource_id: "",
      date: "",
      start_time: "",
      end_time: "",
      is_closure: true,
      reason: "",
    });
  };

  const openNew = () => {
    resetForm();
    setEditingException(null);
    setShowModal(true);
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
          <h1 className="text-2xl font-bold text-black">Excepciones</h1>
          <p className="text-gray-500 mt-1">
            Gestiona días festivos, cierres extraordinarios y horarios especiales
          </p>
        </div>
        <button
          onClick={openNew}
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
        >
          + Nueva Excepción
        </button>
      </div>

      {/* Exceptions List */}
      {exceptions.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-6 text-center text-gray-500">
          No hay excepciones programadas. ¡Agrega un cierre festivo o especial!
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                  Fecha
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                  Recurso
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                  Tipo
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                  Horario
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                  Razón
                </th>
                <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {exceptions.map((exception) => {
                const resource = resources.find((r) => r.id === exception.resource_id);
                return (
                  <tr key={exception.id}>
                    <td className="px-6 py-4 text-sm text-black">
                      {new Date(exception.date).toLocaleDateString("es-AR", {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {resource?.name || "Todos"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          exception.is_closure
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {exception.is_closure ? "Cierre" : "Especial"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {exception.is_closure
                        ? "Cerrado"
                        : `${exception.start_time || "?"} - ${exception.end_time || "?"}`}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {exception.reason || "-"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleEdit(exception)}
                        className="text-sm text-gray-600 hover:underline mr-3"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(exception.id)}
                        className="text-sm text-red-600 hover:underline"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingException ? "Editar Excepción" : "Nueva Excepción"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recurso (opcional)
                </label>
                <select
                  value={formData.resource_id}
                  onChange={(e) =>
                    setFormData({ ...formData, resource_id: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                >
                  <option value="">Todos los recursos</option>
                  {resources.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha *
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                />
              </div>

              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  id="is_closure"
                  checked={formData.is_closure}
                  onChange={(e) =>
                    setFormData({ ...formData, is_closure: e.target.checked })
                  }
                  className="w-4 h-4"
                />
                <label htmlFor="is_closure" className="text-sm text-gray-700">
                  Es cierre total (día completo cerrado)
                </label>
              </div>

              {!formData.is_closure && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hora inicio
                    </label>
                    <input
                      type="time"
                      value={formData.start_time}
                      onChange={(e) =>
                        setFormData({ ...formData, start_time: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hora fin
                    </label>
                    <input
                      type="time"
                      value={formData.end_time}
                      onChange={(e) =>
                        setFormData({ ...formData, end_time: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Razón
                </label>
                <input
                  type="text"
                  value={formData.reason}
                  onChange={(e) =>
                    setFormData({ ...formData, reason: e.target.value })
                  }
                  placeholder="Ej: Navidad, Feriado, Mantenimiento"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingException(null);
                    resetForm();
                  }}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                >
                  {editingException ? "Guardar" : "Crear"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mt-8 text-sm text-gray-500">
        <p>
          <strong>Cómo funciona:</strong> Las excepciones override el horario
          regular. Usa "Cierre" para días cerrados (festivos) y "Especial" para horarios
          reducidos o extendidos.
        </p>
      </div>
    </div>
  );
}