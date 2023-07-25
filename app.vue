<script setup lang="ts">
const authStore = useAuthStore();
authStore.initializeStore();
</script>

<template>
  <Head>
    <Title>Доскач</Title>
  </Head>

  <Body>
    <div class="app min-h-[100vh] bg-teal-500">
      <TheNavBar />
      <NuxtPage />
    </div>
  </Body>
</template>
