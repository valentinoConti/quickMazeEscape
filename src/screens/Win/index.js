import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './Win.css';

/**
 * @name Win
 * @description "YOU WIN" screen. Shows the highest score registered and the actual score done by the user.
 * @param {Function} setScreen 
 * @param {Integer} score 
 * @param {Function} setScore 
 */
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
  score: PropTypes.number.isRequired,
  setScore: PropTypes.func.isRequired,
  setScreen: PropTypes.func.isRequired
};

export default Win;
