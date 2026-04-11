"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface ServicePageProps {
  params: Promise<{
    id: string;
  }>;
}

interface Service {
  id: string;
  name: string;
  duration_minutes: number;
  price: number;
  description: string | null;
}

interface Resource {
  id: string;
  name: string;
  is_active: boolean;
}

interface ResourceService {
  resource_id: string;
  duration_minutes: number | null;
  price_override: number | null;
  is_active: boolean;
}

export default function CMSServicesResourcesPage({ params }: ServicePageProps) {
  const router = useRouter();
  const [service, setService] = useState<Service | null>(null);
  const [resources, setResources] = useState<Resource[]>([]);
  const [resourceServices, setResourceServices] = useState<Map<string, ResourceService>>(new Map());
  const [loading, setLoading] = useState(true);
  const [serviceId, setServiceId] = useState<string>("");

  useEffect(() => {
    params.then(async (p) => {
      setServiceId(p.id);
      await loadData(p.id);
    });
  }, [params]);

  const loadData = async (id: string) => {
    try {
      const supabase = createClient();

      // Load service
      const { data: serviceData, error: serviceError } = await supabase
        .from("services")
        .select("*")
        .eq("id", id)
        .single();

      if (serviceError) throw serviceError;
      setService(serviceData);

      // Load all resources
      const { data: resourcesData, error: resourcesError } = await supabase
        .from("resources")
        .select("id, name, is_active")
        .order("name");

      if (resourcesError) throw resourcesError;
      setResources(resourcesData || []);

      // Load resource-service mappings for this service
      const { data: rsData, error: rsError } = await supabase
        .from("resource_services")
        .select("resource_id, duration_minutes, price_override, is_active")
        .eq("service_id", id);

      if (rsError) throw rsError;

      // Build map
      const rsMap = new Map<string, ResourceService>();
      (rsData || []).forEach((rs) => {
        rsMap.set(rs.resource_id, rs);
      });
      setResourceServices(rsMap);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleResource = async (
    resourceId: string,
    currentlyActive: boolean
  ) => {
    try {
      const supabase = createClient();

      if (currentlyActive) {
        // Remove mapping
        const { error } = await supabase
          .from("resource_services")
          .delete()
          .match({ service_id: serviceId, resource_id: resourceId });

        if (error) throw error;
      } else {
        // Add mapping
        const { error } = await supabase
          .from("resource_services")
          .insert({
            service_id: serviceId,
            resource_id: resourceId,
            is_active: true,
          });

        if (error) throw error;
      }

      // Reload mappings
      const { data: rsData, error: rsError } = await supabase
        .from("resource_services")
        .select("resource_id, duration_minutes, price_override, is_active")
        .eq("service_id", serviceId);

      if (rsError) throw rsError;

      const rsMap = new Map<string, ResourceService>();
      (rsData || []).forEach((rs) => {
        rsMap.set(rs.resource_id, rs);
      });
      setResourceServices(rsMap);
    } catch (error) {
      console.error("Error toggling resource:", error);
    }
  };

  const handleOverrideChange = async (
    resourceId: string,
    field: "duration_minutes" | "price_override",
    value: number | null
  ) => {
    try {
      const supabase = createClient();
      const current = resourceServices.get(resourceId);
      const updateData: any = {
        [field]: value,
      };

      if (current) {
        const { error } = await supabase
          .from("resource_services")
          .update(updateData)
          .match({ service_id: serviceId, resource_id: resourceId });

        if (error) throw error;
      } else {
        const { error } = await supabase.from("resource_services").insert({
          service_id: serviceId,
          resource_id: resourceId,
          [field]: value,
          is_active: true,
        });

        if (error) throw error;
      }

      await loadData(serviceId);
    } catch (error) {
      console.error("Error updating override:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Servicio no encontrado</p>
        <Link href="/cms/services" className="text-black underline mt-2 block">
          Volver a Servicios
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/cms/services"
          className="text-sm text-gray-500 hover:text-gray-700 mb-2 block"
        >
          ← Volver a Servicios
        </Link>
        <h1 className="text-2xl font-bold text-black">
          Recursos: {service.name}
        </h1>
        <p className="text-gray-500 mt-1">
          Selecciona qué recursos pueden ofrecer este servicio
        </p>
      </div>

      {resources.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-6 text-center text-gray-500">
          No hay recursos creados.{" "}
          <Link href="/cms/resources" className="text-black underline">
            Crea recursos primero
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                  Recurso
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                  Activo
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500 w-32">
                  Duración (min)
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500 w-32">
                  Precio override
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {resources.map((resource) => {
                const rs = resourceServices.get(resource.id);
                const isMapped = !!rs;
                const isActive = rs?.is_active ?? false;

                return (
                  <tr
                    key={resource.id}
                    className={
                      !isMapped || !resource.is_active ? "opacity-50" : ""
                    }
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-black">{resource.name}</div>
                      <div className="text-sm text-gray-500">
                        {resource.is_active ? "Activo" : "Inactivo"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={isMapped && isActive}
                        onChange={() =>
                          handleToggleResource(resource.id, isMapped)
                        }
                        disabled={!resource.is_active}
                        className="w-4 h-4 disabled:opacity-30"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        min="1"
                        disabled={!isMapped || !resource.is_active}
                        value={rs?.duration_minutes ?? service.duration_minutes}
                        onChange={(e) =>
                          handleOverrideChange(
                            resource.id,
                            "duration_minutes",
                            parseInt(e.target.value) || null
                          )
                        }
                        className="w-20 px-2 py-1 border border-gray-200 rounded disabled:opacity-50"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        disabled={!isMapped || !resource.is_active}
                        value={rs?.price_override ?? ""}
                        onChange={(e) =>
                          handleOverrideChange(
                            resource.id,
                            "price_override",
                            parseFloat(e.target.value) || null
                          )
                        }
                        placeholder={`$${service.price}`}
                        className="w-24 px-2 py-1 border border-gray-200 rounded disabled:opacity-50"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6 text-sm text-gray-500">
        <p>
          <strong>Cómo funciona:</strong> Cuando un recurso está marcado
          como "Activo" y linked a este servicio, puede realizarlo. Los campos
          de duración y precio permiten personalizar solo para este servicio
          (opcional).
        </p>
      </div>
    </div>
  );
}