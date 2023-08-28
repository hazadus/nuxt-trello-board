import { FileModel } from "@/server/models/File";

export default defineEventHandler(async (event) => {
  if (!isAuthenticated(event)) {
    throw createError({
      message: "User must be authenticated to get list of uploaded files.",
      statusCode: 403,
      fatal: false,
    });
  }

  // Return all `File` documents created by authenticated user.
  return await FileModel.find({ user: getAuthenticatedUser(event)!._id! }).sort({
    createdAt: "desc",
  });
});
