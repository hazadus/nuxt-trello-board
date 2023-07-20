import { TaskModel } from "../../models/Task";
import { TaskValidationSchema } from "../../validation";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

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
