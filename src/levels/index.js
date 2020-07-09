import React from 'react';
import levelData from './levelData';
import './tiles.css';

const tileClass = {
  0: 'tile grass',
  1: 'tile wall'
}

document.totalLevels = Object.keys(levelData).length;

/**
 * @name getLevel
 * @param {Integer} which (which level we want to get)
 * 
 * @returns the level information object with a 'rendered' key containing our map already proccesed into React components.
 */
const getLevel = (which) => {
  const level = levelData[which];
  const boardSize = level.tiles.length;
  const buildedMap = level.tiles.map((tileRow, y) => (
    tileRow.map((tile, x) => {
      const compClass = tileClass[tile];
      return (
        <div
          className={compClass}
          key={`tile-${x}-${y}`}
          style={{
            width: 750/boardSize,
            height: 750/boardSize
          }}
        />
      );
    })
  ));
  return {
    ...level,
    rendered: buildedMap
  }
}

export default getLevel;
