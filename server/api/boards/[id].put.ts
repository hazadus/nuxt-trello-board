import { BoardModel } from "@/server/models/Board";
import { BoardValidationSchema } from "@/server/validation";

export default defineEventHandler(async (event) => {
  if (!isAuthenticated(event)) {
    throw createError({
      message: "User must be authenticated to update boards.",
      statusCode: 403,
      fatal: false,
    });
  }

  const body = await readBody(event);
  const id: string = event.context.params?.id || "";

  // Check if authenticated user can update the board
  await handleUpdatePermission("Board", id, event);

  // Validate
  // Abort on first error, allow unknown keys
  let { error } = BoardValidationSchema.validate(body, { abortEarly: true, allowUnknown: true });
  if (error) {
    console.log("❌ Error validating board:", error.message);
    // This will return JSON with detailed error description from the endpoint, e.g.:
    // {
    //  "url": "/api/boards",
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

  // Update Board
  try {
    // `{ new: true }` option is to return updated column.
    const updatedBoard = await BoardModel.findByIdAndUpdate(id, body, { new: true });
    console.log(`✅ Board "${id}" updated!`);
    return updatedBoard;
  } catch (e: any) {
    console.log("❌ Error updating board:", e.message);
    // This will return JSON with detailed error description from the endpoint,
    // same fields as in example above.
    throw createError({
      message: e.message,
    });
  }
});
