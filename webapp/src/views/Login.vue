<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const name = ref('Erik William')
const email = ref('erik@huboost.com.br')
const password = ref('123456')
const signIn = ref(false)

const router = useRouter()
const authStore = useAuthStore()

const login = async () => {
  if (signIn.value) {
    await authStore.register({
      name: name.value,
      email: email.value,
      password: password.value
    })
  } else {
    await authStore.login({
      email: email.value,
      password: password.value
    })
  }
  router.push('/')
}
</script>

<template>
  <div class="flex flex-col md:flex-row items-center justify-center h-screen gap-8">
    <div class="flex flex-col items-center justify-center lg:flex-1">
      <img src="@/assets/images/garupa-logo.png" alt="Garupa Logo" class="w-48 h-48 md:w-64 md:h-64 lg:w-96 lg:h-96">
    </div>

    <div class="flex flex-col items-center justify-center lg:flex-1 gap-4">
      <input
        v-if="signIn"
        v-model="name"
        type="text"
        placeholder="Nome"
        class="w-fit px-4 py-2 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4BBEA3] focus:border-transparent transition-all duration-200 ease-in-out shadow-sm"
      />
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="w-fit px-4 py-2 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4BBEA3] focus:border-transparent transition-all duration-200 ease-in-out shadow-sm"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Senha"
        class="w-fit px-4 py-2 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4BBEA3] focus:border-transparent transition-all duration-200 ease-in-out shadow-sm"
      />

      <button @click="login" class="min-w-60 px-4 py-2 bg-[#3DA88F] text-white rounded-lg hover:bg-[#44B399] focus:outline-none focus:ring-2 focus:ring-[#4BBEA3] focus:ring-offset-2 transition-all duration-200 ease-in-out shadow-sm font-semibold cursor-pointer">
        {{ signIn ? 'Cadastrar' : 'Login' }}
      </button>

      <div v-if="!signIn" class="flex flex-col items-center justify-center gap-2">
        <span class="text-sm text-gray-500">Ainda não tem sua conta?</span>
        <button @click="signIn = true" class="text-sm text-[#308b76] font-semibold cursor-pointer">Cadastre</button>
      </div>

      <div v-if="signIn" class="flex flex-col items-center justify-center gap-2">
        <span class="text-sm text-gray-500">Já tem sua conta?</span>
        <button @click="signIn = false" class="text-sm text-[#308b76] font-semibold cursor-pointer">Login</button>
      </div>
    </div>
  </div>
</template>