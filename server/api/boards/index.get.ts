import { BoardModel } from "../../models/Board";

export default defineEventHandler(async () => {
  // Simply return all `Board` documents
  // Populate columns, and in each column populate `tasks` array with detailed task info:
  return await BoardModel.find().populate({ path: "columns", populate: { path: "tasks" } });
});
