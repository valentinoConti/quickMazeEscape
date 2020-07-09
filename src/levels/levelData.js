/**
 * Information for every level.
 * The tiles map should contain the same height and width, and the amount of tiles per row/column should
 * be a number divisible by 750. (Ex. 5, 6, 10).
 * 
 * Every 0 on the 'tiles' map represents a walkable zone and every 1 represents a wall blocking us.
 * 
 * 'unlock' key contains an array with the position for the unlocker bomb inside our map.
 * 'lock' key contains the locked wall that the bomb unlocks.
 * 'playerStart' and 'escapeDoor' keys contain the position where the player will start and the position for the escape door.
 * 'movements' and 'time' keys are exactly that, the time and movements available for that level.
 * 
 */
export default {
  1: {
    tiles: [
      [0, 0, 0, 0, 0],
      [1, 1, 0, 1, 1],
      [1, 1, 0, 1, 1],
      [0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0],
    ],
    unlock: [],
    lock: [],
    playerStart: [0, 0],
    escapeDoor: [4, 4],
    movements: 12,
    time: 10
  },

  2: {
    tiles: [
      [0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 1, 0, 1, 1],
      [0, 0, 0, 0, 1],
    ],
    unlock: [],
    lock: [],
    playerStart: [0, 0],
    escapeDoor: [3, 4],
    movements: 9,
    time: 10
  },

  3: {
    tiles: [
      [1, 0, 0, 0, 0],
      [0, 1, 1, 1, 0],
      [0, 1, 0, 0, 0],
      [0, 0, 0, 1, 1],
      [0, 1, 0, 0, 0],
    ],
    unlock: [3, 0],
    lock: [4, 2],
    playerStart: [1, 0],
    escapeDoor: [4, 4],
    movements: 18,
    time: 10
  },

  4: {
    tiles: [
      [0, 0, 0, 1, 0],
      [0, 1, 0, 1, 0],
      [0, 0, 1, 0, 0],
      [1, 0, 1, 0, 0],
      [1, 0, 0, 0, 1],
    ],
    unlock: [0, 4],
    lock: [0, 2],
    playerStart: [1, 0],
    escapeDoor: [2,1],
    movements: 30,
    time: 10
  },

  5: {
    tiles: [
      [0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 1],
      [0, 0, 1, 0, 1, 0],
      [0, 1, 1, 0, 0, 0],
      [0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 1],
    ],
    unlock: [4, 0],
    lock: [3, 5],
    playerStart: [5, 0],
    escapeDoor: [5,2],
    movements: 19,
    time: 9
  },

  6: {
    tiles: [
      [0, 0, 1, 0, 0, 0],
      [1, 0, 0, 1, 1, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 1],
      [0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    unlock: [5, 5],
    lock: [3, 0],
    playerStart: [0, 0],
    escapeDoor: [0, 2],
    movements: 18,
    time: 9
  },

  7: {
    tiles: [
      [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
      [1, 0, 0, 1, 0, 0, 0, 1, 0, 0],
      [0, 1, 0, 0, 0, 1, 0, 1, 0, 0],
      [0, 1, 0, 1, 1, 1, 0, 1, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
      [0, 1, 0, 1, 1, 1, 0, 1, 0, 0],
      [0, 1, 0, 0, 0, 1, 0, 1, 1, 0],
      [1, 0, 0, 1, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    unlock: [3, 0],
    lock: [8, 2],
    playerStart: [4, 4],
    escapeDoor: [9, 2],
    movements: 35,
    time: 9
  },
}
