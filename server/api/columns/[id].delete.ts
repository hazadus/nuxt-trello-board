import { ColumnModel } from "../../models/Column";

export default defineEventHandler(async (event) => {
  if (!isAuthenticated(event)) {
    throw createError({
      message: "User must be authenticated to delete columns.",
      statusCode: 403,
      fatal: false,
    });
  }

  const id = event.context.params?.id;

  // Do not allow deleting non-empty columns
  const column = await ColumnModel.findById(id);
  if (column?.tasks.length) {
    throw createError({
      message: `Can't delete column "${column.title}" because it's not empty!`,
      statusCode: 400,
      fatal: false,
    });
  }

  // Delete Column
  try {
    await ColumnModel.findByIdAndDelete(id);
    console.log(`✅ Column "${id}" deleted!`);
    return { message: `Column '${id}' deleted.` };
  } catch (e: any) {
    console.log("❌ Error deleting column:", e.message);
    // This will return JSON with detailed error description from the endpoint,
    throw createError({
      message: e.message,
    });
  }
});
