<template>
  <div class="error-page">
    <h1>{{ errorCode }}</h1>
    <p>{{ errorMessage }}</p>
    <router-link to="/">Voltar para a Home</router-link>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  errorCode: {
    type: String,
    default: '404',
  },
  errorMessage: {
    type: String,
    default: 'Página não encontrada',
  },
});
</script>

<style scoped>
.error-page {
  text-align: center;
  margin-top: 50px;
}
</style>