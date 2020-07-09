import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './Win.css';

const Win = ({setScreen, score, setScore}) => {
  const goMenu = () => {
    setScore(0);
    setScreen('menu');
  }

  const highScore = JSON.parse(localStorage.getItem('maze-game-highscore'));
  if (!highScore || highScore < score) {
    localStorage.setItem('maze-game-highscore', score);
  }

  return (
    <div id="win">
      <p>You win!</p>
      <p>Your score: <b id="actualScore">{score}</b></p>
      <p>Highest score: <b id="highestScore">{highScore < score ? score : highScore}</b></p>
      <button className="menuButton" onClick={goMenu}>
        Back to menu
      </button>
    </div>
  )
};

Win.propTypes = {
  setScreen: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired
};

export default Win;
