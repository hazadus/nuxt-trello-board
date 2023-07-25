import { H3Event } from "h3";
import { IUser } from "@/types";

/**
 * Check if user is authenticated via context data set by server middleware.
 * @param event
 */
export function isAuthenticated(event: H3Event): Boolean {
  return Boolean(event.context.isAuthenticated);
}

/**
 * Retrieve user data from context, set by server middleware.
 * @param event
 */
export function getAuthenticatedUser(event: H3Event): IUser | null {
  return event.context.user;
}
