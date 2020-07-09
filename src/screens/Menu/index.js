import React from 'react';
import PropTypes from 'prop-types';
import './Menu.css';

/**
 * @name Menu
 * @description Menu screen. Here we have our different screens links (Play, Instructions and Fullscreen toggle)
 * @param {Function} setScreen 
 */
const Menu = ({setScreen}) => {
  const playPressed = () => setScreen('play');
  const controlsPressed = () => setScreen('controls');
  const toggleFullscreen = () => {
    const doc = document.documentElement;
    if (doc.requestFullscreen) {
      doc.requestFullscreen();

      let scale = 0.9;
      while (
        document.querySelector('#root').getBoundingClientRect().height+75 < window.innerHeight &&
        document.querySelector('#root').getBoundingClientRect().width < window.innerWidth
      ) {
        scale += 0.025;
        document.querySelector('#root').style.transform = `scale(${scale})`;
      }
    }
  };
  
  return (
    <div id="menuScreen">
      <h1 className="menuTitle">Quick-Maze Escape</h1>

      <button
        id="playButton"
        className="menuButton"
        onClick={playPressed}>
        Play
      </button>

      <button
        id="instructionsButton"
        className="menuButton marginTop"
        onClick={controlsPressed}>
        Instructions
      </button>

      <button
        id="fullscreenButton"
        className="menuButton marginTop"
        onClick={toggleFullscreen}>
        Fullscreen
      </button>

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
