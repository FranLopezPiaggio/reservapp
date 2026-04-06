"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { getCurrentTenant } from "@/lib/tenant";

interface AppointmentFormatted {
  id: string;
  customer_name: string;
  customer_email: string;
  date: string;
  time: string;
  service: string;
  status: string;
}

interface Stats {
  totalBookings: number;
  todayBookings: number;
  weekBookings: number;
  customers: number;
}

export default function CMSDashboard() {
  const supabase = createClient();
  const [tenant, setTenant] = useState<{ name: string; slug: string } | null>(null);
  const [stats, setStats] = useState<Stats>({
    totalBookings: 0,
    todayBookings: 0,
    weekBookings: 0,
    customers: 0,
  });
  const [recentBookings, setRecentBookings] = useState<AppointmentFormatted[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Get current tenant
      const tenantData = await getCurrentTenant();
      if (tenantData) {
        setTenant({ name: tenantData.name, slug: tenantData.slug });
      }

      const today = new Date();
      const todayStr = today.toISOString().split("T")[0];
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();

      // Fetch appointments (RLS will filter by tenant automatically)
      const { data: appointments } = await supabase
        .from("appointments")
        .select("id, customer_name, customer_email, start_time, status, services(name)")
        .order("start_time", { ascending: false })
        .limit(10);

      // Fetch customers count
      const { count: customersCount } = await supabase
        .from("customers")
        .select("*", { count: "exact", head: true });

      // Calculate stats
      const totalBookings = appointments?.length || 0;
      const todayBookings = appointments?.filter(
        (a) => a.start_time.startsWith(todayStr)
      ).length || 0;
      const weekBookings = appointments?.filter(
        (a) => new Date(a.start_time) >= new Date(weekAgo)
      ).length || 0;

      setStats({
        totalBookings,
        todayBookings,
        weekBookings,
        customers: customersCount || 0,
      });

      // Format appointments for display
      const formattedAppointments: AppointmentFormatted[] = (appointments || []).map((apt) => ({
        id: apt.id,
        customer_name: apt.customer_name,
        customer_email: apt.customer_email || "",
        date: apt.start_time.split("T")[0],
        time: apt.start_time.split("T")[1]?.slice(0, 5) || "",
        service: Array.isArray(apt.services) ? apt.services[0]?.name || "Servicio" : (apt.services as unknown as { name: string })?.name || "Servicio",
        status: apt.status,
      }));

      setRecentBookings(formattedAppointments);
    } catch (error) {
      console.error("Error loading dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      label: "Total Reservas",
      value: stats.totalBookings,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: "Hoy",
      value: stats.todayBookings,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: "Esta Semana",
      value: stats.weekBookings,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      label: "Clientes",
      value: stats.customers,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* Tenant Header */}
      {tenant && (
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Dashboard</h1>
            <p className="text-gray-500">{tenant.name}</p>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">{stat.label}</span>
              <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-600">
                {stat.icon}
              </div>
            </div>
            <div className="text-3xl font-bold text-black">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-black">Reservas Recientes</h2>
        </div>
        {recentBookings.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No hay reservas todavía. ¡Crea tu primera reserva!
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
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-black">{booking.customer_name}</div>
                      <div className="text-sm text-gray-500">{booking.customer_email}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{booking.service}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{booking.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{booking.time}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        booking.status === "confirmed" ? "bg-green-100 text-green-700" :
                        booking.status === "completed" ? "bg-blue-100 text-blue-700" :
                        booking.status === "cancelled" ? "bg-red-100 text-red-700" :
                        "bg-yellow-100 text-yellow-700"
                      }`}>
                        {booking.status === "confirmed" ? "Confirmada" :
                         booking.status === "completed" ? "Completada" :
                         booking.status === "cancelled" ? "Cancelada" : "Pendiente"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
