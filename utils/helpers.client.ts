import { HttpMethod, ID } from "types";
import { useAuthStore } from "../composables/authStore";

/**
 * Fetch data from API. Adds `Authorization` header with user token to all requests.
 *
 * @param endPoint - API endpoint without prefix (e.g. `/boards` for `/api/boards`).
 * @param method - required HTTP method. `GET` by default.
 * @param body - request body.
 */
export async function fetchApi<T>(
  endPoint: string,
  method: HttpMethod = "GET",
  body: any | undefined = undefined,
) {
  // Reference: https://nuxt.com/docs/api/utils/dollarfetch
  return await $fetch<T>(`/api${endPoint}`, {
    method,
    headers: [["authorization", useAuthStore().token]],
    body,
  });
}

export function buildBoardUrl(boardId: ID) {
  return `/boards/${boardId}`;
}

/**
 * Send an event to my Umami stats app.
 * Reference: https://umami.is/docs/track-events
 *
 * @param event event name will be displayed on the dashboard
 */
export const createUmamiEvent = (event: string) => {
  // @ts-ignore
  umami.track(event, { username: useAuthStore().user?.email || "Unknown" });
};