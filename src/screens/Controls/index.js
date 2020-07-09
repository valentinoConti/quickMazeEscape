import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './Controls.css';

const Controls = ({setScreen}) => {
  const goMenu = () => { setScreen('menu') };

  return (
    <div id="controls">
      <p className="title">Controls:</p>
      <p>Arrow keys for moving</p>
      <p>"R" for restarting the game</p>
      <p className="title">Objetive:</p>
      <div id="objetive">
        <p>You should make the player</p>
        <img src={require('../../../assets/personaje.png')} />
        <p>get to the escape door</p>
        <img src={require('../../../assets/puerta.png')} />
        <p>as fast as posible and without getting out of movements!</p>
      </div>

      <button className="menuButton" onClick={goMenu}>Back to menu</button>
    </div>
  )
};

Controls.propTypes = {
  setScreen: PropTypes.func.isRequired
};

export default Controls;
