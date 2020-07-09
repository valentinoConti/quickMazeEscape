import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import Controls from '../../../src/screens/Controls';

configure({adapter: new Adapter()});

describe('Controls screen test', () => {
  it('take snapshot and test button back to menu', () => {
    const mockSetScreen = jest.fn();
    const wrapper = mount(
      <Controls
        setScreen={mockSetScreen}
      />
    );

    expect(wrapper.find('#controls').exists()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
    expect(mockSetScreen).not.toHaveBeenCalled();
    wrapper.find('.menuButton').simulate('click');
    expect(mockSetScreen).toHaveBeenCalledWith('menu');
  });
});