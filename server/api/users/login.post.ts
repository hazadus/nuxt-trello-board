import { UserModel } from "../../models/User";
import { LoginCredentialsValidationSchema } from "../../validation";
import { ILoginCredentials } from "@/types";

export default defineEventHandler(async (event) => {
  //
  // Login
  // ...
  //
  const body = (await readBody(event)) as ILoginCredentials;

  // Validate
  let { error } = LoginCredentialsValidationSchema.validate(body);

  if (error) {
    console.log("❌ Error validating login credentials:", error.message);
    throw createError({
      message: error.message.replace(/"/g, ""),
      statusCode: 400,
      fatal: false,
    });
  }

  // Check if user with this email actually exists
  const existingUser = await UserModel.where({ email: body.email }).findOne();
  if (!existingUser) {
    const errorMessage = `User with email '${body.email}' does not exist.`;
    console.log("❌", errorMessage);
    throw createError({
      message: errorMessage,
      statusCode: 400,
      fatal: false,
    });
  }

  // User exists, check password
  // ...

  // User and password are correct, login
  try {
    return { message: "Test - logged in." };
  } catch (e: any) {
    console.log("❌ Error logging in:", e.message);
    // This will return JSON with detailed error description from the endpoint,
    // same fields as in example above.
    throw createError({
      message: e.message,
    });
  }
});
