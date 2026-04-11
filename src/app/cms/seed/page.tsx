"use client";

import { useState } from "react";
import Link from "next/link";
import { seedDemoData, hasSeedData } from "@/lib/seed/demo-data";

export default function SeedPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSeed = async () => {
    setLoading(true);
    setResult(null);

    try {
      const data = await seedDemoData();
      setResult({ success: data.success, message: data.message });
    } catch (error: any) {
      setResult({ success: false, message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-sm p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-black mb-4">
          Datos de Prueba
        </h1>
        
        <p className="text-gray-600 mb-6">
          ¿Necesitas datos de prueba para probar el sistema? Haz clic en el botón para crear:
        </p>

        <ul className="text-sm text-gray-500 mb-6 space-y-2">
          <li>✓ 3 Recursos (Barbería 1, 2, 3)</li>
          <li>✓ 5 Servicios (Corte, Afeitado, etc.)</li>
          <li>✓ 30-40 Horas de trabajo por recurso</li>
          <li>✓ 8 Clientes de prueba</li>
          <li>✓ 15 Citas (pasadas y futuras)</li>
        </ul>

        {result && (
          <div
            className={`p-4 rounded-lg mb-6 ${
              result.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
            }`}
          >
            {result.message}
          </div>
        )}

        <button
          onClick={handleSeed}
          disabled={loading}
          className="w-full px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 mb-4"
        >
          {loading ? "Creando datos..." : "Crear Datos de Prueba"}
        </button>

        <Link
          href="/cms/dashboard"
          className="block text-center text-gray-600 hover:text-black"
        >
          ← Volver al Dashboard
        </Link>
      </div>
    </div>
  );
}