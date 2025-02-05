import { defineStore } from "pinia"
import router from "@/router"
import { z } from "zod"

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
    errors: []
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    userName: (state) => state.user?.name,
    userEmail: (state) => state.user?.email,
  },
  actions: {
    async login(userData) {
      try {
        const loginSchema = z.object({
          email: z.string().email('Email inválido'),
          password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres')
        })

        // Todo[Erik] - Validar os dados do login
        const validatedData = loginSchema.parse(userData)

        if (validatedData.errors) {
          throw new Error(validatedData.errors)
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          credentials: "include",
          body: JSON.stringify(userData)
        })

        const responseData = await response.json()

        if (!response.ok) {
          const { error } = responseData
          throw new Error( error || 'Erro no login' );
        }

        const { data: { token, user }, message } = responseData
        this.token = token;
        this.user = user;
        return { data: { token, user }, message };

      } catch (error) {
        throw new Error(error);
      }
    },
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
      router.push('/login')
    },
    async register(userData) {

      const registerSchema = z.object({
        name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
        email: z.string().email('Email inválido'),
        password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres')
      })

      // Todo[Erik] - Validar os dados para o registro
      const validatedData = registerSchema.parse(userData)

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          credentials: "include",
          body: JSON.stringify(validatedData)
        })

        const responseData = await response.json()

        if (!response.ok) {
          const { error } = responseData
          throw new Error( error.message || 'Erro no registro' );
        }

        const { data: { token, user }, message } = responseData
        this.user = user
        this.token = token
        localStorage.setItem('token', token)
        return { data: { token, user }, message };

      } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        throw new Error(error);
      }
    }
  },

  persist: {
    key: 'auth-store',
    storage: localStorage,
    paths: ['user', 'token'],
  }
})