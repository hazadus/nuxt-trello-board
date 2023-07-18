<template>
  <Head>
    <Title>Канбан-доска</Title>
  </Head>

  <Body>
    <div class="app p-10 h-[100vh] bg-teal-600 overflow-auto">
      <h1 class="text-4xl mb-4 text-white">
        Канбан-доска
        <Icon name="logos:nuxt-icon" /> &middot;
        <Icon name="logos:vue" /> &middot;
        <Icon name="logos:typescript-icon" />
      </h1>
      <TrelloBoard />
    </div>
  </Body>
</template>
