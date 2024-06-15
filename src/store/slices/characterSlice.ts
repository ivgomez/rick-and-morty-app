import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {characterService} from '@services/CharacterService';
import {Info} from '@models/Info';
import {Character} from '@models/Character';

const name: string = 'character.action';

interface stateModel {
  loading: boolean;
  error: string;
  info: Info;
  character: Character;
  characters: Character[];
  charactersFiltered: Character[];
  nextUrl: string;
  filter: string;
}

const initialState: stateModel = {
  loading: false,
  error: '',
  info: {
    count: 0,
    pages: 0,
    next: '',
    prev: '',
  },
  character: {
    id: 0,
    name: '',
    status: '',
    species: '',
    type: '',
    gender: '',
    origin: {
      name: '',
      url: '',
    },
    location: {
      name: '',
      url: '',
    },
    image: '',
    episode: [],
    url: '',
    created: '',
  },
  characters: [],
  charactersFiltered: [],
  filter: '',
  nextUrl: `${process.env.API_URL}/character?page=1`,
};

export const getCharacters = createAsyncThunk(
  `${name}/GetCharacters`,
  async (_, {getState}) => {
    const state = getState() as {character: stateModel};
    const url = state.character.nextUrl;
    if (!url) {
      throw new Error('No more pages to load');
    }
    const response = await characterService.getCharacters(url);
    return response;
  },
);

export const getCharacter = createAsyncThunk(
  `${name}/GetCharacter`,
  async (id: string) => {
    const response = await characterService.getCharacter(id);
    return response;
  },
);

export const characterSlice = createSlice({
  name,
  initialState,
  extraReducers: builder => {
    /* Getting All Characters */
    builder.addCase(getCharacters.pending, state => {
      state.loading = true;
    });

    builder.addCase(getCharacters.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.info = payload.info;
      const newResults = payload.results.filter(
        (newCharacter: Character) =>
          !state.characters.some(
            existingCharacter => existingCharacter.id === newCharacter.id,
          ),
      );
      state.characters = state.characters.concat(newResults);
      state.charactersFiltered = state.characters.filter(character =>
        character.name.toLowerCase().includes(state.filter.toLowerCase()),
      );
      state.nextUrl = payload.info.next;
    });

    builder.addCase(getCharacters.rejected, state => {
      state.loading = false;
      state.error = 'error getting answer';
    });

    /* Getting Character Detail */
    builder.addCase(getCharacter.pending, state => {
      state.loading = true;
    });

    builder.addCase(getCharacter.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.character = payload;
    });

    builder.addCase(getCharacter.rejected, state => {
      state.loading = false;
      state.error = 'error getting answer';
    });
  },
  reducers: {
    filterCharacters(state, action: PayloadAction<string>) {
      state.filter = action.payload;
      state.charactersFiltered = state.characters.filter(character =>
        character.name.toLowerCase().includes(action.payload.toLowerCase()),
      );
    },
  },
});

export const {filterCharacters} = characterSlice.actions;
export default characterSlice.reducer;
