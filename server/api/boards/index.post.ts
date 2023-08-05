import { BoardModel } from "@/server/models/Board";
import { BoardValidationSchema } from "@/server/validation";
import { IBoard } from "@/types";

export default defineEventHandler(async (event) => {
  if (!isAuthenticated(event)) {
    throw createError({
      message: "User must be authenticated to create boards.",
      statusCode: 403,
      fatal: false,
    });
  }

  const body = (await readBody(event)) as IBoard;

  // Validate
  let { error } = BoardValidationSchema.validate(body);
  if (error) {
    console.log("Error validating board:", error.message);
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

  // Create Board
  try {
    const board = await BoardModel.create({
      ...body,
      user: getAuthenticatedUser(event)!,
    });
    console.log("✅ Board created:", board);

    return board;
  } catch (e: any) {
    console.log("❌ Error creating board:", e.message);
    // This will return JSON with detailed error description from the endpoint,
    // same fields as in example above.
    throw createError({
      message: e.message,
    });
  }
});
