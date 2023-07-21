import { ColumnModel } from "../../models/Column";

export default defineEventHandler(async () => {
  // Simply return all `Column` documents
  return await ColumnModel.find().populate("tasks");
});
