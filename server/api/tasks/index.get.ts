import { TaskModel } from "@/server/models/Task";

export default defineEventHandler(async (event) => {
  if (!isAuthenticated(event)) {
    throw createError({
      message: "User must be authenticated to get list of tasks.",
      statusCode: 403,
      fatal: false,
    });
  }

  // Return all `Task` documents created by authenticated user.
  return await TaskModel.find({ user: getAuthenticatedUser(event)!._id! });
});
