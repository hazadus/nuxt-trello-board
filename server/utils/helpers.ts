import { H3Event } from "h3";
import { IUser, ITask, IColumn, IBoard } from "@/types";
import { TaskModel } from "@/server/models/Task";

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

/**
 * Check if currently logged in user can update a document.
 * @param documentType Task, Column, or Board
 * @param documentId ID of the document to check permissions to
 * @param event H3Event
 */
export async function isAllowedToUpdate(
  documentType: "Task" | "Column" | "Board",
  documentId: string,
  event: H3Event,
) {
  let document: ITask | IColumn | IBoard | null;
  const userId = getAuthenticatedUser(event)?._id;

  if (documentType === "Task") {
    document = await TaskModel.findById(documentId).populate("user");
  } else {
    document = null;
  }

  return document?.user._id?.toString() === userId?.toString();
}

/**
 * For use in APIs. Throw error if authenticated user has no permission to update the document.
 * @param documentType Task, Column, or Board
 * @param documentId ID of the document to check permissions to
 * @param event H3Event
 */
export async function handleUpdatePermission(
  documentType: "Task" | "Column" | "Board",
  documentId: string,
  event: H3Event,
) {
  if (!(await isAllowedToUpdate(documentType, documentId, event))) {
    console.log(
      `❌ Error updating ${documentType} "${documentId}": only authors can update their ${documentType}s.`,
    );
    throw createError({
      message: `Only authors can update their ${documentType}s.`,
      statusCode: 403,
      fatal: false,
    });
  }
}
