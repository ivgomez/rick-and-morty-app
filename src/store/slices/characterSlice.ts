import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {characterService} from '@services/CharacterService';
import {Info} from '@models/Info';
import {Character} from '@models/Character';

const name: string = 'character.action';

interface stateModel {
  loading: boolean;
  error: string;
  data: {
    info: Info;
    results: Character[];
  };
}

const initialState: stateModel = {
  loading: false,
  error: '',
  data: {
    info: {
      count: 0,
      pages: 0,
      next: '',
      prev: '',
    },
    results: [],
  },
};

export const getCharacter = createAsyncThunk(
  `${name}/GetCharacter`,
  async () => {
    const response = await characterService.getCharacter();
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
      state.data = payload;
    });

    builder.addCase(getCharacter.rejected, state => {
      state.loading = false;
      state.error = 'error getting answer';
    });
  },
  reducers: {},
});

export default characterSlice.reducer;
