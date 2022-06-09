import '../styles/Header.css';
import ThemeContext from '../context/ThemeContext';
import { useContext } from 'react';

const Header = () => {
  const color = useContext(ThemeContext);
  return (
    <>
      <h1 style={{ color }}>Rick And Morty App</h1>
    </>
  );
};

export default Header;
