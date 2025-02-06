<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const { errors } = storeToRefs(authStore)

const name = ref('')
const email = ref('')
const password = ref('')
const signIn = ref(false)

const checkErrors = (field) => {
  const fieldErrors = errors.value.fields[field]
  if (fieldErrors && fieldErrors._errors && fieldErrors._errors.length > 0) {
    return fieldErrors._errors[0]
  }
  return null
}

const login = async () => {
  if (signIn.value) {
    const response = await authStore.register({
      name: name.value,
      email: email.value,
      password: password.value
    })

    if (!response.errors) {
      signIn.value = false
      router.push('/')
    }
  } else {

    const response = await authStore.login({
      email: email.value,
      password: password.value
    })
  
    if (!response.errors) {
      router.push('/')
    }
  }
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
        :class="{ 'border-red-500': checkErrors('name') }"
      />
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="w-fit px-4 py-2 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4BBEA3] focus:border-transparent transition-all duration-200 ease-in-out shadow-sm"
        :class="{ 'border-red-500': checkErrors('email') }"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Senha"
        class="w-fit px-4 py-2 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4BBEA3] focus:border-transparent transition-all duration-200 ease-in-out shadow-sm"
        :class="{ 'border-red-500': checkErrors('password') }"
      />

      <button @click="login" class="min-w-52 px-4 py-2 bg-[#3DA88F] text-white rounded-lg hover:bg-[#44B399] focus:outline-none focus:ring-2 focus:ring-[#4BBEA3] focus:ring-offset-2 transition-all duration-200 ease-in-out shadow-sm font-semibold cursor-pointer">
        {{ signIn ? 'Cadastrar' : 'Login' }}
      </button>

      <div v-if="!signIn" class="flex flex-col items-center justify-center gap-2">
        <span class="text-sm text-gray-500">Ainda não tem sua conta?</span>
        <button @click.prevent="signIn = true" class="text-sm text-[#308b76] font-semibold cursor-pointer">Cadastre</button>
      </div>

      <div v-if="signIn" class="flex flex-col items-center justify-center gap-2">
        <span class="text-sm text-gray-500">Já tem sua conta?</span>
        <button @click.prevent="signIn = false" class="text-sm text-[#308b76] font-semibold cursor-pointer">Login</button>
      </div>

      <div v-if="errors.general" class="w-fit px-4 py-2 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4BBEA3] focus:border-transparent transition-all duration-200 ease-in-out shadow-sm">
        <span class="text-sm text-red-500">{{ errors.general }}</span>
      </div>
    </div>
  </div>
</template>