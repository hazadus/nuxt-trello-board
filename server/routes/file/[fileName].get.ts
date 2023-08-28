import fs from "fs";
import * as path from "path";
import { H3Event } from "h3";

export default defineEventHandler(async (event: H3Event) => {
  const { uploadDir } = useRuntimeConfig();
  const fileName = decodeURI(event.context.params?.fileName || "");
  const filePath = path.join(uploadDir + fileName);

  console.log("📦 GET", filePath);

  return sendStream(event, fs.createReadStream(filePath));
});
