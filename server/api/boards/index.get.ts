import { BoardModel } from "@/server/models/Board";

export default defineEventHandler(async (event) => {
  if (!isAuthenticated(event)) {
    throw createError({
      message: "User must be authenticated to get list of boards.",
      statusCode: 403,
      fatal: false,
    });
  }

  // Return all `Board` documents created by authenticated user.
  // Populate columns, and in each column populate `tasks` array with detailed task info:
  return await BoardModel.find({ user: getAuthenticatedUser(event)!._id! }).populate([
    {
      path: "columns",
      populate: { path: "tasks" },
    },
    // Populate deeply nested array with attached files
    {
      path: "columns",
      populate: {
        path: "tasks",
        populate: {
          path: "attachedFiles",
        },
      },
    },
  ]);
});
