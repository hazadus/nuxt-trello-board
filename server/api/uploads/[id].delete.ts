import { FileModel } from "@/server/models/File";
import { unlink } from "node:fs";

export default defineEventHandler(async (event) => {
  if (!isAuthenticated(event)) {
    throw createError({
      message: "User must be authenticated to delete uploaded files.",
      statusCode: 403,
      fatal: false,
    });
  }

  const id: string = event.context.params?.id || "";
  const { uploadDir } = useRuntimeConfig();

  // Throw error if authenticated user has no permission to delete the file
  await handleDeletePermission("File", id, event);

  // 1. Find file document
  const fileDocument = await FileModel.findById(id);
  if (!fileDocument) {
    throw createError({
      message: `File document with id=${id} not found.`,
      statusCode: 500,
      fatal: false,
    });
  }

  // 2. Delete actual file
  const filePath = uploadDir + fileDocument.fileName;
  unlink(filePath, async (err) => {
    if (err)
      throw createError({
        message: `Error deleting file: ${filePath}:` + err.message,
        statusCode: 500,
        fatal: false,
      });

    console.log(`✅ ${filePath} was deleted`);

    // 3. Delete File document from MongoDB
    try {
      await FileModel.findByIdAndDelete(id);
      console.log(`✅ File document "${id}" deleted!`);
    } catch (e: any) {
      console.log("❌ Error deleting file document:", e.message);
      throw createError({
        message: e.message,
      });
    }
  });

  return { message: `File '${id}' (${fileDocument.fileName}) deleted.` };
});
