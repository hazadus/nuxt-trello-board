export default defineEventHandler(async (event) => {
  if (!process.dev) return { disabled: true };

  // Enable SSE endpoint
  setHeader(event, "cache-control", "no-cache");
  setHeader(event, "connection", "keep-alive");
  setHeader(event, "content-type", "text/event-stream");
  setResponseStatus(event, 200);

  let counter = 0;

  const sendEvent = (data: any) => {
    console.log("sendEvent() data:", data);
    event.node.res.write(`event: notify\n`);
    event.node.res.write(`id: ${++counter}\n`);
    event.node.res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  myHooks.hook("sse:event", sendEvent);
  sendEvent("Test event");

  // Let the connection opened
  event._handled = true;
});
