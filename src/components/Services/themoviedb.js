const API_KEY = 'c434611fec884383ff05cc84a945718c';
const BASE_URL = 'https://api.themoviedb.org/3/';

async function fetchWithErrorHandling(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}

export function fetchTrends() {
  return fetchWithErrorHandling(
    `${BASE_URL}trending/movie/day?api_key=${API_KEY}`,
  );
}
export function fetchTrendsById(trendsId) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${trendsId}?api_key=${API_KEY}&language=en-US&include_image_language=en%2C%20null`,
  );
}
export function fetchCast(trendsId) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${trendsId}/credits?api_key=${API_KEY}&language=en-US`,
  );
}
