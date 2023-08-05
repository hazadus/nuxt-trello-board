import { ColumnModel } from "@/server/models/Column";
import { ColumnValidationSchema } from "@/server/validation";

export default defineEventHandler(async (event) => {
  if (!isAuthenticated(event)) {
    throw createError({
      message: "User must be authenticated to update columns.",
      statusCode: 403,
      fatal: false,
    });
  }

  const body = await readBody(event);
  const id: string = event.context.params?.id || "";

  // Check if authenticated user can update the column
  await handleUpdatePermission("Column", id, event);

  // Validate
  // Abort on first error, allow unknown keys
  let { error } = ColumnValidationSchema.validate(body, { abortEarly: true, allowUnknown: true });
  if (error) {
    console.log("Error validating column:", error.message);
    // This will return JSON with detailed error description from the endpoint, e.g.:
    // {
    //  "url": "/api/columns",
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

  // Update Column
  try {
    // `{ new: true }` option is to return updated column.
    const updatedColumn = await ColumnModel.findByIdAndUpdate(id, body, { new: true });
    console.log(`✅ Column "${id}" updated!`);
    return updatedColumn;
  } catch (e: any) {
    console.log("❌ Error updating column:", e.message);
    // This will return JSON with detailed error description from the endpoint,
    // same fields as in example above.
    throw createError({
      message: e.message,
    });
  }
});
