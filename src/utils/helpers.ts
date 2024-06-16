export const buildUrlWithFilters = (
  nextUrl: string,
  filters: Record<string, string>,
) => {
  const baseUrl = nextUrl.split('?')[0];
  const pageParam = nextUrl
    .split('?')[1]
    ?.split('&')
    .find(param => param.startsWith('page='));
  const queryParams = Object.entries(filters)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return `${baseUrl}?${pageParam}&${queryParams}`;
};
