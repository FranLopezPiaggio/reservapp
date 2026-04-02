"use client";

import { useState, useEffect } from "react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  total_bookings: number;
  last_booking: string;
  created_at: string;
}

export default function CMSCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      // Mock data - in production, fetch from Supabase
      setCustomers([
        {
          id: "1",
          name: "María García",
          email: "maria@email.com",
          phone: "+34 612 345 678",
          total_bookings: 12,
          last_booking: "2026-04-01",
          created_at: "2025-06-15",
        },
        {
          id: "2",
          name: "Juan Pérez",
          email: "juan@email.com",
          phone: "+34 612 345 679",
          total_bookings: 8,
          last_booking: "2026-03-28",
          created_at: "2025-08-20",
        },
        {
          id: "3",
          name: "Carlos López",
          email: "carlos@email.com",
          phone: "+34 612 345 680",
          total_bookings: 5,
          last_booking: "2026-03-15",
          created_at: "2025-10-05",
        },
        {
          id: "4",
          name: "Ana Martínez",
          email: "ana@email.com",
          phone: "+34 612 345 681",
          total_bookings: 15,
          last_booking: "2026-04-01",
          created_at: "2025-03-10",
        },
      ]);
    } catch (error) {
      console.error("Error loading customers:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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
        <h1 className="text-2xl font-bold text-black">Clientes</h1>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar clientes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 px-4 py-2 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Teléfono
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Total Reservas
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Última Reserva
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Cliente desde
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-black">
                      {customer.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {customer.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {customer.phone}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-black">
                      {customer.total_bookings}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {customer.last_booking}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {customer.created_at}
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
