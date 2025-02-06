import { defineStore } from "pinia"
import { useAuthStore } from './auth'

export const useAccountStore = defineStore("account", {
  state: () => ({
    account: {},
  }),
  getters: {
    balance: (state) => state.account?.balance,
    accountNumber: (state) => state.account?.accountNumber,
    agencyNumber: (state) => state.account?.agencyNumber,
    bankCode: (state) => state.account?.bankCode,
  },
  actions: {
    async fetchAccounts() {
      const authStore = useAuthStore()
      const userId = authStore.user.id
      const response = await fetch(`${import.meta.env.VITE_API_URL}/account/user/${userId}`)
      const responseData = await response.json()
      this.account = responseData
    },
    async updateAccount(account) {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/account`, {
        method: 'PUT',
        body: JSON.stringify(account),
      })
      const responseData = await response.json()
      this.account = responseData
    },
  },

  persist: {
    key: 'account-store',
    storage: localStorage,
    paths: ['account'],
  }
})