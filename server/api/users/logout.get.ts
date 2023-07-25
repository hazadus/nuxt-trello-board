import { AuthTokenModel } from "@/server/models/AuthToken";

export default defineEventHandler(async (event) => {
  if (!isAuthenticated(event)) {
    throw createError({
      message: "User must be authenticated to perform logout.",
      statusCode: 403,
      fatal: false,
    });
  }

  // Logging out is essentially deleting AuthToken from the database:
  const res = await AuthTokenModel.where({ token: event.node.req.headers.authorization }).deleteOne();

  if (res.deletedCount) return { message: "User successfully logged out" };
  else {
    console.log("❌ Can't delete auth token!");
    throw createError({
      message: "Can't delete auth token!",
      statusCode: 500,
      fatal: false,
    });
  }
});
