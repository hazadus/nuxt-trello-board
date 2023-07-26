<script setup lang="ts">
const authStore = useAuthStore();
const boardStore = useBoardStore();
const router = useRouter();

boardStore.getAll();

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    router.push("/login/");
  }
});
</script>

<template>
  <Title>
    All Boards | Доскач
  </Title>

  <ul v-if="boardStore.boards.length" class="p-4">
    <li v-for="board in boardStore.boards" :key="`board-id-${board._id}`">
      <RouterLink :to="buildBoardUrl(board._id!)" class="hover:underline">
        {{ board.title }}
      </RouterLink>
    </li>
  </ul>
</template>