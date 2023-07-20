import { ColumnModel } from "../../models/Column";
import { ColumnValidationSchema } from "../../validation";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Validate
  let { error } = ColumnValidationSchema.validate(body);
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

  // Create Task
  try {
    const column = await ColumnModel.create(body);
    console.log("✅ Column created:", column);
    return column;
  } catch (e: any) {
    console.log("❌ Error creating column:", e.message);
    // This will return JSON with detailed error description from the endpoint,
    // same fields as in example above.
    throw createError({
      message: e.message,
    });
  }
});
