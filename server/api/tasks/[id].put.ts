import { TaskModel } from "../../models/Task";
import { TaskValidationSchema } from "../../validation";

export default defineEventHandler(async (event) => {
  if (!isAuthenticated(event)) {
    throw createError({
      message: "User must be authenticated to update tasks.",
      statusCode: 403,
      fatal: false,
    });
  }
  //
  // On success, return updated task as JSON.
  //
  const body = await readBody(event);
  const id = event.context.params?.id;

  // Validate
  // Abort on first error, allow unknown keys
  let { error } = TaskValidationSchema.validate(body, { abortEarly: true, allowUnknown: true });
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

  // Update Task
  try {
    // `{ new: true }` option is to return updated task.
    const updatedTask = await TaskModel.findByIdAndUpdate(id, body, { new: true });
    console.log(`✅ Task "${id}" updated!`);
    return updatedTask;
  } catch (e: any) {
    console.log("❌ Error updating task:", e.message);
    // This will return JSON with detailed error description from the endpoint,
    // same fields as in example above.
    throw createError({
      message: e.message,
    });
  }
});
