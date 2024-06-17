import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import ActionButton from 'ui/molecules/ActionButton';

jest.mock('react-native-vector-icons/MaterialIcons', () => 'MaterialIcons');

describe('ActionButton Component', () => {
  it('renders correctly with given title and icon', () => {
    const {getByText} = render(
      <ActionButton title="Click Me" icon="add" onPress={() => {}} />,
    );

    expect(getByText('Click Me')).toBeTruthy();
  });

  it('calls onPress function when pressed', () => {
    const onPressMock = jest.fn();
    const {getByText} = render(
      <ActionButton title="Click Me" icon="add" onPress={onPressMock} />,
    );

    fireEvent.press(getByText('Click Me'));
    expect(onPressMock).toHaveBeenCalled();
  });

  it('renders correctly when disabled', () => {
    const {getByText} = render(
      <ActionButton title="Click Me" icon="add" onPress={() => {}} disabled />,
    );

    const button = getByText('Click Me').parent?.parent;
    expect(button).not.toBeNull();

    if (button) {
      const buttonStyle = button.props.style;
      const flattenedStyle = Array.isArray(buttonStyle)
        ? buttonStyle.flat()
        : [buttonStyle];
      const hasDisabledStyle = flattenedStyle.some(
        (style: any) => style.backgroundColor === '#aaa',
      );

      expect(hasDisabledStyle).toBe(true);
    }
  });

  it('does not call onPress function when disabled and pressed', () => {
    const onPressMock = jest.fn();
    const {getByText} = render(
      <ActionButton
        title="Click Me"
        icon="add"
        onPress={onPressMock}
        disabled
      />,
    );

    fireEvent.press(getByText('Click Me'));
    expect(onPressMock).not.toHaveBeenCalled();
  });
});
