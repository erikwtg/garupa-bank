import { defineStore } from "pinia"
import router from "@/router"
import { registerSchema, loginSchema } from "@/schemas/authSchema"

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
    errors: {
      fields: {},
      general: null
    },
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    userName: (state) => state.user?.name,
    userEmail: (state) => state.user?.email,
  },
  actions: {
    async login(userData) {
      try {
        const validatedData = loginSchema.safeParse(userData)

        if (validatedData.error) {
          this.errors = {
            fields: validatedData.error.format(),
            general: null
          }
          return { errors: this.errors }
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          credentials: "include",
          body: JSON.stringify(validatedData.data)
        })

        const responseData = await response.json()

        if (!response.ok) {
          this.errors = {
            fields: responseData.errors?.fields || {},
            general: (responseData?.error || responseData?.errors) ? responseData.errors : 'Erro ao fazer login! Credenciais inválidas.'
          }
          return { errors: this.errors }
        }

        const { data: { token, user }, message } = responseData
        this.token = token
        this.user = user

        return { data: { token, user }, message };

      } catch (error) {
        console.log("ERROR AO FAZER LOGIN: ", error)
        this.errors = {
          fields: {},
          general: 'Falha ao fazer login. Tente novamente.'
        }
        return { errors: error }
      }
    },
    logout() {
      this.user = null
      this.token = null
      this.errors = {
        fields: {},
        general: null
      }
      localStorage.removeItem('token')
      router.push('/login')
    },
    async register(userData) {
      const validatedData = registerSchema.safeParse(userData)

      if (validatedData.error) {
        this.errors = {
          fields: validatedData.error.format(),
          general: null
        }
        return { errors: this.errors }
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          credentials: "include",
          body: JSON.stringify(validatedData.data)
        })

        const responseData = await response.json()

        if (!response.ok) {
          this.errors = {
            fields: responseData.errors?.fields || {},
            general: responseData.errors?.message || 'Erro no registro'
          }
          return { errors: this.errors }
        }

        const { data: { token, user }, message } = responseData
        this.user = user
        this.token = token

        return { data: { token, user }, message };

      } catch (error) {
        console.log("ERROR AO REGISTRAR USUARIO: ", error)
        this.errors = {
          fields: {},
          general: 'Falha ao registrar usuário. Tente novamente.'
        }
        return { errors: this.errors }
      }
    }
  },

  persist: {
    key: 'auth-store',
    storage: localStorage,
    paths: ['user', 'token'],
  }
})