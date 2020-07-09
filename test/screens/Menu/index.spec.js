import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import Menu from '../../../src/screens/Menu';

configure({adapter: new Adapter()});

describe('Menu screen test', () => {
  // FullScreen functionality mocks
  document.requestFullscreen = jest.fn();
  document.documentElement.requestFullscreen = jest.fn();
  window.innerHeight = 700;
  window.innerWidth = 700;
  var scale = 400;
  document.querySelector = jest.fn(() => ({
    getBoundingClientRect: () => { scale += 100; return({width: scale, height: scale}) },
    style: { transform: ()=>{} }
  }))

  const mockSetScreen = jest.fn();
  let wrapper;

  it('should take/compare snapshot', () => {
    wrapper = mount(
      <Menu setScreen={mockSetScreen} />
    );
    expect(wrapper.find('#menuScreen')).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });

  it('should test the playPressed, controlsPressed & toggleFullscreen functions', () => {
    expect(mockSetScreen).not.toHaveBeenCalled();
    wrapper.find('button#playButton').simulate('click');
    expect(mockSetScreen).toHaveBeenCalledWith('play');

    wrapper.find('button#instructionsButton').simulate('click');
    expect(mockSetScreen).toHaveBeenCalledWith('controls');

    wrapper.find('button#fullscreenButton').simulate('click');
    expect(document.documentElement.requestFullscreen).toHaveBeenCalled();
  });
});