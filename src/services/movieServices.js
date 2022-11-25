import axios from 'axios';

import config from '../config.json';

axios.defaults.baseURL = config.API_BASE_URL;
axios.defaults.params = {};
axios.defaults.params['api_key'] = config.API_KEY;

const getMovies = ({ queryKey }) => {
  const { type, queryParams } = queryKey[1];
  if (Object.keys(queryParams).length != 0) {
    let searchString = '?';
    Object.keys(queryParams).forEach((key) => {
      if (key === 'genre') {
        searchString += '&with_genres=' + queryParams[key];
      }
      if (key === 'rating') {
        searchString += '&vote_average.lte=' + queryParams[key];
      }
      if (key === 'fromYear') {
        const year = queryParams.fromYear || '2000'; // taken a sample year
        searchString += '&release_date.gte=' + year + '-01-01';
      }
      if (key === 'toYear') {
        const year = queryParams.toYear || '2022'; // taken a sample year
        searchString += '&release_date.lte=' + year + '-12-31';
      }
    });
    if (queryParams && queryParams.query) {
      return axios(`/search/movie/?query=${queryParams.query}`);
    } else {
      return axios(`/discover/movie/${searchString}`);
    }
  }
  if (type === 'trend') {
    return axios(`/trending/movie/day`);
  } else if (type === 'newest') {
    const currentDate = new Date().toISOString().slice(0, 10);
    return axios(
      `/discover/movie/?sort_by=release_date.desc&release_date.lte=${currentDate}`
    );
  } else if (type === 'top-rated') {
    return axios(`/discover/movie/?sort_by=vote_average.desc`);
  }
  return axios(`/discover/movie`);
};

const getMovieGenre = () => {
  return axios('genre/movie/list');
};

export { getMovies, getMovieGenre };
