import React from 'react';
import getLevel from '../../src/levels';
import levelData from '../../src/levels/levelData';

describe('getLevel test', () => {
  it('should test that getLevel returns the level data with the rendered map on it', () => {
    let proccesedLevel = getLevel(1);
    delete proccesedLevel.rendered
    expect(proccesedLevel).toEqual(levelData[1]);

    proccesedLevel = getLevel(1);
    expect(proccesedLevel).not.toEqual(levelData[1]);
    expect(proccesedLevel.rendered[0][0].props.className).toBe('tile grass');
    expect(proccesedLevel.rendered[1][0].props.className).toBe('tile wall');
  });
});