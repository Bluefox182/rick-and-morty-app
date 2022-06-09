import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Characters from './components/Characters';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className='App'>
      <div className={darkMode ? 'dark-mode' : 'light-mode'}>
        <Header />
        <button
          className={darkMode ? 'button-light' : 'button-dark'}
          type='button'
          onClick={toggleDarkMode}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <Characters />
      </div>
    </div>
  );
}

export default App;
