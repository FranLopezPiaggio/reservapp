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
}

interface Service {
  id: string;
  name: string;
  duration_minutes: number;
  price: number;
  is_active: boolean;
}

interface ResourceService {
  service_id: string;
  duration_minutes: number | null;
  price_override: number | null;
  is_active: boolean;
}

export default function CMSResourceServicesPage({ params }: ResourcePageProps) {
  const router = useRouter();
  const [resource, setResource] = useState<Resource | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [resourceServices, setResourceServices] = useState<Map<string, ResourceService>>(new Map());
  const [loading, setLoading] = useState(true);
  const [resourceId, setResourceId] = useState<string>("");

  useEffect(() => {
    params.then(async (p) => {
      setResourceId(p.id);
      await loadData(p.id);
    });
  }, [params]);

  const loadData = async (id: string) => {
    try {
      const supabase = createClient();

      // Load resource
      const { data: resourceData, error: resourceError } = await supabase
        .from("resources")
        .select("id, name")
        .eq("id", id)
        .single();

      if (resourceError) throw resourceError;
      setResource(resourceData);

      // Load all services
      const { data: servicesData, error: servicesError } = await supabase
        .from("services")
        .select("*")
        .order("name");

      if (servicesError) throw servicesError;
      setServices(servicesData || []);

      // Load resource-service mappings
      const { data: rsData, error: rsError } = await supabase
        .from("resource_services")
        .select("service_id, duration_minutes, price_override, is_active")
        .eq("resource_id", id);

      if (rsError) throw rsError;

      // Build map
      const rsMap = new Map<string, ResourceService>();
      (rsData || []).forEach((rs) => {
        rsMap.set(rs.service_id, rs);
      });
      setResourceServices(rsMap);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleService = async (
    serviceId: string,
    currentlyActive: boolean
  ) => {
    try {
      const supabase = createClient();

      if (currentlyActive) {
        // Remove mapping
        const { error } = await supabase
          .from("resource_services")
          .delete()
          .match({ resource_id: resourceId, service_id: serviceId });

        if (error) throw error;
      } else {
        // Add mapping
        const { error } = await supabase
          .from("resource_services")
          .insert({
            resource_id: resourceId,
            service_id: serviceId,
            is_active: true,
          });

        if (error) throw error;
      }

      // Reload mappings
      const { data: rsData, error: rsError } = await supabase
        .from("resource_services")
        .select("service_id, duration_minutes, price_override, is_active")
        .eq("resource_id", resourceId);

      if (rsError) throw rsError;

      const rsMap = new Map<string, ResourceService>();
      (rsData || []).forEach((rs) => {
        rsMap.set(rs.service_id, rs);
      });
      setResourceServices(rsMap);
    } catch (error) {
      console.error("Error toggling service:", error);
    }
  };

  const handleOverrideChange = async (
    serviceId: string,
    field: "duration_minutes" | "price_override",
    value: number | null
  ) => {
    try {
      const supabase = createClient();

      // Get current mapping or create new
      const current = resourceServices.get(serviceId);
      const updateData: any = {
        [field]: value,
      };

      if (current) {
        // Update existing
        const { error } = await supabase
          .from("resource_services")
          .update(updateData)
          .match({ resource_id: resourceId, service_id: serviceId });

        if (error) throw error;
      } else {
        // Create new
        const { error } = await supabase.from("resource_services").insert({
          resource_id: resourceId,
          service_id: serviceId,
          [field]: value,
          is_active: true,
        });

        if (error) throw error;
      }

      // Reload
      await loadData(resourceId);
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
    <div>
      <div className="mb-8">
        <Link
          href="/cms/resources"
          className="text-sm text-gray-500 hover:text-gray-700 mb-2 block"
        >
          ← Volver a Recursos
        </Link>
        <h1 className="text-2xl font-bold text-black">
          Servicios: {resource.name}
        </h1>
        <p className="text-gray-500 mt-1">
          Selecciona los servicios que este recurso puede ofrecer
        </p>
      </div>

      {services.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-6 text-center text-gray-500">
          No hay servicios creados.{" "}
          <Link href="/cms/services" className="text-black underline">
            Crea servicios primero
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                  Servicio
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
              {services.map((service) => {
                const rs = resourceServices.get(service.id);
                const isMapped = !!rs;
                const isActive = rs?.is_active ?? false;

                return (
                  <tr key={service.id} className={!isMapped ? "opacity-50" : ""}>
                    <td className="px-6 py-4">
                      <div className="font-medium text-black">{service.name}</div>
                      <div className="text-sm text-gray-500">
                        Base: {service.duration_minutes} min / ${Number(service.price).toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={isMapped && isActive}
                        onChange={() =>
                          handleToggleService(service.id, isMapped)
                        }
                        className="w-4 h-4"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        min="1"
                        disabled={!isMapped}
                        value={
                          rs?.duration_minutes ??
                          service.duration_minutes
                        }
                        onChange={(e) =>
                          handleOverrideChange(
                            service.id,
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
                        disabled={!isMapped}
                        value={rs?.price_override ?? ""}
                        onChange={(e) =>
                          handleOverrideChange(
                            service.id,
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
          <strong>Cómo funciona:</strong> Cuando un servicio está marcado como
          "Activo", ese recurso puede ofrecerlo. Los campos de duración y precio
          permiten personalizar el valor solo para este recurso (opcional).
        </p>
      </div>
    </div>
  );
}