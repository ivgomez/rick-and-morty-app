import React from 'react';
import '@testing-library/jest-native/extend-expect';
import {render, fireEvent} from '@testing-library/react-native';
import Button from 'ui/atoms/Button';

describe('Button Component', () => {
  it('renders correctly with given title', () => {
    const {getByText} = render(<Button title="Press me" onPress={() => {}} />);
    expect(getByText('Press me')).toBeTruthy();
  });

  it('calls onPress function when pressed', () => {
    const onPressMock = jest.fn();
    const {getByText} = render(
      <Button title="Press me" onPress={onPressMock} />,
    );

    fireEvent.press(getByText('Press me'));
    expect(onPressMock).toHaveBeenCalled();
  });
});
