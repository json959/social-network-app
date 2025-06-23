import { create } from 'zustand';
import axios from 'axios';

interface AuthState {
  token: string | null;
  login: (alias: string, password: string) => Promise<void>;
  createPost: (content: string) => Promise<void>;
  getProfile: () => Promise<any>;
  loadToken: () => void;
  logout: () => void; // ✅ AÑADIR ESTO
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,

  login: async (alias, password) => {
    const response = await axios.post('http://localhost:3001/auth/login', {
      alias,
      password,
    });
    const token = response.data.token;
    localStorage.setItem('token', token);
    set({ token });
  },

  getProfile: async () => {
    const token = get().token;
    if (!token) throw new Error('No token disponible');

    const response = await axios.get('http://localhost:3001/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },

  createPost: async (content: string) => {
    const token = get().token;
    if (!token) throw new Error('No token disponible');

    await axios.post(
      'http://localhost:3002/posts',
      { content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },

  loadToken: () => {
    const token = localStorage.getItem('token');
    if (token) {
      set({ token });
    }
  },

  logout: () => {                 // ✅ AÑADIR ESTA FUNCIÓN
    localStorage.removeItem('token');
    set({ token: null });
  },
}));
