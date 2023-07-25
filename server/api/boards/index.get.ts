import { BoardModel } from "../../models/Board";

export default defineEventHandler(async (event) => {
  if (!isAuthenticated(event)) {
    throw createError({
      message: "User must be authenticated to get list of boards.",
      statusCode: 403,
      fatal: false,
    });
  }

  // Simply return all `Board` documents
  // Populate columns, and in each column populate `tasks` array with detailed task info:
  return await BoardModel.find().populate({ path: "columns", populate: { path: "tasks" } });
});
