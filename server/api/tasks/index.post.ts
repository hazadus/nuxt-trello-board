import { TaskModel } from "../../models/Task";
import { ColumnModel } from "../../models/Column";
import { TaskValidationSchema } from "../../validation";
import { ITaskWithTargetColumnId } from "@/types";

export default defineEventHandler(async (event) => {
  const taskWithColumnId = (await readBody(event)) as ITaskWithTargetColumnId;
  const body = taskWithColumnId.task;
  const targetColumnId = taskWithColumnId.targetColumnID;

  // Validate
  let { error } = TaskValidationSchema.validate(body);
  if (error) {
    console.log("Error validating task:", error.message);
    // This will return JSON with detailed error description from the endpoint, e.g.:
    // {
    //  "url": "/api/tasks",
    //  "statusCode": 400,
    //  "statusMessage": "",
    //  "message": "title length must be at least 3 characters long",
    //  "stack": " ...  "
    // }
    throw createError({
      // Remove all quotes from error message
      message: error.message.replace(/"/g, ""),
      statusCode: 400,
      fatal: false,
    });
  }

  // Create Task
  try {
    const task = await TaskModel.create(body);
    console.log("✅ Task created:", task);

    //Add task to target column:
    const column = await ColumnModel.findById(targetColumnId);
    column?.tasks.push(task);
    column?.save();

    return task;
  } catch (e: any) {
    console.log("❌ Error creating task:", e.message);
    // This will return JSON with detailed error description from the endpoint,
    // same fields as in example above.
    throw createError({
      message: e.message,
    });
  }
});
