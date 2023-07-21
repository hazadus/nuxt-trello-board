import { UserModel } from "../../models/User";
import { AuthTokenModel } from "../../models/AuthToken";
import { LoginCredentialsValidationSchema } from "../../validation";
import { ILoginCredentials } from "@/types";
import { hash, compare } from "bcrypt";

export default defineEventHandler(async (event) => {
  //
  // Login
  // Return AuthToken on success
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
  const user = await UserModel.where({ email: body.email }).findOne();
  if (!user) {
    const errorMessage = `User with email '${body.email}' does not exist.`;
    console.log("❌", errorMessage);
    throw createError({
      message: errorMessage,
      statusCode: 400,
      fatal: false,
    });
  }

  // User exists, check password
  const isPasswordCorrect = await compare(body.plainPassword, user.hashedPassword!);
  if (!isPasswordCorrect) {
    console.log("❌ Incorrect password.");
    throw createError({
      message: "Incorrect password",
      statusCode: 403,
      fatal: false,
    });
  }

  // Check if auth token already exists. If so, return one. Otherwise, create new token and return it.
  // Do not return `hashedPassword` within user data!
  let token = await AuthTokenModel.where({ user: user._id }).findOne().populate("user", "-hashedPassword");
  if (!token) {
    token = await AuthTokenModel.create({
      token: await hash(user.email, 10), // hash email to create random token
      user: user._id,
    });
  }
  console.log(`🚀 '${user.email}': login correct, returning token!`);
  return token;
});
