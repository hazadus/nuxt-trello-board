import { UserModel } from "../../models/User";
import { UserValidationSchema } from "../../validation";
import { IUser } from "@/types";

export default defineEventHandler(async (event) => {
  //
  // Create new user and return it.
  // Return 400 if user with passed email already exists.
  //
  const body = (await readBody(event)) as IUser;

  // Validate
  let { error } = UserValidationSchema.validate(body, { allowUnknown: true });

  if (error) {
    console.log("❌ Error validating user:", error.message);
    // This will return JSON with detailed error description from the endpoint, e.g.:
    // {
    //  "url": "/api/users",
    //  "statusCode": 400,
    //  "statusMessage": "",
    //  "message": "firstName length must be at least 1 characters long",
    //  "stack": " ...  "
    // }
    throw createError({
      // Remove all quotes from error message
      message: error.message.replace(/"/g, ""),
      statusCode: 400,
      fatal: false,
    });
  }

  // Check if user with this email already exists
  const existingUser = await UserModel.where({ email: body.email }).findOne();
  if (existingUser) {
    const errorMessage = `User with email '${body.email}' already exists.`;
    console.log("❌🤬", errorMessage);
    throw createError({
      message: errorMessage,
      statusCode: 400,
      fatal: false,
    });
  }

  // Create User
  try {
    const user = await UserModel.create(body);
    console.log("✅😀 User created:", user);
    return user;
  } catch (e: any) {
    console.log("❌ Error creating user:", e.message);
    // This will return JSON with detailed error description from the endpoint,
    // same fields as in example above.
    throw createError({
      message: e.message,
    });
  }
});
