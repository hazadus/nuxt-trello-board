<script setup lang="ts">
const source = new EventSource("/api/sse");
console.log("Source ready state:", source.readyState);

// Note that the event we gave our notify utility function is called "message_created"
// so that's what we listen for here.
source.addEventListener("notify", function (evt) {
  // Parse the payload
  let payload = JSON.parse(evt.data);
  console.log("Event data:", payload);
  console.log("Event message:", payload.message);
});
</script>

<template>
  <h1 class="text-3xl p-5">
    Test SSE
  </h1>
</template>