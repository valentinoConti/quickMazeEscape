import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import Win from '../../../src/screens/Win';

configure({adapter: new Adapter()});

describe('Menu screen test', () => {
  jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem');
  const mockSetScreen = jest.fn();
  const mockSetScore = jest.fn();
  const mockScore = 20;

  it('should take/compare snapshot', () => {
    const wrapper = mount(
      <Win
        score={mockScore}
        setScore={mockSetScore}
        setScreen={mockSetScreen}
      />
    );

    expect(wrapper).toMatchSnapshot();
  })

  it('should test back to Menu button with new better score', () => {
    const wrapper = mount(
      <Win
        score={mockScore}
        setScore={mockSetScore}
        setScreen={mockSetScreen}
      />
    );

    expect(localStorage.getItem).toHaveBeenCalled();
    expect(wrapper.find('#win')).toBeTruthy();
    expect(mockSetScreen).not.toHaveBeenCalled();
    expect(wrapper.find('#actualScore').text()).toBe('20');
    expect(wrapper.find('#highestScore').text()).toBe('20');
    wrapper.find('button').simulate('click');
    expect(mockSetScreen).toHaveBeenCalled();
    expect(mockSetScore).toHaveBeenCalled();

    wrapper.unmount();
  });

  it('should test previous higher score', () => {
    Object.getPrototypeOf(window.localStorage).getItem = jest.fn(() => 45);

    const wrapper = mount(
      <Win
        score={mockScore}
        setScore={mockSetScore}
        setScreen={mockSetScreen}
      />
    );

    expect(localStorage.getItem).toHaveBeenCalled();
    expect(wrapper.find('#win')).toBeTruthy();
    expect(wrapper.find('#actualScore').text()).toBe('20');
    expect(wrapper.find('#highestScore').text()).toBe('45');
    expect(mockSetScore).toHaveBeenCalled();
  });
});