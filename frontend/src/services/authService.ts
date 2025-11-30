import { supabase } from "../lib/supabaseClient";
import { AuthError, HttpError } from "../types/errors";

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
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new AuthError('No active session');

    return session;
  },

  async getAccessToken() {
    const session = await this.getSession();
    const token = session?.access_token || null;
    if (!token)  {
      throw new Error('No access token found');
    }

    return token;
  },

  async authenticatedFetch(url: string, options: RequestInit): Promise<Response> {
    try {
      const token = await this.getAccessToken();

      const response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });

      if (response.status === 401) {
        await this.logout();
        throw new AuthError('Unauthorised access');
      }

      if (!response.ok) {
        throw new HttpError(`Http error! status ${response.status}`, response.status);
      }

      return response;
    } catch(error: any) {
      if (error.message === 'No active session') {
        await this.logout();
        throw new AuthError('No active session');
      }
      throw error;
    }
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