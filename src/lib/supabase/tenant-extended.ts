// ==========================================
// TENANT UTILITIES - Extended
// Additional functions for tenant operations
// ==========================================

import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

/**
 * Get the current user's tenant ID
 * Returns null if not logged in or no tenant
 */
export async function getCurrentTenantId(): Promise<string | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: membership, error } = await supabase
      .from("memberships")
      .select("tenant_id")
      .eq("user_id", user.id)
      .single();

    if (error || !membership) return null;
    return membership.tenant_id;
  } catch {
    return null;
  }
}

/**
 * Get the current tenant with full info
 */
export async function getCurrentTenant() {
  try {
    const tenantId = await getCurrentTenantId();
    if (!tenantId) return null;

    const { data, error } = await supabase
      .from("tenants")
      .select("*")
      .eq("id", tenantId)
      .single();

    if (error) return null;
    return data;
  } catch {
    return null;
  }
}

/**
 * Check membership status (trial/paid/expired)
 */
export async function getMembershipStatus(): Promise<{
  plan_type: string;
  status: string;
  expires_at: string | null;
} | null> {
  try {
    const tenantId = await getCurrentTenantId();
    if (!tenantId) return null;

    const { data, error } = await supabase
      .from("tenant_memberships")
      .select("plan_type, status, expires_at")
      .eq("tenant_id", tenantId)
      .single();

    if (error) return null;
    return data;
  } catch {
    return null;
  }
}