<script setup>
</script>

<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" class="bg-[#4BBEA3] h-screen" />
  </router-view>
</template>
