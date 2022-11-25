import React from 'react';

import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import Card from '../../components/Card';
import Filter from '../../components/Filter';

import { getMovies, getMovieGenre } from '../../services/movieServices';

import styles from './MovieView.module.css';

import config from '../../config.json';

const MoviewView = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { type } = useParams();
  const queryParams = {};
  for (const entry of searchParams.entries()) {
    const [param, value] = entry;
    if (value) {
      queryParams[param] = value;
    }
  }

  const {
    isLoading,
    error,
    data: moviesData,
    isStale,
  } = useQuery(
    [
      'movies',
      {
        type,
        queryParams,
      },
    ],
    getMovies,
    {
      staleTime: Infinity, // stale the data for 1hr to avoid API call
      cacheTime: 60 * 60 * 1000, // cache the data for 1hr
    }
  );
    console.log("##########", isStale)
  const {
    isLoading: isGenreLoading,
    error: genreError,
    data: genreData,
  } = useQuery(['genre'], getMovieGenre, {
    staleTime: Infinity, // stale the data for 1hr to avoid API call
    cacheTime: 60 * 60 * 1000, // cache the data for 1hr
  });

  const getGenre = (id) => {
    if (!id) {
      return [{ name: '-' }];
    }
    return genreData?.data?.genres.filter((item) => item.id === id);
  };

  const getYear = (date) => {
    const dt = new Date(date);
    return dt.getFullYear();
  };

  return (
    <div className={styles.wrapper}>
      <main
        className={`${styles.movieContainer} ${
          moviesData?.data?.results.length === 0 || isGenreLoading || isLoading
            ? styles.center
            : ''
        }`}
      >
        {isGenreLoading || isLoading ? (
          <div className={styles.loader}>Loading...</div>
        ) : (
          moviesData?.data?.results?.map((item) => (
            <Card
              imgURL={`${config.IMAGE_BASE_URL}${item.poster_path}`}
              title={item.title}
              subTitle={getGenre(item.genre_ids[0])[0].name}
              year={getYear(item.release_date)}
            />
          ))
        )}
        {moviesData?.data?.results.length === 0 && <p>No data found</p>}
      </main>
      <div className={styles.filterWrapper}>
        <Filter genres={genreData?.data?.genres || []} />
      </div>
    </div>
  );
};

export default MoviewView;
