<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useTransactionStore } from '@/stores/transactions'

const transactionStore = useTransactionStore()

const showTransferModal = ref(false)
const transactionSuccess = ref(false)
const transactionError = ref(false)
const loading = ref(false)
const formData = ref({})

const handleTransfer = async () => {
  loading.value = true

  const response = await transactionStore.createTransaction(formData.value)

  if (!response.errors) {
    transactionError.value = false
    transactionSuccess.value = true
    transactionStore.fetchTransactions()
  } else {
    transactionError.value = true
  }
  
  setTimeout(() => {
    loading.value = false
    if (!errors.value && transactionSuccess.value) showTransferModal.value = false
  }, 3000)
}

const { errors } = storeToRefs(transactionStore)

const checkErrors = (field) => {
  const fieldErrors = errors.value.fields[field]
  if (fieldErrors && fieldErrors._errors && fieldErrors._errors.length > 0) {
    return fieldErrors._errors[0]
  }
  return null
}
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
    <h3 class="text-gray-500 text-sm font-medium mb-4">Ações Rápidas</h3>
    <div class="grid grid-cols-2 gap-4">
      <button @click="showTransferModal = true; transactionType = 'transfer'" class="flex flex-col items-center justify-center p-4 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors duration-200 cursor-pointer">
        <svg class="h-6 w-6 text-emerald-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
        <span class="text-sm font-medium text-gray-700">Transferir</span>
      </button>
      <button class="disabled opacity-50 disabled:cursor-not-allowed flex flex-col items-center justify-center p-4 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors duration-200 cursor-pointer">
        <svg class="h-6 w-6 text-emerald-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
        <span class="text-sm font-medium text-gray-700">Pagar</span>
      </button>
    </div>
  </div>

  <div v-if="showTransferModal" class="fixed inset-0 bg-emerald-600 bg-opacity-75 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-sm w-full mx-4">

      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900">
            Nova Transferência
          </h3>
          <button 
            @click="showTransferModal = false"
            class="text-gray-400 hover:text-gray-500 cursor-pointer"
          >
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div class="flex flex-col px-6 py-4 gap-3">
        <div>
          <label for="amount" class="block text-sm font-medium text-gray-700">
            Valor
          </label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span class="text-gray-500 sm:text-sm">R$</span>
            </div>
            <input
              id="amount"
              v-model.number="formData.amount"
              type="number"
              required
              :class="`peer block w-full pl-10 pr-12 rounded-md border-gray-300 ${checkErrors('amount') ? 'focus:border-red-500 focus:ring-red-500' : 'focus:border-emerald-500 focus:ring-emerald-500'}`"
              placeholder="0,00"
            />
            <p v-if="checkErrors('amount')" class="mt-2 text-sm text-red-600">
              {{ checkErrors('amount') }}
            </p>
          </div>
        </div>

        <div>
          <label for="recipient" class="block text-sm font-medium text-gray-700">
            ID da Conta
          </label>
          <input
            id="recipient"
            v-model="formData.externalId"
            type="text"
            class="peermt-1 block w-full rounded-md pl-3 border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            placeholder="ID Externo da Conta"
          />
        </div>

        <div>
          <label for="beneficiaryAccountHolder" class="block text-sm font-medium text-gray-700">
            Beneficiado
          </label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <input
              id="beneficiaryAccountHolder"
              v-model="formData.beneficiaryAccountHolder"
              type="text"
              class="peerblock w-full pl-3 pr-12 rounded-md border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
              placeholder="Nome do Beneficiado"
            />
          </div>
        </div>

        <div>
          <label for="beneficiaryAccountNumber" class="block text-sm font-medium text-gray-700">
            Número da Conta
          </label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <input
              id="beneficiaryAccountNumber"
              v-model.number="formData.beneficiaryAccountNumber"
              type="number"
              :class="`peer block w-full pl-3 pr-12 rounded-md border-gray-300 ${checkErrors('beneficiaryAccountNumber') ? 'focus:border-red-500 focus:ring-red-500' : 'focus:border-emerald-500 focus:ring-emerald-500'}`"
              placeholder="Número da Conta"
            />
          </div>
          <p v-if="checkErrors('beneficiaryAccountNumber')" class="mt-2 text-sm text-red-600">
            {{ checkErrors('beneficiaryAccountNumber') }}
          </p>
        </div>

        <div>
          <label for="beneficiaryAgencyNumber" class="block text-sm font-medium text-gray-700">
            Agência
          </label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <input
              id="beneficiaryAgencyNumber"
              v-model.number="formData.beneficiaryAgencyNumber"
              type="number"
              :class="`peer block w-full pl-3 pr-12 rounded-md border-gray-300 ${checkErrors('beneficiaryAgencyNumber') ? 'focus:border-red-500 focus:ring-red-500' : 'focus:border-emerald-500 focus:ring-emerald-500'}`"
              placeholder="Número da Conta"
            />
          </div>
          <p v-if="checkErrors('beneficiaryAccountNumber')" class="mt-2 text-sm text-red-600">
            {{ checkErrors('beneficiaryAgencyNumber') }}
          </p>
        </div>

        <div>
          <label for="beneficiaryBankCode" class="block text-sm font-medium text-gray-700">
            Código do Banco
          </label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <input
              id="beneficiaryBankCode"
              v-model.number="formData.beneficiaryBankCode"
              type="number"
              :class="`peer block w-full pl-3 pr-12 rounded-md border-gray-300 ${checkErrors('beneficiaryBankCode') ? 'focus:border-red-500 focus:ring-red-500' : 'focus:border-emerald-500 focus:ring-emerald-500'}`"
              placeholder="Número da Conta"
            />
          </div>
          <p v-if="checkErrors('beneficiaryBankCode')" class="mt-2 text-sm text-red-600">
            {{ checkErrors('beneficiaryBankCode') }}
          </p>
        </div>

        <div>
          <label for="expectedOn" class="block text-sm font-medium text-gray-700">
            Agendamento
          </label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <input
              id="expectedOn"
              v-model="formData.expectedOn"
              type="date"
              class="peer block w-full pl-3 pr-12 rounded-md border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
              placeholder="Número da Conta"
            />
          </div>
        </div>

        <div>
          <label for="dueDate" class="block text-sm font-medium text-gray-700">
            Vencimento
          </label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <input
              id="dueDate"
              v-model="formData.dueDate"
              type="date"
              class="peer block w-full pl-3 pr-12 rounded-md border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
              placeholder="Número da Conta"
            />
          </div>
        </div>

        <div>
          <label for="description" class="block text-sm font-medium text-gray-700">
            Descrição
          </label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <input
              id="description"
              v-model="formData.transactionDescription"
              type="text"
              class="peerblock w-full pl-3 pr-12 rounded-md border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
              placeholder="Descrição"
            />
          </div>
        </div>

        <div class="bg-gray-50 rounded-lg p-4">
          <div class="flex items-center">
            <svg class="h-5 w-5 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="text-sm text-gray-600">
              Transferências não agendadassão processadas instantaneamente durante horário comercial.
            </p>
          </div>
        </div>
      </div>

      <div class="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
        <div class="flex justify-end space-x-3">
          <button
            @click="showTransferModal = false"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            @click="handleTransfer"
            :class="`px-4 py-2 text-sm font-medium text-white bg-emerald-600 border border-transparent rounded-md ${transactionError ? 'hover:bg-red-600' : 'hover:bg-emerald-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 ${transactionError ? 'focus:ring-red-500' : 'focus:ring-emerald-500'} cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`"
          >
            {{ loading ? 'Aguarde...' : '' }}
            {{ transactionError && !loading ? 'Tente novamente' : '' }}
            {{ !transactionError && !loading ? 'Confirmar Transferência' : '' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.peer::-webkit-inner-spin-button,
.peer::-webkit-outer-spin-button {
  @apply appearance-none;
}
.peer {
  -moz-appearance: textfield;
}
</style>