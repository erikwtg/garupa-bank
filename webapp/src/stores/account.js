import { defineStore } from "pinia"
import { useAuthStore } from './auth'

export const useAccountStore = defineStore("account", {
  state: () => ({
    account: {
      id: null,
      userId: null,
      accountNumber: null,
      agencyNumber: null,
      bankCode: null,
      balance: null,
    },
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
      const data = await response.json()
      this.account = data
    },
    async updateAccount(account) {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/account`, {
        method: 'PUT',
        body: JSON.stringify(account),
      })
      const data = await response.json()
      this.account = data
    },
  },

  persist: {
    key: 'account-store',
    storage: localStorage,
    paths: ['account'],
  }
})