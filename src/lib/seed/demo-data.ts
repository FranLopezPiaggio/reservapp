/**
 * Seed Data Script
 * 
 * Run this in browser console or as a Next.js API route to populate test data.
 * 
 * Usage:
 * - In browser: import { seedDemoData } from '@/lib/seed/demo-data' and call seedDemoData()
 * - Or add to a page temporarily and call on button click
 * 
 * IMPORTANT: Requires authenticated user with tenant_id
 */

import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

interface SeedResult {
  success: boolean;
  message: string;
  data?: {
    tenantId: string;
    resources: string[];
    services: string[];
    customers: number;
    bookings: number;
  };
  error?: string;
}

/**
 * Get current user's tenant ID
 */
async function getTenantId(): Promise<string | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: membership } = await supabase
    .from("memberships")
    .select("tenant_id")
    .eq("user_id", user.id)
    .single();

  return membership?.tenant_id || null;
}

/**
 * Seed demo data for testing
 */
export async function seedDemoData(): Promise<SeedResult> {
  try {
    const tenantId = await getTenantId();
    if (!tenantId) {
      return {
        success: false,
        message: "No autenticado o sin tenant",
        error: "User must be logged in and have a tenant"
      };
    }

    console.log("🌱 Starting seed for tenant:", tenantId);

    // 1. Create Resources
    const resources = [
      { name: "Barbería 1", description: "Silla principal", capacity: 1 },
      { name: "Barbería 2", description: "Silla secundaria", capacity: 1 },
      { name: "Barbería 3", description: "Silla de coloración", capacity: 1 },
    ];

    const { data: insertedResources, error: resourceError } = await supabase
      .from("resources")
      .insert(resources.map(r => ({ ...r, tenant_id: tenantId, is_active: true })))
      .select("id, name");

    if (resourceError) {
      console.error("Error creating resources:", resourceError);
      return { success: false, message: "Error creando recursos", error: resourceError.message };
    }

    const resourceIds = insertedResources.map(r => r.id);
    console.log("✅ Created", resourceIds.length, "resources");

    // 2. Create Services
    const services = [
      { name: "Corte de cabello", description: "Corte clásico o moderno", duration_minutes: 30, price: 25, buffer_after_minutes: 10 },
      { name: "Afeitado con navaja", description: "Afeitado tradicional caliente", duration_minutes: 30, price: 20, buffer_after_minutes: 5 },
      { name: "Corte + Barba", description: "Corte completo con arreglo de barba", duration_minutes: 45, price: 35, buffer_after_minutes: 10 },
      { name: "Coloración", description: "Tintado de cabello", duration_minutes: 90, price: 50, buffer_after_minutes: 15 },
      { name: "Tratamiento capilar", description: "Mascarilla y маsaje", duration_minutes: 45, price: 40, buffer_after_minutes: 10 },
    ];

    const { data: insertedServices, error: serviceError } = await supabase
      .from("services")
      .insert(services.map(s => ({ ...s, tenant_id: tenantId, is_active: true })))
      .select("id, name");

    if (serviceError) {
      console.error("Error creating services:", serviceError);
      return { success: false, message: "Error creando servicios", error: serviceError.message };
    }

    const serviceIds = insertedServices.map(s => s.id);
    console.log("✅ Created", serviceIds.length, "services");

    // 3. Link services to resources (resource_services)
    const resourceServices = [];
    for (const resourceId of resourceIds) {
      for (const serviceId of serviceIds) {
        // All resources offer basic services, only some offer coloration
        const serviceName = insertedServices.find(s => s.id === serviceId)?.name || "";
        const isActive = !serviceName.includes("oloración") || resourceId === resourceIds[2];
        
        resourceServices.push({
          tenant_id: tenantId,
          resource_id: resourceId,
          service_id: serviceId,
          is_active: isActive,
        });
      }
    }

    const { error: rsError } = await supabase
      .from("resource_services")
      .insert(resourceServices);

    if (rsError) {
      console.error("Error linking services to resources:", rsError);
    } else {
      console.log("✅ Linked services to resources");
    }

    // 4. Create working hours for each resource
    const workingHours = [];
    const days = [1, 2, 3, 4, 5, 6]; // Mon-Sat
    for (const resourceId of resourceIds) {
      for (const day of days) {
        const isOpen = day <= 5; // Closed on Sundays
        workingHours.push({
          tenant_id: tenantId,
          resource_id: resourceId,
          day_of_week: day,
          is_open: isOpen,
          is_active: true,
          start_time: isOpen ? "09:00" : null,
          end_time: isOpen ? "18:00" : null,
        });
      }
    }

    const { error: whError } = await supabase
      .from("working_hours")
      .insert(workingHours);

    if (whError) {
      console.error("Error creating working hours:", whError);
    } else {
      console.log("✅ Created working hours");
    }

    // 5. Create Customers
    const customers = [
      { name: "Juan Pérez", email: "juan@example.com", phone: "+5491112345678" },
      { name: "María González", email: "maria@example.com", phone: "+5491123456789" },
      { name: "Carlos Rodríguez", email: "carlos@example.com", phone: "+5491134567890" },
      { name: "Ana Martínez", email: "ana@example.com", phone: "+5491145678901" },
      { name: "Pedro Sánchez", email: "pedro@example.com", phone: "+5491156789012" },
      { name: "Laura Fernández", email: "laura@example.com", phone: "+5491167890123" },
      { name: "Miguel Torres", email: "miguel@example.com", phone: "+5491178901234" },
      { name: "Sofia López", email: "sofia@example.com", phone: "+5491189012345" },
    ];

    const { data: insertedCustomers, error: customerError } = await supabase
      .from("customers")
      .insert(customers.map(c => ({ ...c, tenant_id: tenantId, total_bookings: 0 })))
      .select("id");

    if (customerError) {
      console.error("Error creating customers:", customerError);
    } else {
      console.log("✅ Created", insertedCustomers.length, "customers");
    }

    const customerIds = insertedCustomers.map(c => c.id);

    // 6. Create sample appointments/bookings
    const now = new Date();
    const appointments = [];
    
    // Generate some past and future appointments
    for (let i = 0; i < 15; i++) {
      const daysOffset = Math.floor(Math.random() * 14) - 7; // -7 to +7 days
      const hour = 9 + Math.floor(Math.random() * 8); // 9am to 5pm
      
      const appointmentDate = new Date(now);
      appointmentDate.setDate(appointmentDate.getDate() + daysOffset);
      appointmentDate.setHours(hour, 0, 0, 0);
      
      const customerId = customerIds[Math.floor(Math.random() * customerIds.length)];
      const resourceId = resourceIds[Math.floor(Math.random() * resourceIds.length)];
      const serviceId = serviceIds[Math.floor(Math.random() * serviceIds.length)];
      const service = insertedServices.find(s => s.id === serviceId);
      
      const status = daysOffset < 0 
        ? (Math.random() > 0.2 ? "completed" : "no-show") 
        : (Math.random() > 0.7 ? "confirmed" : "pending");
      
      const endDate = new Date(appointmentDate);
      endDate.setMinutes(endDate.getMinutes() + (service?.duration_minutes || 30));

      appointments.push({
        tenant_id: tenantId,
        customer_id: customerId,
        resource_id: resourceId,
        service_id: serviceId,
        customer_name: customers[customerIds.indexOf(customerId) % customers.length].name,
        customer_phone: customers[customerIds.indexOf(customerId) % customers.length].phone,
        customer_email: customers[customerIds.indexOf(customerId) % customers.length].email,
        start_time: appointmentDate.toISOString(),
        end_time: endDate.toISOString(),
        price_at_booking: service?.price || 25,
        status,
      });
    }

    const { error: bookingError } = await supabase
      .from("appointments")
      .insert(appointments);

    if (bookingError) {
      console.error("Error creating appointments:", bookingError);
    } else {
      console.log("✅ Created", appointments.length, "appointments");
    }

    // Update customer totals
    for (const customerId of customerIds) {
      const { count } = await supabase
        .from("appointments")
        .select("*", { count: "exact", head: true })
        .eq("customer_id", customerId);
      
      if (count !== null && count > 0) {
        await supabase
          .from("customers")
          .update({ total_bookings: count })
          .eq("id", customerId);
      }
    }

    console.log("🎉 Seed completed!");

    return {
      success: true,
      message: "Datos de prueba creados correctamente",
      data: {
        tenantId,
        resources: resourceIds,
        services: serviceIds,
        customers: insertedCustomers.length,
        bookings: appointments.length,
      }
    };
  } catch (error: any) {
    console.error("Seed error:", error);
    return {
      success: false,
      message: "Error general",
      error: error.message
    };
  }
}

/**
 * Check if data already exists
 */
export async function hasSeedData(): Promise<boolean> {
  const tenantId = await getTenantId();
  if (!tenantId) return false;

  const { count } = await supabase
    .from("resources")
    .select("*", { count: "exact", head: true })
    .eq("tenant_id", tenantId);

  return (count || 0) > 0;
}

/**
 * Clear all seed data for current tenant
 */
export async function clearSeedData(): Promise<{ success: boolean; message: string }> {
  const tenantId = await getTenantId();
  if (!tenantId) {
    return { success: false, message: "No autenticado" };
  }

  try {
    // Delete in order respecting foreign keys
    await supabase.from("appointments").delete().eq("tenant_id", tenantId);
    await supabase.from("customers").delete().eq("tenant_id", tenantId);
    await supabase.from("schedule_exceptions").delete().eq("tenant_id", tenantId);
    await supabase.from("working_hours").delete().eq("tenant_id", tenantId);
    await supabase.from("resource_services").delete().eq("tenant_id", tenantId);
    await supabase.from("resources").delete().eq("tenant_id", tenantId);
    await supabase.from("services").delete().eq("tenant_id", tenantId);

    return { success: true, message: "Datos eliminados" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}