import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import getLevel from '../../levels';
import {handleKeys, allowedKeys} from './keys';
import './Play.css';

const Play = ({setScreen, levelNumber, setLevelNumber}) => {
  const [whichLevel, setWhichLevel] = useState(1);
  const [playing, setPlaying] = useState(true);

  const proccesedLevel = useMemo(() => getLevel(levelNumber), [level, levelNumber]);
  const [level, setLevel] = useState(proccesedLevel);

  const [player, setPlayer] = useState(level.playerStart.concat({
    right: true,
    position: 'normal'
  }));

  const [locked, setLocked] = useState(true);
  const [timeLeft, setTimeLeft] = useState(level.time);
  const [movesLeft, setMovesLeft] = useState(level.movements);
  const gameDivRef = useRef();

  const boardSize = level.tiles.length;

  const getDoorPosition = useCallback(() => ({
    bottom: 58 + (750/boardSize) * Math.abs(level.escapeDoor[1]-(boardSize-1)),
    left: 10 + (750/boardSize) * level.escapeDoor[0],
    width: 13/15 * 750/boardSize,
    height: 13/15 * 750/boardSize
  }), [level]);

  const getUnlockPosition = useCallback(() => ({
    bottom: 58 + (750/boardSize) * Math.abs(level.unlock[0]-(boardSize-1)),
    left: 10 + (750/boardSize) * level.unlock[1],
    width: 2/3 * 750/boardSize,
    height: 2/3 * 750/boardSize
  }), [level]);

  const getLockPosition = useCallback(() => ({
    bottom: 58 + (750/boardSize) * Math.abs(level.lock[0]-(boardSize-1)),
    left: 10 + (750/boardSize) * level.lock[1],
    width: 750/boardSize,
    height: 750/boardSize
  }), [level]);

  const getPlayerPosition = useCallback(() => ({
    bottom: 75 + (750/boardSize) * Math.abs(player[1]-(boardSize-1)),
    left: 15 + (750/boardSize) * player[0],
    width: 11/15 * 750/boardSize,
    height: 11/15 * 750/boardSize,
    transform: `
      scaleX(${player[2].right ? '1' : '-1'})
      rotate(${
        player[2].position === 'normal'
          ? '0deg'
          : player[2].position === 'up'
            ? '-90deg'
            : '90deg'
      })
    `
  }), [player]);

  const handleKeydown = (ev) => {
    ev.persist();
    if (playing && allowedKeys.includes(ev.key)) {
      setPlayer(prevState => {
        return handleKeys(prevState, level, setMovesLeft, locked)[ev.key]()
      });
    }
  };

  // Timer counter and lost
  useEffect(() => {
    if (playing && timeLeft) {
      var timing = setTimeout(() => {
        setTimeLeft(state => state - 1);
      }, 1000);
    }
    else {
      setPlaying(false);
    }
    return () => clearTimeout(timing);
  }, [timeLeft]);

  // Movements left lost
  useEffect(() => {
    if (!movesLeft) {
      setPlaying(false);
    }
  }, [movesLeft]);

  // Hit-Test
  useEffect(() => {
    // WIN
    if (player[0] === level.escapeDoor[0] && player[1] === level.escapeDoor[1]) {
      setLevelNumber(levelNumber + 1);
    }
    // bomba unlock
    else if (player[0] === level.unlock[1] && player[1] === level.unlock[0]) {
      setLocked(false);
    }
  }, [player]);

  useEffect(() => { gameDivRef.current?.focus() }, []);
  const goMenu = () => {
    setScreen('menu')
    setLevelNumber(1);
  }

  return (
    <div id="game" tabIndex="0" onKeyDown={handleKeydown} ref={gameDivRef}>
      {!playing && (
        <div className="lost">
          <b>You lose</b>
          <button className="menuButton" onClick={goMenu}>Main Menu</button>
        </div>
      )}

      {level.rendered}

      <div
        className="player"
        style={getPlayerPosition()}
      />

      <div
        className="exitDoor"
        style={getDoorPosition()}
      />

      {!!level.unlock.length && (
        <div
          key={`unlock-${levelNumber}`}
          className="unlock"
          style={getUnlockPosition()}
        />
      )}

      {!!(level.lock.length && locked) && (
        <div
          key={`lock-${levelNumber}`}
          className="lock"
          style={getLockPosition()}
        />
      )}

      <div className="gameFooter">
        <h3 className="info alignLeft">Time left: {timeLeft}</h3>
        <h3 className="info alignRight">Moves left: {movesLeft}</h3>
      </div>
    </div>
  );
};

Play.propTypes = {
  setScreen: PropTypes.func.isRequired,
  levelNumber: PropTypes.number.isRequired,
  setLevelNumber: PropTypes.func.isRequired
}

export default React.memo(Play);
