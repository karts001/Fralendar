import { supabase } from "../lib/supabaseClient";

export const authService = {
  async login(email: string, password: string) {
    const { data, error} = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    });

    if (error) throw error;

    return data;
  },

  async signup(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password
    });

    if (error) throw error;

    return data;
  },

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) throw error;
    return user;
  },

  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) throw error;
    return session;
  },

  async getAccessToken() {
    const session = await this.getSession();
    const token = session?.access_token || null;
    if (!token) throw new Error('No access token found');

    return token;
  },


  async syncWithBackend() {
    const token = await this.getAccessToken();

    const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/auth/sync`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to sync with backend');
    }

    return response.json();
  },

  async resetPassword(email: string) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/reset-password'
    });
  
    if (error) throw error;

    return data;
  }
}