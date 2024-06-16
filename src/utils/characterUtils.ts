import {Character} from 'models/Character';
import {StateModel} from 'models/StateModel';

export const updateCharactersState = (state: StateModel, payload: any) => {
  state.loading = false;
  state.apiErrorMessage = null;
  state.info = payload.data.info;

  const newResults = payload.data.results.filter(
    (newCharacter: Character) =>
      !state.characters.some(
        existingCharacter => existingCharacter.id === newCharacter.id,
      ),
  );

  state.characters = state.characters.concat(newResults);

  state.charactersFiltered = state.characters.filter(character =>
    character.name.toLowerCase().includes(state.filter.toLowerCase()),
  );
  state.nextUrl = payload.data.info.next || '';
};
