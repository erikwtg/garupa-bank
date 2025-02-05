<script setup>
import { onMounted } from 'vue'
import { useTransactionStore } from '@/stores/transactions'
import { storeToRefs } from 'pinia'
import { formattedBalance, formatDate } from '@/utils/formatter'

const transactionsStore = useTransactionStore()
const { transactionList } = storeToRefs(transactionsStore)

onMounted(async () => {
  await transactionsStore.fetchTransactions()
})
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100">
    <div class="p-6">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Histórico de Transações</h3>
      <div class="space-y-4 max-h-[400px] overflow-y-auto pr-2">

        <div v-for="transaction in transactionList" :key="transaction.id" 
             class="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
          <div class="flex items-center space-x-4">
            <div class="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
              <svg class="h-5 w-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="transaction.transactionType === 'TRANSFER' ? 'M19 14l-7 7m0 0l-7-7m7 7V3' : 'M5 10l7-7m0 0l7 7m-7-7v18'" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-900">
                {{ transaction.beneficiaryAccountHolder }}
              </p>
              <p class="text-xs text-gray-500">{{ formatDate(transaction.createdAt) }}</p>
            </div>
          </div>
          <div class="text-right">
            <p>{{ transaction.status }}</p>
            <p :class="[
              'text-sm font-medium',
              transaction.transactionType === 'TRANSFER' ? 'text-red-600' : 'text-green-600'
            ]">
              {{ transaction.transactionType === 'TRANSFER' ? '- ' : '+ ' }}
              {{ formattedBalance(transaction.amount) }}
            </p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>