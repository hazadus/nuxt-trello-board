import TaskModel from "../models/Task";

export default defineEventHandler(async () => {
  return await TaskModel.find();
});
