import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Play from '../../../src/screens/Play';

configure({adapter: new Adapter()});
jest.useFakeTimers();

describe('Playing tests', () => {
  let wrapper;
  const mockSetScreen = jest.fn();
  const mockLevelNumber = 1;
  const mockSetLevelNumber = jest.fn();
  it('should launch the game', () => {
    wrapper = mount(
      <Play setScreen={mockSetScreen} levelNumber={mockLevelNumber} setLevelNumber={mockSetLevelNumber} />
    );

    expect(wrapper.find('#game')).toBeTruthy();
  });

  it('should test the timer making you lose and the go back to menu button', () => {
    expect(wrapper.find('.lost').exists()).not.toBeTruthy();
    act(() => {
      jest.runAllTimers();
    });
    wrapper.update();
    expect(wrapper.find('.lost').exists()).toBeTruthy();
    wrapper.find('.menuButton').simulate('click');
    expect(mockSetScreen).toHaveBeenCalledWith('menu');
    expect(mockSetLevelNumber).toHaveBeenCalledWith(1);
  });

  it('should walktrought the first level and win', () => {
    wrapper = mount(
      <Play setScreen={mockSetScreen} levelNumber={mockLevelNumber} setLevelNumber={mockSetLevelNumber} />
    );

    expect(wrapper.find('.player').props().style.left).toBe(15);
    // Go right twice
    act(() => {
      wrapper.find('#game').simulate('keydown', {key: 'ArrowRight'});
      wrapper.find('#game').simulate('keydown', {key: 'ArrowRight'});
    });
    wrapper.update();

    expect(wrapper.find('.player').props().style.left).toBe(15+150*2);

    expect(wrapper.find('.player').props().style.bottom).toBe(675);
    // Go bottom 3 times
    act(() => {
      wrapper.find('#game').simulate('keydown', {key: 'ArrowDown'});
      wrapper.find('#game').simulate('keydown', {key: 'ArrowDown'});
      wrapper.find('#game').simulate('keydown', {key: 'ArrowDown'});
    });
    wrapper.update();
    expect(wrapper.find('.player').props().style.bottom).toBe(675-(150*3));

    // Go left and right
    expect(wrapper.find('.player').props().style.left).toBe(15+150*2);
    act(() => {
      wrapper.find('#game').simulate('keydown', {key: 'ArrowLeft'});
    });
    wrapper.update();
    expect(wrapper.find('.player').props().style.left).toBe(15+150*1);
    act(() => {
      wrapper.find('#game').simulate('keydown', {key: 'ArrowRight'});
    });
    wrapper.update();
    expect(wrapper.find('.player').props().style.left).toBe(15+150*2);

    // Finally, go bottom once and right twice to win the level
    expect(mockSetLevelNumber).toHaveBeenCalledTimes(1);
    act(() => {
      wrapper.find('#game').simulate('keydown', {key: 'ArrowDown'});
      wrapper.find('#game').simulate('keydown', {key: 'ArrowRight'});
      wrapper.find('#game').simulate('keydown', {key: 'ArrowRight'});
    });
    wrapper.update();
    expect(wrapper.find('.player').props().style.left).toBe(15+150*4)
    expect(wrapper.find('.player').props().style.bottom).toBe(675-(150*4))
    expect(mockSetLevelNumber).toHaveBeenCalledTimes(2)
    expect(mockSetLevelNumber).toHaveBeenCalledWith(2);
  });

  it('should test the player not moving against a wall and losing with no moves left', () => {
    wrapper = mount(
      <Play setScreen={mockSetScreen} levelNumber={mockLevelNumber} setLevelNumber={mockSetLevelNumber} />
    );

    // Try to go down and shouldnt be able
    expect(wrapper.find('.player').props().style.bottom).toBe(675);
    act(() => {
      wrapper.find('#game').simulate('keydown', {key: 'ArrowDown'});
    });
    wrapper.update();
    expect(wrapper.find('.player').props().style.bottom).toBe(675);

    // Right twice and then i should be able to go down
    act(() => {
      wrapper.find('#game').simulate('keydown', {key: 'ArrowRight'});
      wrapper.find('#game').simulate('keydown', {key: 'ArrowRight'});
      wrapper.find('#game').simulate('keydown', {key: 'ArrowDown'});
    });
    wrapper.update();
    expect(wrapper.find('.player').props().style.bottom).toBe(675-150);

    // Moving around till losing all the moves left
    expect(wrapper.find('.lost').exists()).not.toBeTruthy();
    act(() => {
      wrapper.find('#game').simulate('keydown', {key: 'ArrowUp'});
      wrapper.find('#game').simulate('keydown', {key: 'ArrowUp'});
      wrapper.find('#game').simulate('keydown', {key: 'ArrowRight'});
      wrapper.find('#game').simulate('keydown', {key: 'ArrowRight'});
      wrapper.find('#game').simulate('keydown', {key: 'ArrowRight'});
      wrapper.find('#game').simulate('keydown', {key: 'ArrowLeft'});
      wrapper.find('#game').simulate('keydown', {key: 'ArrowLeft'});
      wrapper.find('#game').simulate('keydown', {key: 'ArrowLeft'});
      wrapper.find('#game').simulate('keydown', {key: 'ArrowLeft'});
      wrapper.find('#game').simulate('keydown', {key: 'ArrowLeft'});
      wrapper.find('#game').simulate('keydown', {key: 'ArrowRight'});
      wrapper.find('#game').simulate('keydown', {key: 'ArrowRight'});
    });
    wrapper.update();
    expect(wrapper.find('.lost').exists()).toBeTruthy();

  })
});