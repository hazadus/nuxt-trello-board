<script setup lang="ts">
const authStore = useAuthStore();
authStore.initializeStore();
</script>

<template>
  <Head>
    <Title>Канбан-доска</Title>
  </Head>

  <Body>
    <div class="app h-[100vh] bg-teal-600">
      <TheNavBar />
      <NuxtPage />
    </div>
  </Body>
</template>
