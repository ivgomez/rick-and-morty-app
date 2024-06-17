import {Filter} from 'models/Character';

/**
 * The function `buildUrlWithFilters` constructs a URL with filters by extracting existing parameters,
 * adding new filters, and handling pagination.
 * @param {string} nextUrl - The `nextUrl` parameter is a string representing the URL that you want to
 * build upon by adding or updating query parameters based on the provided filters.
 * @param {Filter} filters - The `filters` parameter in the `buildUrlWithFilters` function is an object
 * that contains key-value pairs representing the filters to be applied to the URL. The function
 * filters out any key-value pairs where the value is falsy (e.g., empty string, null, undefined)
 * before constructing the
 * @returns The function `buildUrlWithFilters` returns a URL with filters applied based on the input
 * parameters `nextUrl` and `filters`.
 */
export const buildUrlWithFilters = (nextUrl: string, filters: Filter) => {
  const baseUrl = nextUrl.split('?')[0];
  const existingParams = nextUrl.split('?')[1];
  const pageParam = existingParams
    ?.split('&')
    .find(param => param.startsWith('page='));

  const queryParams = Object.entries(filters)
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  let url = baseUrl;
  if (pageParam) {
    url += `?${pageParam}${queryParams ? '&' + queryParams : ''}`;
  } else if (queryParams) {
    url += `?${queryParams}`;
  } else if (existingParams) {
    url += `?${existingParams}`;
  }

  return url;
};
