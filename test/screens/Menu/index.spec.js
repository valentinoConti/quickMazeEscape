import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import Menu from '../../../src/screens/Menu';

configure({adapter: new Adapter()});

describe('Menu screen test', () => {
  it('should test the playPressed function', () => {
    const mockSetScreen = jest.fn();

    const wrapper = mount(
      <Menu setScreen={mockSetScreen} />
    );

    expect(wrapper.find('#menuScreen')).toBeTruthy();
    expect(mockSetScreen).not.toHaveBeenCalled();
    wrapper.find('button').simulate('click');
    expect(mockSetScreen).toHaveBeenCalled();
  });
});