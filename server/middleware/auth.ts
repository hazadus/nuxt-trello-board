import { AuthTokenModel } from "@/server/models/AuthToken";

export default defineEventHandler(async (event) => {
  //
  // - Check `authorization` header in the request
  // - Try to find provided token in the database
  // - If succeeded, set auth flag to `true` in the context, and put user info there.
  //
  event.context.isAuthenticated = false;
  event.context.user = null;

  if (event.node.req.headers.authorization) {
    // Find auth token in the database to ensure it is valid one
    const authToken = await AuthTokenModel.where({ token: event.node.req.headers.authorization })
      .findOne()
      .populate("user", "-hashedPassword");

    if (authToken) {
      event.context.isAuthenticated = true;
      event.context.user = authToken.user;
    }
  }
});
