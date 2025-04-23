import { getHealthcheck } from "$lib/api/client";
import { throwApiError } from "$lib/errors";

import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
  const { data, error, response } = await getHealthcheck();

  if (error) {
    throwApiError(response.status, error);
  }

  return data;
};
