<script setup>
import { onMounted } from 'vue'
import { formattedBalance } from '@/utils/formatter'
import { storeToRefs } from 'pinia'
import { useAccountStore } from '@/stores/account'

const accountStore = useAccountStore()

onMounted(() => accountStore.fetchAccounts())

const { account } = storeToRefs(accountStore)
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-gray-500 text-sm font-medium">Saldo Disponível</h3>
      <svg class="h-5 w-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <p class="text-2xl font-bold text-gray-900">{{ formattedBalance(account[0].balance) }}</p>
    <p class="text-sm text-gray-500 mt-2">Atualizado há 5 minutos</p>
  </div>
</template>