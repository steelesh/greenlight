import { error } from "@sveltejs/kit";

/**
 * Helper function to format and throw API errors
 * @param status HTTP status code
 * @param apiError Error object from the API
 * @param apiError.error Error message or validation errors object
 */
export function throwApiError(status: number, apiError: { error: string | Record<string, string> }): never {
  throw error(
    status,
    typeof apiError.error === "string" ? apiError.error : JSON.stringify(apiError.error),
  );
}
