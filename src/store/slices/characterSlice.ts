import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {characterService} from '@services/CharacterService';
import {Info} from '@models/Info';
import {Character} from '@models/Character';

const name: string = 'character.action';

interface stateModel {
  loading: boolean;
  error: string;
  info: Info;
  results: Character[];
  nextUrl: string;
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
  results: [],
  nextUrl: `${process.env.API_URL}/character?page=1`,
};

export const getCharacter = createAsyncThunk(
  `${name}/GetCharacter`,
  async (_, {getState}) => {
    const state = getState() as {character: stateModel};
    const url = state.character.nextUrl;
    if (!url) {
      throw new Error('No more pages to load');
    }
    const response = await characterService.getCharacter(url);
    return response;
  },
);

export const characterSlice = createSlice({
  name,
  initialState,
  extraReducers: builder => {
    builder.addCase(getCharacter.pending, state => {
      state.loading = true;
    });

    builder.addCase(getCharacter.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.info = payload.info;
      state.results = state.results.concat(payload.results);
      state.nextUrl = payload.info.next;
    });

    builder.addCase(getCharacter.rejected, state => {
      state.loading = false;
      state.error = 'error getting answer';
    });
  },
  reducers: {},
});

export default characterSlice.reducer;
