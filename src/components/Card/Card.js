import React from 'react';
import PropTypes from 'prop-types';

import styles from './Card.module.css';

const Card = ({ imgURL, title, subTitle, year }) => (
  <div>
    <div className={styles.imageContainer}>
      <img src={imgURL} width="200" height="300" alt="movie" />
    </div>
    <div>
      <h2 className={styles.cardTitle}>{title}</h2>
      <p className={styles.cardSubTitle}>
        {subTitle}
        {', '}
        <span className={styles.cardYear}>{year}</span>
      </p>
    </div>
  </div>
);

Card.propTypes = {
  imgURL: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
};

export default Card;
