import React from 'react';
import '../styles/Search.css';
import searchIcon from '../assets/img/search-icon.svg';

function Search({ search, searchRef, handleSearch }) {
  return (
    <div className='Search'>
      <div class='icon'>
        <img src={searchIcon} alt='search' />
      </div>
      <input
        className='Search__input '
        type='text'
        value={search}
        ref={searchRef}
        onChange={handleSearch}
        placeholder='Search your favorites characters...'
      />
    </div>
  );
}

export default Search;
