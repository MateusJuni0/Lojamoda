import { createClient, type SupabaseClient } from '@supabase/supabase-js'

function createSupabaseClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || url === 'https://placeholder.supabase.co' || !key || key === 'placeholder_anon_key') {
    return null
  }

  return createClient(url, key)
}

function createSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || url === 'https://placeholder.supabase.co' || !key || key === 'placeholder_service_key') {
    return null
  }

  return createClient(url, key)
}

let clientInstance: SupabaseClient | null | undefined
let adminInstance: SupabaseClient | null | undefined

export function getSupabase(): SupabaseClient | null {
  if (clientInstance === undefined) {
    clientInstance = createSupabaseClient()
  }
  return clientInstance
}

export function getSupabaseAdmin(): SupabaseClient | null {
  if (adminInstance === undefined) {
    adminInstance = createSupabaseAdmin()
  }
  return adminInstance
}
