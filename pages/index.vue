<script setup lang="ts">
const authStore = useAuthStore();
const router = useRouter();

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    router.push("/login/");
  }
});
</script>

<template>
  <TrelloBoard v-if="authStore.isAuthenticated" class="p-5 overflow-auto" />
</template>