<script setup lang="ts">
const authStore = useAuthStore();
const boardStore = useBoardStore();
const router = useRouter();

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    router.push("/login/");
  }
});

async function onClickCreateNewBoard() {
  await boardStore.create({
    title: `Новая доска ${boardStore.boards.length + 1}`,
    columns: [],
  });
}

boardStore.getAll();
</script>

<template>
  <Title>
    Все доски | Доскач
  </Title>

  <h1 class="text-4xl font-semibold text-gray-100 px-5 py-6">
    Все доски
  </h1>

  <section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4 px-5 pt-0 pb-5">
    <div @click="onClickCreateNewBoard()"
      class="h-48 p-4 bg-gray-50 rounded-lg shadow-md overflow-hidden cursor-pointer text-center hover:bg-opacity-90 ">
      Создать новую доску
    </div>

    <template v-if="boardStore.boards.length">
      <div v-for="board in boardStore.boards" :key="`board-id-${board._id}`"
        class="h-48 p-4 bg-teal-600 rounded-lg shadow-md overflow-hidden cursor-pointer hover:bg-opacity-90 hover:scale-[1.01]"
        @click="$router.push(buildBoardUrl(board._id!))">
        <div class="flex flex-col h-full">
          <div class="flex grow text-2xl text-gray-50 ">
            {{ board.title }}
          </div>
          <div class="grow-0 text-sm text-gray-300">
            {{ board.columns.length }} кол. &middot;
            {{ board.columns.reduce((accumulator, column) => accumulator + column.tasks.length, 0) }} карт.
          </div>
        </div>
      </div>
    </template>
  </section>
</template>