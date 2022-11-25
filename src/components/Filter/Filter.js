import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import styles from './Filter.module.css';

const Filter = ({ genres }) => {
  const navigate = useNavigate();

  const [selectedFilter, setSelectedFilter] = useState({
    genre: '',
    fromYear: '',
    toYear: '',
    rating: '',
  });

  useEffect(() => {
    if (Object.values(selectedFilter).every((v) => v === '')) {
      return;
    }
    const searchParams = new URLSearchParams();
    Object.keys(selectedFilter).forEach((key) => {
      searchParams.append(key, selectedFilter[key]);
    });
    navigate({
      pathname: '/',
      search: searchParams.toString(),
    });
  }, [selectedFilter]);

  const handleChange = (e, type) => {
    setSelectedFilter({ ...selectedFilter, [type]: e.target.value });
  };
  return (
    <section className={styles.filter}>
      <h2 className={styles.filterHeading}>DISCOVER OPTIONS</h2>
      <div className={styles.item}>
        <label htmlFor="type">Type</label>
        <select>
          <option value="movie">Movies</option>
        </select>
      </div>
      <div onChange={(e) => handleChange(e, 'genre')} className={styles.item}>
        <label htmlFor="genre">Genre</label>
        <select>
          <option value="">Select</option>
          {genres.map((item) => (
            <option value={item.id}>{item.name}</option>
          ))}
        </select>
      </div>
      <div className={styles.item}>
        <label htmlFor="year">Year</label>
        <select onChange={(e) => handleChange(e, 'fromYear')}>
          <option value="">From</option>
          {[
            2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2008, 2009,
            2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020,
            2021, 2022,
          ].map((year) => (
            <option value={year}>{year}</option>
          ))}
        </select>
        <select onChange={(e) => handleChange(e, 'toYear')}>
          <option value="">To</option>
          {[
            2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2008, 2009,
            2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020,
            2021, 2022,
          ].map((year) => (
            <option value={year}>{year}</option>
          ))}
        </select>
      </div>
      <div className={styles.item}>
        <label htmlFor="rating">Rating</label>
        <select id="rating" onChange={(e) => handleChange(e, 'rating')}>
          <option value="">Select</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
    </section>
  );
};

Filter.propTypes = {
  genres: PropTypes.array.isRequired,
  onApplyFilter: PropTypes.func.isRequired,
};

export default Filter;
