import { TaskModel } from "../../models/Task";
import { ColumnModel } from "../../models/Column";
import { TaskValidationSchema } from "../../validation";
import { ITask } from "@/types";

export default defineEventHandler(async (event) => {
  if (!isAuthenticated(event)) {
    throw createError({
      message: "User must be authenticated to create tasks.",
      statusCode: 403,
      fatal: false,
    });
  }

  const body = (await readBody(event)) as ITask;

  // Validate
  // `{ allowUnknown: true }` is for `targetColumnId`: it does not present in the schema,
  // we only use it here below to add task to target column.
  let { error } = TaskValidationSchema.validate(body, { allowUnknown: true });
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
    if (body.targetColumnId) {
      const targetColumn = await ColumnModel.findById(body.targetColumnId);
      if (targetColumn) {
        targetColumn.tasks.push(task);
        targetColumn.save();
      }
    }

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
