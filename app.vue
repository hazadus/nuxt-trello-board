<script setup lang="ts">
const authStore = useAuthStore();
authStore.initializeStore();
</script>

<template>
  <Body class="app min-h-[100vh] bg-teal-500">
    <Navbar />
    <NuxtPage />
  </Body>
</template>
