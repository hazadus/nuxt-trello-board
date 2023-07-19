import { TaskModel } from "../models/Task";
import { Task } from "@/types";

export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as Task;

  const task = new TaskModel(body);
  await task.save();
});
