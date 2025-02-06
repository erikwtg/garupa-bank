<script setup>
import { useAuthStore } from '@/stores/auth'
import CNavbar from '@/components/CNavbar.vue'
import CBalance from '@/components/CBalance.vue'
import CFastActions from '@/components/CFastActions.vue'
import CAccountDetails from '@/components/CAccountDetails.vue'
import CHistoryTransactions from '@/components/CHistoryTransactions.vue'
</script>

<template>
  <div class="min-h-screen">
    <CNavbar />

    <main class="max-w-7xl mx-auto px-4 md:px-16 lg:px-48 py-8">

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <CBalance />
        <CFastActions />
        <CAccountDetails />
      </div>

      <CHistoryTransactions />
    </main>
  </div>
</template>