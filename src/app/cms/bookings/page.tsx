"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface Appointment {
  id: string;
  customer_name: string;
  customer_email: string | null;
  customer_phone: string | null;
  start_time: string;
  status: string;
  services: unknown;
}

export default function CMSBookings() {
  const supabase = createClient();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    loadAppointments();
  }, [filter]);

  const loadAppointments = async () => {
    try {
      let query = supabase
        .from("appointments")
        .select("id, customer_name, customer_email, customer_phone, start_time, status, services(name)")
        .order("start_time", { ascending: false });

      if (filter !== "all") {
        query = query.eq("status", filter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setAppointments(data || []);
    } catch (error) {
      console.error("Error loading appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("appointments")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;
      loadAppointments();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-700",
      confirmed: "bg-green-100 text-green-700",
      completed: "bg-blue-100 text-blue-700",
      cancelled: "bg-red-100 text-red-700",
      "no-show": "bg-gray-100 text-gray-700",
    };
    const labels: Record<string, string> = {
      pending: "Pendiente",
      confirmed: "Confirmada",
      completed: "Completada",
      cancelled: "Cancelada",
      "no-show": "No asistio",
    };
    return { style: styles[status] || styles.pending, label: labels[status] || status };
  };

  const getServiceName = (services: unknown): string => {
    if (!services || !Array.isArray(services) || services.length === 0) return "Servicio";
    const first = services[0] as { name?: string };
    return first?.name || "Servicio";
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
        <h1 className="text-2xl font-bold text-black">Reservas</h1>

        {/* Filter */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
        >
          <option value="all">Todas</option>
          <option value="pending">Pendientes</option>
          <option value="confirmed">Confirmadas</option>
          <option value="completed">Completadas</option>
          <option value="cancelled">Canceladas</option>
        </select>
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {appointments.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No hay reservas todavía.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Servicio</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hora</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {appointments.map((apt) => {
                  const date = apt.start_time.split("T")[0];
                  const time = apt.start_time.split("T")[1]?.slice(0, 5) || "";
                  const badge = getStatusBadge(apt.status);
                  return (
                    <tr key={apt.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-black">{apt.customer_name}</div>
                        <div className="text-sm text-gray-500">{apt.customer_email}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {getServiceName(apt.services)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{date}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{time}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${badge.style}`}>
                          {badge.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {apt.status === "pending" && (
                            <>
                              <button
                                onClick={() => updateStatus(apt.id, "confirmed")}
                                className="text-xs text-green-600 hover:underline"
                              >
                                Confirmar
                              </button>
                              <button
                                onClick={() => updateStatus(apt.id, "cancelled")}
                                className="text-xs text-red-600 hover:underline"
                              >
                                Cancelar
                              </button>
                            </>
                          )}
                          {apt.status === "confirmed" && (
                            <button
                              onClick={() => updateStatus(apt.id, "completed")}
                              className="text-xs text-blue-600 hover:underline"
                            >
                              Completar
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
