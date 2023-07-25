import { H3Event } from "h3";
import { IUser } from "@/types";

export function isAuthenticated(event: H3Event): Boolean {
  return Boolean(event.context.isAuthenticated);
}

export function getAuthenticatedUser(event: H3Event): IUser | null {
  return event.context.user;
}
