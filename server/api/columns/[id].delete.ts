import { ColumnModel } from "@/server/models/Column";
import { BoardModel } from "@/server/models/Board";

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
  } catch (e: any) {
    console.log("❌ Error deleting column:", e.message);
    // This will return JSON with detailed error description from the endpoint,
    throw createError({
      message: e.message,
    });
  }

  // Find board(s) containing this column
  const boards = await BoardModel.find({ columns: { $in: [id] } }).exec();
  for (let i = 0; i < boards.length; i++) {
    // Remove column from each board
    boards[i].columns = boards[i].columns.filter((column) => column._id != id);
    try {
      await BoardModel.findByIdAndUpdate(boards[i]._id, boards[i]);
      console.log(`✅✅ Removed Column "${id}" from board "${boards[i].title}"`);
    } catch (e: any) {
      console.log("❌ Error while deleting column => updating board:", e.message);
      throw createError({
        message: e.message,
      });
    }
  }

  return { message: `Column '${id}' deleted.` };
});
