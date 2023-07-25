<script setup lang="ts">
const authStore = useAuthStore();
const router = useRouter();

const emailInputElement: Ref<HTMLInputElement | null> = ref(null);

const email: Ref<string> = ref("");
const password: Ref<string> = ref("");

const isFetching: Ref<boolean> = ref(false);

async function submitForm() {
  isFetching.value = true;

  await authStore.logIn({
    email: email.value,
    plainPassword: password.value,
  });

  isFetching.value = false;
  if (authStore.isAuthenticated) router.push("/");
}

onBeforeMount(() => {
  if (authStore.isAuthenticated) {
    router.push("/");
  }
});

onMounted(() => {
  emailInputElement.value?.focus();
});
</script>

<template>
  <Title>
    Log In | Доскач
  </Title>

  <section class="bg-teal-500">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0" style="height: calc(100vh - 64px);">
      <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Sign in to your account
          </h1>

          <form class="space-y-4 md:space-y-6" @submit.prevent="submitForm">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900">
                Your email
              </label>
              <input v-model="email" ref="emailInputElement" :disabled="isFetching" type="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="name@domain.ru" required>
            </div>

            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900">
                Password
              </label>
              <input v-model="password" :disabled="isFetching" type="password" placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required>
            </div>

            <button :disabled="isFetching" :class="isFetching ? 'is-loading' : ''" type="submit"
              class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Sign in
            </button>

            <p class="text-sm font-light text-gray-500">
              Don’t have an account yet?
              <RouterLink to="/signup/" class="font-medium text-primary-600 hover:underline">
                Sign up
              </RouterLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>