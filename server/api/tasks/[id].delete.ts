import { TaskModel } from "@/server/models/Task";
import { ColumnModel } from "@/server/models/Column";

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
  } catch (e: any) {
    console.log("❌ Error deleting task:", e.message);
    // This will return JSON with detailed error description from the endpoint,
    throw createError({
      message: e.message,
    });
  }

  // Find column(s) containing this task
  const columns = await ColumnModel.find({ tasks: { $in: [id] } }).exec();
  for (let i = 0; i < columns.length; i++) {
    // Remove task from each column
    columns[i].tasks = columns[i].tasks.filter((task) => task._id != id);
    try {
      await ColumnModel.findByIdAndUpdate(columns[i]._id, columns[i]);
      console.log(`✅✅ Removed Task "${id}" from column "${columns[i].title}"`);
    } catch (e: any) {
      console.log("❌ Error while deleting task => updating column:", e.message);
      throw createError({
        message: e.message,
      });
    }
  }

  return { message: `Task '${id}' deleted.` };
});
