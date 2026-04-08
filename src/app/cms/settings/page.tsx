"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { getCurrentTenant } from "@/lib/supabase/tenant";

export default function CMSSettings() {
  const supabase = createClient();
  const [tenant, setTenant] = useState<{
    id: string;
    name: string;
    slug: string;
    plan_type: string;
    settings: Record<string, unknown>;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    currency: "EUR",
    timezone: "Europe/Madrid",
    theme: "light",
  });

  useEffect(() => {
    loadTenant();
  }, []);

  const loadTenant = async () => {
    try {
      const tenantData = await getCurrentTenant();
      if (tenantData) {
        setTenant(tenantData as typeof tenant);
        setFormData({
          name: tenantData.name,
          slug: tenantData.slug,
          currency: (tenantData.settings as Record<string, unknown>)?.currency as string || "EUR",
          timezone: (tenantData.settings as Record<string, unknown>)?.timezone as string || "Europe/Madrid",
          theme: (tenantData.settings as Record<string, unknown>)?.theme as string || "light",
        });
      }
    } catch (error) {
      console.error("Error loading tenant:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { error } = await supabase
        .from("tenants")
        .update({
          name: formData.name,
          slug: formData.slug,
          settings: {
            currency: formData.currency,
            timezone: formData.timezone,
            theme: formData.theme,
          },
        })
        .eq("id", tenant?.id);

      if (error) throw error;
      alert("Configuración guardada");
    } catch (error) {
      console.error("Error saving settings:", error);
    } finally {
      setSaving(false);
    }
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
      <h1 className="text-2xl font-bold text-black mb-8">Configuración</h1>

      <div className="max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h2 className="text-lg font-semibold mb-4">Información del Negocio</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del negocio
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL slug
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Tu página será: EmpreTools.com/{formData.slug}
                </p>
              </div>
            </div>
          </div>

          {/* Regional Settings */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h2 className="text-lg font-semibold mb-4">Configuración Regional</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Moneda
                </label>
                <select
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                >
                  <option value="EUR">EUR ($)</option>
                  <option value="USD">USD ($)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Zona Horaria
                </label>
                <select
                  value={formData.timezone}
                  onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                >
                  <option value="Europe/Madrid">España (GMT+1)</option>
                  <option value="Europe/London">Reino Unido (GMT+0)</option>
                  <option value="America/New_York">EE.UU. Este (GMT-5)</option>
                  <option value="America/Los_Angeles">EE.UU. Oeste (GMT-8)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Plan Info */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h2 className="text-lg font-semibold mb-4">Plan</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-black">
                  Plan actual: <span className="uppercase">{tenant?.plan_type || "free"}</span>
                </p>
                <p className="text-sm text-gray-500">
                  {tenant?.plan_type === "free" 
                    ? "Has alcanzado el límite del plan gratuito" 
                    : "Tienes acceso a todas las funcionalidades"}
                </p>
              </div>
              <button
                type="button"
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
              >
                Actualizar Plan
              </button>
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            disabled={saving}
            className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 disabled:opacity-50"
          >
            {saving ? "Guardando..." : "Guardar Configuración"}
          </button>
        </form>
      </div>
    </div>
  );
}
