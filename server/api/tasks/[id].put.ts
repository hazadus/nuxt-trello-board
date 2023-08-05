import { TaskModel } from "@/server/models/Task";
import { TaskValidationSchema } from "@/server/validation";

export default defineEventHandler(async (event) => {
  if (!isAuthenticated(event)) {
    throw createError({
      message: "User must be authenticated to update tasks.",
      statusCode: 403,
      fatal: false,
    });
  }

  const body = await readBody(event);
  const id: string = event.context.params?.id || "";

  // Check if authenticated user can update the task
  await handleUpdatePermission("Task", id, event);

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
