"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface Resource {
  id: string;
  name: string;
  is_active: boolean;
}

interface WorkingHours {
  id: string;
  resource_id: string;
  day_of_week: number;
  is_open: boolean;
  is_active: boolean;
  start_time: string | null;
  end_time: string | null;
}

const DAYS = [
  { id: 1, name: "Lunes" },
  { id: 2, name: "Martes" },
  { id: 3, name: "Miércoles" },
  { id: 4, name: "Jueves" },
  { id: 5, name: "Viernes" },
  { id: 6, name: "Sábado" },
  { id: 7, name: "Domingo" },
];

export default function CMSWorkingHoursPage() {
  const supabase = createClient();
  const [resources, setResources] = useState<Resource[]>([]);
  const [workingHoursMap, setWorkingHoursMap] = useState<Map<string, WorkingHours[]>>(new Map());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Load all resources
      const { data: resourcesData, error: resourcesError } = await supabase
        .from("resources")
        .select("id, name, is_active")
        .order("name");

      if (resourcesError) throw resourcesError;
      setResources(resourcesData || []);

      // Load all working hours
      const { data: whData, error: whError } = await supabase
        .from("working_hours")
        .select("*")
        .order("day_of_week");

      if (whError) throw whError;

      // Group by resource
      const whMap = new Map<string, WorkingHours[]>();
      (whData || []).forEach((wh) => {
        const existing = whMap.get(wh.resource_id) || [];
        existing.push(wh);
        whMap.set(wh.resource_id, existing);
      });
      setWorkingHoursMap(whMap);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDayToggle = async (
    resourceId: string,
    dayId: number,
    currentlyOpen: boolean
  ) => {
    setSaving(`${resourceId}-${dayId}`);
    try {
      const existing = workingHoursMap.get(resourceId) || [];
      const existingDay = existing.find((wh) => wh.day_of_week === dayId);

      if (existingDay) {
        // Update existing
        const { error } = await supabase
          .from("working_hours")
          .update({ is_open: !currentlyOpen })
          .eq("id", existingDay.id);

        if (error) throw error;
      } else {
        // Create new
        const { error } = await supabase.from("working_hours").insert({
          resource_id: resourceId,
          day_of_week: dayId,
          is_open: true,
          is_active: true,
          start_time: "09:00",
          end_time: "18:00",
        });

        if (error) throw error;
      }

      await loadData();
    } catch (error) {
      console.error("Error toggling day:", error);
    } finally {
      setSaving(null);
    }
  };

  const handleTimeChange = async (
    resourceId: string,
    dayId: number,
    field: "start_time" | "end_time",
    value: string
  ) => {
    setSaving(`${resourceId}-${dayId}-${field}`);
    try {
      const existing = workingHoursMap.get(resourceId) || [];
      const existingDay = existing.find((wh) => wh.day_of_week === dayId);

      if (existingDay) {
        const { error } = await supabase
          .from("working_hours")
          .update({ [field]: value })
          .eq("id", existingDay.id);

        if (error) throw error;
      } else {
        // Create new entry
        const { error } = await supabase.from("working_hours").insert({
          resource_id: resourceId,
          day_of_week: dayId,
          is_open: false,
          is_active: true,
          [field]: value,
        });

        if (error) throw error;
      }

      await loadData();
    } catch (error) {
      console.error("Error updating time:", error);
    } finally {
      setSaving(null);
    }
  };

  const handleActiveToggle = async (resourceId: string, currentlyActive: boolean) => {
    setSaving(`${resourceId}-active`);
    try {
      // Toggle all days for this resource
      const existing = workingHoursMap.get(resourceId) || [];
      for (const day of existing) {
        const { error } = await supabase
          .from("working_hours")
          .update({ is_active: !currentlyActive })
          .eq("id", day.id);

        if (error) throw error;
      }

      // If no existing, create default schedule
      if (existing.length === 0) {
        for (const day of DAYS) {
          const { error } = await supabase.from("working_hours").insert({
            resource_id: resourceId,
            day_of_week: day.id,
            is_open: false,
            is_active: !currentlyActive,
            start_time: "09:00",
            end_time: "18:00",
          });

          if (error) throw error;
        }
      }

      await loadData();
    } catch (error) {
      console.error("Error toggling active:", error);
    } finally {
      setSaving(null);
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
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-black">Horarios</h1>
        <p className="text-gray-500 mt-1">
          Gestiona los horarios de atención por recurso
        </p>
      </div>

      {resources.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-6 text-center text-gray-500">
          No hay recursos creados.{" "}
          <a href="/cms/resources" className="text-black underline">
            Crea recursos primero
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {resources.map((resource) => {
            const whDays = workingHoursMap.get(resource.id) || [];
            const overallActive = whDays.some((wh) => wh.is_active);

            return (
              <div
                key={resource.id}
                className={`bg-white rounded-xl border border-gray-100 p-6 ${
                  !resource.is_active ? "opacity-50" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                  <div>
                    <h3 className="font-semibold text-black">{resource.name}</h3>
                    <p className="text-sm text-gray-500">
                      {resource.is_active ? "Activo" : "Inactivo"}
                    </p>
                  </div>
                  <button
                    onClick={() => handleActiveToggle(resource.id, overallActive)}
                    disabled={!resource.is_active || saving === `${resource.id}-active`}
                    className={`text-sm px-3 py-1 rounded ${
                      overallActive
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    } disabled:opacity-50`}
                  >
                    {overallActive ? "Activo" : "Inactivo"}
                  </button>
                </div>

                {/* Days grid */}
                <div className="space-y-3">
                  {DAYS.map((day) => {
                    const wh = whDays.find((w) => w.day_of_week === day.id);
                    const isOpen = wh?.is_open ?? false;
                    const isActive = wh?.is_active ?? false;
                    const startTime = wh?.start_time || "09:00";
                    const endTime = wh?.end_time || "18:00";

                    return (
                      <div
                        key={day.id}
                        className={`flex items-center gap-4 ${
                          !isOpen || !isActive ? "opacity-40" : ""
                        }`}
                      >
                        <div className="w-24 text-sm font-medium text-gray-700">
                          {day.name}
                        </div>

                        <input
                          type="checkbox"
                          checked={isOpen}
                          onChange={() =>
                            handleDayToggle(resource.id, day.id, isOpen)
                          }
                          disabled={!resource.is_active || saving === `${resource.id}-${day.id}`}
                          className="w-4 h-4 disabled:opacity-30"
                        />

                        <input
                          type="time"
                          value={startTime}
                          onChange={(e) =>
                            handleTimeChange(
                              resource.id,
                              day.id,
                              "start_time",
                              e.target.value
                            )
                          }
                          disabled={!isOpen || !resource.is_active || saving === `${resource.id}-${day.id}-start_time`}
                          className="w-24 px-2 py-1 text-sm border border-gray-200 rounded disabled:opacity-30"
                        />

                        <span className="text-gray-400">-</span>

                        <input
                          type="time"
                          value={endTime}
                          onChange={(e) =>
                            handleTimeChange(
                              resource.id,
                              day.id,
                              "end_time",
                              e.target.value
                            )
                          }
                          disabled={!isOpen || !resource.is_active || saving === `${resource.id}-${day.id}-end_time`}
                          className="w-24 px-2 py-1 text-sm border border-gray-200 rounded disabled:opacity-30"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-8 text-sm text-gray-500">
        <p>
          <strong>Cómo funciona:</strong> Activa o desactiva cada día del
          recurso. Define los horarios de apertura y cierre. El horario se
          usa para generar los días disponibles en el sistema de reservas.
        </p>
      </div>
    </div>
  );
}