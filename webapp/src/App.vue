<script setup>
</script>

<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" class="bg-[#4BBEA3] h-screen px-4 md:px-16 lg:px-48" />
  </router-view>
</template>
