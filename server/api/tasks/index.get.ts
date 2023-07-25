import { TaskModel } from "@/server/models/Task";

export default defineEventHandler(async (event) => {
  if (!isAuthenticated(event)) {
    throw createError({
      message: "User must be authenticated to get list of tasks.",
      statusCode: 403,
      fatal: false,
    });
  }

  // Simply return all `Task` documents
  return await TaskModel.find();
});
