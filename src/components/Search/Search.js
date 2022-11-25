import React from 'react';

import { useNavigate } from 'react-router-dom';

const Search = () => {
  const navigate = useNavigate();

  const debounce = (func, timeout = 300) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  };

  const onSearch = debounce((e) => {
    const value = e.target.value;
    const searchParams = new URLSearchParams();
    searchParams.append('query', value);
    navigate({
      pathname: '/',
      search: searchParams.toString(),
    });
  }, 1000);

  return (
    <div>
      <input
        type="text"
        placeholder="search for movies/tv shows"
        onKeyUp={onSearch}
      />
    </div>
  );
};

export default Search;
