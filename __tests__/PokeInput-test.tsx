import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react-native';
import PokeInput from '../src/screens/PokeInput';

afterEach(cleanup);

describe('PokInput Screen', () => {
  it('Should apply the value when changing text', () => {
    const {getByTestId} = render(<PokeInput />);
    const input = getByTestId('input');
    fireEvent.changeText(input, '123');
    expect(input.props.value).toBe('123');
  });

  it('Should Fire onPress props when button pressed', () => {
    const mockFn = jest.fn();

    const {getByText} = render(<PokeInput/>);
    const button = getByText('Search');
    fireEvent.press(button);
    expect(button.props.children).toHaveBeenCalled();


  });
});
