/**
 * Tenant utilities that read from JWT (no database queries)
 * Phase 1: Session/JWT - Embedded tenant_id in token
 */

import { createClient } from "@/lib/supabase/client";

let cachedTenantId: string | null = null;

/**
 * Get tenant_id from current JWT (no DB query)
 * Uses cached value if available
 */
export async function getTenantIdFromJWT(): Promise<string | null> {
  // Return cached value if available
  if (cachedTenantId) {
    return cachedTenantId;
  }

  try {
    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.user?.app_metadata?.tenant_id) {
      cachedTenantId = session.user.app_metadata.tenant_id;
      return cachedTenantId;
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Clear cached tenant_id (call on logout)
 */
export function clearTenantCache() {
  cachedTenantId = null;
}

/**
 * Check if user is authenticated (from JWT)
 */
export async function isAuthenticatedFromJWT(): Promise<boolean> {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return !!user;
  } catch {
    return false;
  }
}

/**
 * Get user role from JWT
 */
export function getUserRoleFromJWT(): string | null {
  // User role could also be in app_metadata
  // For now, we assume 'admin' - extend as needed
  return "admin"; // Could be extended to read from app_metadata.role
}