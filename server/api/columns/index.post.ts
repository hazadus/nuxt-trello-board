import { ColumnModel } from "../../models/Column";
import { BoardModel } from "../../models/Board";
import { ColumnValidationSchema } from "../../validation";
import { Column } from "@/types";

export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as Column;

  // Validate
  // `{ allowUnknown: true }` is for `targetBoardId`: it does not present in the schema,
  // we only use it here below to add column to target board.
  let { error } = ColumnValidationSchema.validate(body, { allowUnknown: true });
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

    // Add column to the board, if specified:
    if (body.targetBoardId) {
      const targetBoard = await BoardModel.findById(body.targetBoardId);
      if (targetBoard) {
        targetBoard.columns.push(column);
        targetBoard.save();
      }
    }

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
