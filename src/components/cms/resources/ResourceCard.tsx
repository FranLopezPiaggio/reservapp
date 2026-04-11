"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface Resource {
  id: string;
  name: string;
  description: string | null;
  capacity: number | null;
  is_active: boolean;
  created_at: string;
}

interface ResourceCardProps {
  resource: Resource;
  onRefresh: () => void;
}

export default function ResourceCard({ resource, onRefresh }: ResourceCardProps) {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  const handleToggleActive = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("resources")
        .update({ is_active: !resource.is_active })
        .eq("id", resource.id);

      if (error) throw error;
      onRefresh();
    } catch (error) {
      console.error("Error toggling resource:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("¿Estás seguro de eliminar este recurso?")) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from("resources")
        .delete()
        .eq("id", resource.id);

      if (error) throw error;
      onRefresh();
    } catch (error) {
      console.error("Error deleting resource:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
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
          onClick={handleToggleActive}
          disabled={loading}
          className={`text-sm ${
            resource.is_active ? "text-green-600" : "text-gray-400"
          } hover:underline disabled:opacity-50`}
        >
          {resource.is_active ? "Activo" : "Inactivo"}
        </button>
        
        <div className="flex gap-3">
          <Link
            href={`/cms/resources/${resource.id}`}
            className="text-sm text-gray-600 hover:underline"
          >
            Editar
          </Link>
          <Link
            href={`/cms/resources/${resource.id}/services`}
            className="text-sm text-blue-600 hover:underline"
          >
            Servicios
          </Link>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="text-sm text-red-600 hover:underline disabled:opacity-50"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}