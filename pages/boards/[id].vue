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
  <TrelloBoard :boardId="(route.params.id as string)" v-if="authStore.isAuthenticated" />
</template>