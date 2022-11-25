import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import Search from '../Search';

import styles from './Header.module.css';

import config from '../../config.json';

const Header = () => {
  const { type } = useParams();
  let tempType = type;
  if (!type || type === '/') {
    tempType = config.navLinks[0].path;
  }
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.logo}>{'Discover'}</h1>
        <nav className={styles.navLinks}>
          <ul className={styles.links}>
            {config.navLinks.map((item) => (
              <li>
                <Link
                  to={`/${item.path}`}
                  className={`${tempType === item.path ? styles.active : ''}`}
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Search />
      </header>
    </>
  );
};

export default Header;
