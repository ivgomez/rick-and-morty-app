import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import InputField from 'ui/atoms/InputField';

describe('InputField Component', () => {
  it('renders correctly with given placeholder and value', () => {
    const {getByPlaceholderText} = render(
      <InputField
        placeholder="Enter text"
        value="Test value"
        onChangeText={() => {}}
      />,
    );
    expect(getByPlaceholderText('Enter text').props.value).toBe('Test value');
  });

  it('calls onChangeText function when text is changed', () => {
    const onChangeTextMock = jest.fn();
    const {getByPlaceholderText} = render(
      <InputField
        placeholder="Enter text"
        value=""
        onChangeText={onChangeTextMock}
      />,
    );

    fireEvent.changeText(getByPlaceholderText('Enter text'), 'New text');
    expect(onChangeTextMock).toHaveBeenCalledWith('New text');
  });
});
