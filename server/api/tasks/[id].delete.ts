import { TaskModel } from "../../models/Task";

export default defineEventHandler(async (event) => {
  if (!isAuthenticated(event)) {
    throw createError({
      message: "User must be authenticated to delete tasks.",
      statusCode: 403,
      fatal: false,
    });
  }

  const id = event.context.params?.id;

  // Delete Task
  try {
    await TaskModel.findByIdAndDelete(id);
    console.log(`✅ Task "${id}" deleted!`);
    return { message: `Task '${id}' deleted.` };
  } catch (e: any) {
    console.log("❌ Error deleting task:", e.message);
    // This will return JSON with detailed error description from the endpoint,
    throw createError({
      message: e.message,
    });
  }
});
