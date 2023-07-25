import { HttpMethod } from "types";

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
  return await $fetch<T>(`/api${endPoint}`, {
    method,
    headers: [["authorization", useAuthStore().token]],
    body,
  });
}
