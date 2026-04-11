"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface ResourceFormProps {
  resource?: {
    id: string;
    name: string;
    description: string | null;
    capacity: number | null;
    is_active: boolean;
  };
  onSuccess: () => void;
  onCancel: () => void;
}

export default function ResourceForm({ resource, onSuccess, onCancel }: ResourceFormProps) {
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
        // Update existing
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
        // Create new
        const { error } = await supabase.from("resources").insert({
          name: formData.name,
          description: formData.description || null,
          capacity: formData.capacity,
          is_active: formData.is_active,
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
          placeholder="Ej: Barber 1, Cancha 1, Box 1"
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
          placeholder="Descripción opcional del recurso"
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
            setFormData({ ...formData, capacity: parseInt(e.target.value) || 1 })
          }
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
        />
        <p className="text-xs text-gray-500 mt-1">
          Número de personas/atenciones simultáneas que puede atender este recurso
        </p>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="is_active"
          checked={formData.is_active}
          onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
          className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
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
          {loading ? "Guardando..." : resource ? "Guardar" : "Crear"}
        </button>
      </div>
    </form>
  );
}