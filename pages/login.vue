<script setup lang="ts">

const authStore = useAuthStore();

async function onClickLogin() {
  await authStore.logIn({
    email: "myxomop@hazadus.ru",
    plainPassword: "12345678",
  })
}
</script>

<template>
  <Title>
    Log In
  </Title>

  <div class="p-20">
    <a @click="onClickLogin" class="text-white p-3 inline-block bg-blue-500 cursor-pointer">
      Login
    </a>
  </div>
</template>