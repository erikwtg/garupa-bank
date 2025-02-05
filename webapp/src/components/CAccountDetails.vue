<script setup>
import { useAccountStore } from '@/stores/account'
const accountStore = useAccountStore()
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-gray-500 text-sm font-medium">Informações da conta</h2>
    </div>
    <div class="space-y-2">
      <div class="flex justify-between items-center">
        <span class="text-gray-600">Agência:</span>
        <span class="font-medium text-gray-800">{{ accountStore.account[0].agencyNumber }}</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-gray-600">Conta:</span>
        <span class="font-medium text-gray-800">{{ accountStore.account[0].accountNumber }}</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-gray-600">Banco:</span>
        <span class="font-medium text-gray-800">{{ accountStore.account[0].bankCode }}</span>
      </div>
    </div>
  </div>
</template>