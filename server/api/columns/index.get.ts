import { ColumnModel } from "@/server/models/Column";

export default defineEventHandler(async (event) => {
  if (!isAuthenticated(event)) {
    throw createError({
      message: "User must be authenticated to get list of columns.",
      statusCode: 403,
      fatal: false,
    });
  }

  // Return all `Column` documents created by authenticated user.
  return await ColumnModel.find({ user: getAuthenticatedUser(event)!._id! }).populate("tasks");
});
