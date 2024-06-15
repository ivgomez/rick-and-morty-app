import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {characterService} from '@services/CharacterService';

const name: string = 'character.action';

const initialState = {
  loading: false,
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

    builder.addCase(getCharacter.fulfilled, state => {
      state.loading = false;
    });

    builder.addCase(getCharacter.rejected, state => {
      state.loading = false;
    });
  },
  reducers: {},
});

export default characterSlice.reducer;
