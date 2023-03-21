<template>
  <Head>
    <Title>Канбан-доска</Title>
  </Head>

  <Body>
    <div class="p-10 h-[100vh] bg-teal-600 overflow-auto">
      <h1 class="text-4xl mb-4 text-white">
        Канбан-доска
        <Icon name="cib:nuxt-js" /> &middot;
        <Icon name="cib:vue-js" /> &middot;
        <Icon name="cib:typescript" />
      </h1>
      <TrelloBoard />
    </div>
  </Body>
</template>
