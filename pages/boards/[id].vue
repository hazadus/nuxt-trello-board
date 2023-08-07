<script setup lang="ts">
const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    router.push("/login/");
  }
});
</script>

<template>
  <TrelloBoard v-if="authStore.isAuthenticated" :boardId="(route.params.id as string)"
    :key="`board-id-${(route.params.id as string)}`" />
</template>