import {renderHook} from '@testing-library/react-hooks';
import useCharacter from 'hooks/useCharacter';
import {characterService} from 'services/CharacterService';
import {RootStackNavigationProp} from 'models/RootStackNavigationProps';
import {Character} from 'models/Character';

jest.mock('services/CharacterService');
const mockedCharacterService = characterService as jest.Mocked<
  typeof characterService
>;

describe('useCharacter hook', () => {
  const mockNavigation = {
    setOptions: jest.fn(),
  } as unknown as RootStackNavigationProp;

  beforeEach(() => {
    mockedCharacterService.getCharacter.mockResolvedValue(characterMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and set the character data correctly', async () => {
    const {result, waitForNextUpdate} = renderHook(() =>
      useCharacter({id: '1', navigation: mockNavigation}),
    );

    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.character).toEqual(characterMock);
    expect(result.current.loading).toBe(false);
    expect(mockNavigation.setOptions).toHaveBeenCalledWith({
      title: 'Rick Sanchez',
    });
  });

  it('should handle fetch error', async () => {
    mockedCharacterService.getCharacter.mockRejectedValue(
      new Error('Failed to fetch character'),
    );

    const {result, waitForNextUpdate} = renderHook(() =>
      useCharacter({id: '1', navigation: mockNavigation}),
    );

    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.character).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(mockNavigation.setOptions).not.toHaveBeenCalled();
  });
});

const characterMock: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: {name: 'Earth (C-137)', url: ''},
  location: {name: 'Earth (Replacement Dimension)', url: ''},
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: [],
  url: '',
  created: '',
};
