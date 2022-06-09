import React, {
  useState,
  // useEffect,
  useReducer,
  useMemo,
  useRef,
  useCallback,
} from 'react';
import Search from './Search';
import useCharacters from '../hooks/useCharacters';
import '../styles/Characters.css';
import Star from '../assets/img/star.svg';
import Erase from '../assets/img/delete.svg';

const initialState = {
  favorites: [],
};

// Let's use useRef to keep track of the favorite characters

const favoriteReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter(
          (character) => character.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

const Characters = () => {
  // const [characters, setCharacters] = useState([]);
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
  const [search, setSearch] = useState('');
  const searchRef = useRef(search);
  // const searchInput = useRef(null);

  // We are going to create a new CustomHook for useEffect
  // useEffect(() => {
  //   fetch('https://rickandmortyapi.com/api/character/')
  //     .then((response) => response.json())
  //     .then((data) => setCharacters(data.results))
  //     .catch((error) => console.log(error));
  // }, []);

  const characters = useCharacters(
    'https://rickandmortyapi.com/api/character/'
  );

  const handleFavorite = (character) => {
    dispatch({ type: 'ADD_FAVORITE', payload: character });
  };

  const handleUnfavorite = (character) => {
    dispatch({ type: 'REMOVE_FAVORITE', payload: character.id });
  };

  // We are going to use useCallback to memoize the function
  // const handleSearch = () => {
  //   setSearch(searchRef.current.value);
  // };

  const handleSearch = useCallback(() => {
    setSearch(searchRef.current.value);
  }, []);

  // useMemo is used to avoid unnecessary re-renders
  const filteredCharacters = useMemo(() => {
    return characters.filter((character) =>
      character.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [characters, search]);
  // Next step is to replace filteredCharacters into characters map

  return (
    <div className='Characters'>
      <Search
        className='Characters__search'
        search={search}
        searchRef={searchRef}
        handleSearch={handleSearch}
      />

      <div className='Favorites-Container'>
        {favorites.favorites.map((character) => (
          <img
            className='Favorite-Img'
            src={character.image}
            alt={character.name}
          />
        ))}
      </div>
      <div className='Container'>
        {filteredCharacters.map((character) => {
          return (
            <div className='Characters-Container' key={character.id}>
              <img src={character.image} alt={character.name} />
              <h2>{character.name}</h2>
              <ul>
                <li>{character.status}</li>
                <li>{character.species}</li>
                <li>{character.gender}</li>
                <li>{character.origin.name}</li>
              </ul>
              <button>Read More</button>
              <div className='Icons-Container'>
                <img
                  className='Star-icon'
                  src={Star}
                  alt='Star'
                  onClick={() => handleFavorite(character)}
                />
                <img
                  className='Erase-icon'
                  src={Erase}
                  alt='Delete'
                  onClick={() => handleUnfavorite(character)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Characters;
