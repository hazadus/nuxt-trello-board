import { TaskModel } from "../../models/Task";

export default defineEventHandler(async () => {
  // Simply return all `Task` documents
  return await TaskModel.find();
});
