import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import App from '../src/App';
import Menu from '../src/screens/Menu'
import Play from '../src/screens/Play'

configure({adapter: new Adapter()});

describe('Main App tests', () => {
  let wrapper;

  it('should take/compare App snapshot', () => {
    wrapper = mount(
      <App />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should test the screen changing functionality', () => {
    wrapper = mount(
      <App />
    );
    expect(wrapper.find(Menu).exists()).toBeTruthy();
    expect(wrapper.find(Play).exists()).not.toBeTruthy();

    act(() => {
      wrapper.find(Menu).props().setScreen('play');
    });
    wrapper.update();

    expect(wrapper.find(Menu).exists()).not.toBeTruthy();
    expect(wrapper.find(Play).exists()).toBeTruthy();

  });

  it('should test nextLevel functionality', () => {
    const firstKey = wrapper.find(Play).key();

    act(() => {
      wrapper.find(Play).props().setLevelNumber(2);
    });
    wrapper.update();

    const secondKey = wrapper.find(Play).key();

    expect(firstKey).not.toContain(secondKey);
  })
});