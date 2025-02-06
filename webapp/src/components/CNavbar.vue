<script setup>
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
const authStore = useAuthStore()

const { user } = storeToRefs(authStore)
const logout = () => {
  authStore.logout()
}
</script>

<template>
  <nav class="bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">

        <div class="flex items-center space-x-4">
          <img src="@/assets/images/garupa-logo.png" alt="Logo" class="h-8 w-8" />
          <span class="text-white font-semibold text-lg">Garupa Bank</span>
        </div>

        <div class="flex items-center space-x-4">
          <div class="flex items-center">
            <div class="h-8 w-8 rounded-full bg-white/30 flex items-center justify-center text-white">
              {{ user?.name.slice(0, 1).toUpperCase() }}
            </div>
            <span class="ml-2 text-white hidden md:block">{{ user?.name }}</span>
          </div>
          <button
            @click="logout"
            class="px-4 py-2 text-sm font-medium text-emerald-600 bg-white rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>