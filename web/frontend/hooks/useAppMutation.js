import { useAuthenticatedFetch } from "./useAuthenticatedFetch";
import { useMutation } from "react-query";

/**
 * A hook for querying your custom app data.
 * @desc A thin wrapper around useAuthenticatedFetch and react-query's useMutation.
 *
 * @param {Object} options - The options for your query. Accepts 3 keys:
 *
 * 1. url: The URL to query. E.g: /api/widgets/1`
 * 2. fetchInit: The init options for fetch.  See: https://developer.mozilla.org/en-US/docs/Web/API/fetch#parameters
 * 3. reactQueryOptions: The options for `useMutation`. See: https://react-query.tanstack.com/reference/useMutation
 *
 * @returns Return value of useMutation.  See: https://react-query.tanstack.com/reference/useMutation.
 */
export const useAppMutation = ({ fetchInit = {} }) => {
  const authenticatedFetch = useAuthenticatedFetch();

  return useMutation(async (url, body) => {
    console.log({ ...fetchInit, body });
    const response = await authenticatedFetch(url, { ...fetchInit, body });

    return response.json();
  });
};
