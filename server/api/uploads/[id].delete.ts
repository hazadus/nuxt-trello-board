import { FileModel } from "@/server/models/File";
import { TaskModel } from "@/server/models/Task";
import { unlink } from "node:fs";
import * as path from "path";

export default defineEventHandler(async (event) => {
  if (!isAuthenticated(event)) {
    throw createError({
      message: "User must be authenticated to delete uploaded files.",
      statusCode: 403,
      fatal: false,
    });
  }

  const fileDocumentId: string = event.context.params?.id || "";
  const { uploadDir } = useRuntimeConfig();

  // Throw error if authenticated user has no permission to delete the file
  await handleDeletePermission("File", fileDocumentId, event);

  // 1. Find file document
  const fileDocument = await FileModel.findById(fileDocumentId);
  if (!fileDocument) {
    throw createError({
      message: `File document with id=${fileDocumentId} not found.`,
      statusCode: 500,
      fatal: false,
    });
  }

  // 2. Delete actual file
  const filePath = path.join(uploadDir + fileDocument.fileName);
  unlink(filePath, async (err) => {
    if (err)
      throw createError({
        message: `Error deleting file: ${filePath}:` + err.message,
        statusCode: 500,
        fatal: false,
      });

    console.log(`✅ ${filePath} was deleted`);

    // 3. Remove File reference from task (if exists)
    const taskDocument = await TaskModel.findOne({ attachedFiles: { $in: [fileDocument._id] } });
    if (taskDocument) {
      try {
        const updatedAttachedFiles = taskDocument.attachedFiles?.filter(
          (item) => item._id != fileDocumentId,
        );
        await TaskModel.findByIdAndUpdate(taskDocument._id, {
          attachedFiles: updatedAttachedFiles,
        });
        console.log("✅ Updated referencing task:", taskDocument.title);
      } catch (error: any) {
        console.log("❌ Error while deleting File => updating referencing task:", error.message);
        throw createError({
          message: error.message,
        });
      }
    }

    // 4. Delete File document from MongoDB
    try {
      await FileModel.findByIdAndDelete(fileDocumentId);
      console.log(`✅ File document "${fileDocumentId}" deleted!`);
    } catch (e: any) {
      console.log("❌ Error deleting file document:", e.message);
      throw createError({
        message: e.message,
      });
    }
  });

  return { message: `File '${fileDocumentId}' (${fileDocument.fileName}) deleted.` };
});
