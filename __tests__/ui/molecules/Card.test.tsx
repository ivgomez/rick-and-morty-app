import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Card from 'ui/molecules/Card';
import {Character} from 'models/character';

describe('Card Component', () => {
  it('renders correctly with given character', () => {
    const {getByText, getByTestId} = render(<Card character={characterMock} />);

    expect(getByText('Rick Sanchez')).toBeTruthy();
    expect(getByText('Alive')).toBeTruthy();
    expect(getByTestId('character-image')).toBeTruthy();
  });

  it('calls onPress function when pressed', () => {
    const onPressMock = jest.fn();
    const {getByTestId} = render(
      <Card character={characterMock} onPress={onPressMock} />,
    );

    fireEvent.press(getByTestId('card-button'));
    expect(onPressMock).toHaveBeenCalled();
  });
});

const characterMock: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: {
    name: 'Earth (C-137)',
    url: '',
  },
  location: {
    name: 'Earth (Replacement Dimension)',
    url: '',
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: [],
  url: '',
  created: '',
};
