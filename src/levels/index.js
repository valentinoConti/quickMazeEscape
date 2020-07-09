import React from 'react';
import levelData from './levelData';
import './tiles.css';

const tileClass = {
  0: 'tile grass',
  1: 'tile wall'
}

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
  console.log('buildedMap', buildedMap);
  return {
    ...level,
    rendered: buildedMap
  }
}

export default getLevel;
