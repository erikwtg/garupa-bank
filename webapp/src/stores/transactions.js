import { defineStore } from "pinia"
import { useAccountStore } from './account'
import { createTransactionSchema } from '../schemas/transactionSchema'

export const useTransactionStore = defineStore("transactions", {
  state: () => ({
    transactionList: [],
    errors: {
      fields: {},
      general: null
    },
  }),
  getters: {
    transactions: (state) => state.transactionList,
  },
  actions: {
    async createTransaction(transactionData) {
      try {
        const transactionParsedData = createTransactionSchema.safeParse(transactionData)

        if (transactionParsedData.error) {
          this.errors = {
            fields: transactionParsedData.error.format(),
            general: null
          }
          return { errors: this.errors }
        }

        const accountStore = useAccountStore()
        Object.assign(transactionParsedData, {
          accountId: accountStore.account[0].id
        })

        const response = await fetch(`${import.meta.env.VITE_API_URL}/transfers`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(transactionParsedData)
        })

        const data = await response.json()

        if (response.ok) {
          this.transactionList.push(data)
          this.errors = { fields: {}, general: null }
          return data
        } else {
          this.errors = {
            fields: data.errors?.fields || {},
            general: data.errors?.message || 'Erro ao processar transação'
          }
          return { errors: this.errors }
        }
      } catch (error) {
        this.errors = {
          fields: {},
          general: 'Erro de conexão. Tente novamente.'
        }
        return { errors: error }
      }
    },
    async fetchTransactions() {
      try {
        const accountStore = useAccountStore()
        const accountId = accountStore.account[0].id

        const response = await fetch(`${import.meta.env.VITE_API_URL}/transfers/account/${accountId}`)
        const data = await response.json()

        if (Array.isArray(data)) {
          this.transactionList = data
        } else {
          this.transactionList = []
        }
      } catch (error) {
        this.transactionList = []
      }
    },
  },

  persist: {
    key: 'transactions-store',
    storage: localStorage,
    paths: ['transactionList'],
  }
})