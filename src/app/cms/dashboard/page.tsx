"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface Booking {
  id: string;
  customer_name: string;
  customer_email: string;
  date: string;
  time: string;
  service: string;
  status: string;
  created_at: string;
}

interface Stats {
  totalBookings: number;
  todayBookings: number;
  weekBookings: number;
  customers: number;
}

export default function CMSDashboard() {
  const supabase = createClient();
  const [stats, setStats] = useState<Stats>({
    totalBookings: 0,
    todayBookings: 0,
    weekBookings: 0,
    customers: 0,
  });
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // In production, fetch from Supabase
      // For now, use mock data
      setStats({
        totalBookings: 156,
        todayBookings: 12,
        weekBookings: 48,
        customers: 89,
      });

      setRecentBookings([
        {
          id: "1",
          customer_name: "María García",
          customer_email: "maria@email.com",
          date: "2026-04-01",
          time: "10:00",
          service: "Corte de pelo",
          status: "confirmed",
          created_at: "2026-04-01T08:00:00Z",
        },
        {
          id: "2",
          customer_name: "Juan Pérez",
          customer_email: "juan@email.com",
          date: "2026-04-01",
          time: "11:30",
          service: "Afeitado",
          status: "confirmed",
          created_at: "2026-04-01T08:30:00Z",
        },
        {
          id: "3",
          customer_name: "Carlos López",
          customer_email: "carlos@email.com",
          date: "2026-04-01",
          time: "14:00",
          service: "Tratamiento capilar",
          status: "pending",
          created_at: "2026-04-01T09:00:00Z",
        },
      ]);
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
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      label: "Hoy",
      value: stats.todayBookings,
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      label: "Esta Semana",
      value: stats.weekBookings,
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
    {
      label: "Clientes",
      value: stats.customers,
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
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
      <h1 className="text-2xl font-bold text-black mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl p-6 border border-gray-100"
          >
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
          <h2 className="text-lg font-semibold text-black">
            Reservas Recientes
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Servicio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Hora
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-black">
                      {booking.customer_name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {booking.customer_email}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {booking.service}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {booking.date}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {booking.time}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {booking.status === "confirmed"
                        ? "Confirmada"
                        : "Pendiente"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
