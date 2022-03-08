import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import getLevel from '../../levels';
import { handleKeys, allowedKeys } from './keys';
import './Play.css';

/**
 * @name Play
 * @description This is the game screen. Here is where all the game logic happens
 *
 * @param {Integer} levelNumber
 * @param {Integer} score
 * @param {Function} setLevelNumber
 * @param {Function} setScore
 * @param {Function} setScreen
 */
const Play = ({
  levelNumber,
  score,
  setLevelNumber,
  setScore,
  setScreen
}) => {
  const [playing, setPlaying] = useState(true);

  const proccesedLevel = useMemo(() => getLevel(levelNumber), [levelNumber]);
  const [level] = useState(proccesedLevel);

  const [player, setPlayer] = useState(level.playerStart.concat({
    right: true,
    position: 'normal'
  }));

  const [locked, setLocked] = useState(true);
  const [timeLeft, setTimeLeft] = useState(level.time);
  const [movesLeft, setMovesLeft] = useState(level.movements);
  const gameDivRef = useRef();

  const boardSize = level.tiles.length;

  const getMapPosition = useCallback((bottomValue, leftValue, sizeMultiplier) => ({
    bottom: 58 + (750 / boardSize) * Math.abs(bottomValue - (boardSize - 1)),
    left: 10 + (750 / boardSize) * leftValue,
    width: sizeMultiplier * 750 / boardSize,
    height: sizeMultiplier * 750 / boardSize
  }), [level]);

  const getPlayerPosition = useCallback(() => ({
    bottom: 75 + (750 / boardSize) * Math.abs(player[1] - (boardSize - 1)),
    left: 15 + (750 / boardSize) * player[0],
    width: 11 / 15 * 750 / boardSize,
    height: 11 / 15 * 750 / boardSize,
    transform: `
      scaleX(${player[2].right ? '1' : '-1'})
      rotate(${player[2].position === 'normal'
        ? '0deg'
        : player[2].position === 'up'
          ? '-90deg'
          : '90deg'
      })
    `
  }), [player]);

  const handleKeydown = (ev) => {
    ev.persist();
    ev.preventDefault();
    if (playing && allowedKeys.includes(ev.key)) {
      if (ev.key.toLowerCase() !== 'r') {
        setPlayer(prevState => {
          return handleKeys(prevState, level, setMovesLeft, locked)[ev.key]()
        });
      }
      else {
        lost();
      }
    }
  };

  const lost = () => {
    setPlaying(false);
  }

  // Timer counter and lost
  useEffect(() => {
    if (playing && timeLeft) {
      var timing = setTimeout(() => {
        setTimeLeft(state => state - 1);
      }, 1000);
    }
    else {
      lost()
    }
    return () => clearTimeout(timing);
  }, [timeLeft]);

  // Movements left lost
  useEffect(() => {
    if (!movesLeft) {
      lost()
    }
  }, [movesLeft]);

  // Hit-Test
  useEffect(() => {
    // WIN
    if (player[0] === level.escapeDoor[0] && player[1] === level.escapeDoor[1]) {
      setScore(score + (timeLeft * 3 + movesLeft * 4));
      if (levelNumber < document.totalLevels) {
        setLevelNumber(levelNumber + 1);
      } else {
        setLevelNumber(1);
        setScreen('win');
      }
    }
    // bomb unlock
    else if (player[0] === level.unlock[1] && player[1] === level.unlock[0]) {
      setLocked(false);
    }
  }, [player]);

  useEffect(() => { gameDivRef.current?.focus() }, []);
  const goMenu = () => {
    setScreen('menu')
    setScore(0);
    setLevelNumber(1);
  }

  const restart = () => {
    setScreen('play')
    setScore(0);
    setLevelNumber(1);
  }

  return (
    <div id="game" tabIndex="0" onKeyDown={handleKeydown} ref={gameDivRef}>
      {!playing && (
        <div className="lost">
          <b>You lose</b>
          <button className="menuButton restart" onClick={restart}>Restart</button>
          <button className="menuButton menu" onClick={goMenu}>Main Menu</button>
        </div>
      )}

      {level.rendered}

      <div
        className="player"
        style={getPlayerPosition()}
      />

      <div
        className="exitDoor"
        style={getMapPosition(level.escapeDoor[1], level.escapeDoor[0], 13 / 15)}
      />

      {!!level.unlock.length && (
        <div
          key={`unlock-${levelNumber}`}
          className="unlock"
          style={getMapPosition(level.unlock[0], level.unlock[1], 2 / 3)}
        />
      )}

      {!!(level.lock.length && locked) && (
        <div
          key={`lock-${levelNumber}`}
          className="lock"
          style={getMapPosition(level.lock[0], level.lock[1], 1)}
        />
      )}

      <div className="gameFooter">
        <h3 className="info alignLeft">Time left: {timeLeft}</h3>
        <h3 className="info alignMiddle">Score: {score}</h3>
        <h3 className="info alignRight">Moves left: {movesLeft}</h3>
      </div>
    </div>
  );
};

Play.propTypes = {
  levelNumber: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  setLevelNumber: PropTypes.func.isRequired,
  setScore: PropTypes.func.isRequired,
  setScreen: PropTypes.func.isRequired
}

export default React.memo(Play);
