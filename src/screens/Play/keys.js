/**
 * @name handledKeys
 * @description 
 * @param {*} prevState
 * @param {*} boardSize
 * @param {*} setMovesLeft
 * @param {*} locked
 */
export const handleKeys = (prevState, level, setMovesLeft, locked) => {
  const X = prevState[0];
  const Y = prevState[1];
  const boardSize = level.tiles.length;
  return {
    ArrowRight: () => {
      if (X < boardSize - 1 && level.tiles[Y][X+1] === 0 && (!locked || !(level.lock[0] === Y && level.lock[1] === X+1))) {
        setMovesLeft(prev => prev - 1);
        return [X+1, Y, {right: true, position: 'normal'}];
      }
      return prevState;
    },
    ArrowLeft: () => {
      if (X > 0 && level.tiles[Y][X-1] === 0 && (!locked || !(level.lock[0] === Y && level.lock[1] === X-1))) {
        setMovesLeft(prev => prev - 1);
        return [X-1, Y, {right: false, position: 'normal'}];
      }
      return prevState;
    },
    ArrowDown: () => {
      if (Y < boardSize - 1 && level.tiles[Y+1][X] === 0 && (!locked || !(level.lock[0] === Y+1 && level.lock[1] === X))) {
        setMovesLeft(prev => prev - 1);
        return [X, Y+1, ({right: prevState[2].right, position: 'down'})];
      }
      return prevState;
    },
    ArrowUp: () => {
      if (Y > 0 && level.tiles[Y-1][X] === 0 && (!locked || !(level.lock[0] === Y-1 && level.lock[1] === X))) {
        setMovesLeft(prev => prev - 1);
        return [X, Y-1, ({right: prevState[2].right, position: 'up'})];
      }
      return prevState;
    }
  }
};

export const allowedKeys = ['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'r', 'R'];