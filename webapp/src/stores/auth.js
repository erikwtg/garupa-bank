import { defineStore } from "pinia"

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(userData) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          credentials: "include",
          body: JSON.stringify(userData)
        })

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Erro no login');
        }

        const { data: { token, userId }, message } = await response.json();
        this.token = token;
        this.user = userId;
        localStorage.setItem('token', token);
        return { data: { token, userId }, message };

      } catch (error) {
        console.error('Erro ao fazer login:', error);
        throw error;
      }
    },
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
      router.push('/login')
    },
    async register(userData) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          credentials: "include",
          body: JSON.stringify(userData)
        })

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Erro no registro');
        }

        const { data: { token, userId }, message } = await response.json();
        this.user = userId
        this.token = token
        localStorage.setItem('token', token)
        return { data: { token, userId }, message };

      } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        throw error;
      }
    }
  }
})