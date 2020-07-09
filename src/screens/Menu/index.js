import React from 'react';
import PropTypes from 'prop-types';
import './Menu.css';

const Menu = ({setScreen}) => {
  const playPressed = () => setScreen('play');
  
  return (
    <div id="menuScreen">
      <h1 className="menuTitle">Maze Escape</h1>
      <button className="menuButton" onClick={playPressed}>Play</button>

      <footer>
        Valentino Conti
      </footer>
    </div>
  );
};

Menu.propTypes = {
  setScreen: PropTypes.func.isRequired
};

export default Menu;
