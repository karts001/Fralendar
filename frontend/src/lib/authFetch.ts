import { supabase } from "./supabaseClient";

export async function authFetch(url: string, options: RequestInit = {}) {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) {
    console.error("Error fetching session:", error);
    throw new Error("Failed to fetch session");
  }

  if (!session) throw new Error("User not logged in");

  return fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": 'application/json',
    }
  })
}