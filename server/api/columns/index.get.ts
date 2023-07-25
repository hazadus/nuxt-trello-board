import { ColumnModel } from "../../models/Column";

export default defineEventHandler(async (event) => {
  if (!isAuthenticated(event)) {
    throw createError({
      message: "User must be authenticated to get list of columns.",
      statusCode: 403,
      fatal: false,
    });
  }

  // Simply return all `Column` documents
  return await ColumnModel.find().populate("tasks");
});
