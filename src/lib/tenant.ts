// ==========================================
// TENANT UTILITIES
// Helper functions for tenant-scoped data access
// ==========================================

import { createClient } from "@/lib/supabase/client";

export interface TenantInfo {
  id: string;
  name: string;
  slug: string;
  plan_type: string;
  settings: Record<string, unknown>;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
}

/**
 * Get the current user's tenant information
 * Uses RLS policies - automatically filtered by auth.uid()
 */
export async function getCurrentTenant(): Promise<TenantInfo | null> {
  const supabase = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: membership, error } = await supabase
    .from("memberships")
    .select("tenant_id, role")
    .eq("user_id", user.id)
    .single();

  if (error || !membership) return null;

  const { data: tenant } = await supabase
    .from("tenants")
    .select("*")
    .eq("id", membership.tenant_id)
    .single();

  return tenant;
}

/**
 * Get the current user's profile from auth.users metadata
 */
export async function getCurrentUserProfile(): Promise<UserProfile | null> {
  const supabase = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  return {
    id: user.id,
    email: user.email || "",
    full_name: user.user_metadata?.full_name as string | undefined,
    avatar_url: user.user_metadata?.avatar_url as string | undefined,
  };
}

/**
 * Get the current user's role in their tenant
 */
export async function getCurrentUserRole(): Promise<string | null> {
  const supabase = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: membership } = await supabase
    .from("memberships")
    .select("role")
    .eq("user_id", user.id)
    .single();

  return membership?.role || null;
}

/**
 * Check if user is admin of their tenant
 */
export async function isTenantAdmin(): Promise<boolean> {
  const role = await getCurrentUserRole();
  return role === "admin" || role === "superadmin";
}
