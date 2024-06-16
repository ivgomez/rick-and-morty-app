import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {characterService} from 'services/CharacterService';
import {StateModel} from 'models/StateModel';
import {Filter} from 'models/Character';
import {updateCharactersState} from 'utils/characterUtils';
import {initialState, defaultUrl} from './initialState';

const name: string = 'character.action';

export const getCharacters = createAsyncThunk(
  `${name}/GetCharacters`,
  async (_, {getState, rejectWithValue}) => {
    const state = getState() as {character: StateModel};
    const {appliedFilters, nextUrl} = state.character;

    let url = nextUrl;

    const queryParams: string[] = [];
    if (appliedFilters.name) {
      queryParams.push(`name=${appliedFilters.name}`);
    }
    if (appliedFilters.status) {
      queryParams.push(`status=${appliedFilters.status}`);
    }

    if (queryParams.length > 0) {
      const baseUrl = nextUrl.split('?')[0];
      const pageParam = nextUrl
        .split('?')[1]
        ?.split('&')
        .find(param => param.startsWith('page='));
      url = `${baseUrl}?${pageParam}&${queryParams.join('&')}`;
    }
    console.log('url:', url);

    try {
      const response = await characterService.getCharacters(url);
      return {data: response};
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || 'Error fetching data',
      );
    }
  },
);

export const characterSlice = createSlice({
  name,
  initialState,
  reducers: {
    filterCharacters(state, action: PayloadAction<string>) {
      state.filter = action.payload;
      state.charactersFiltered = state.characters.filter(character =>
        character.name.toLowerCase().includes(action.payload.toLowerCase()),
      );
    },
    updateFilter(state, action: PayloadAction<Filter>) {
      state.appliedFilters = {...state.appliedFilters, ...action.payload};
      state.characters = [];
      state.charactersFiltered = [];
      state.nextUrl = defaultUrl;
    },
    clearFilters(state) {
      state.appliedFilters = {};
      state.characters = [];
      state.charactersFiltered = [];
      state.nextUrl = defaultUrl;
    },
    setFiltersApplied(state, action: PayloadAction<boolean>) {
      state.filtersApplied = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getCharacters.pending, state => {
      state.loading = true;
    });

    builder.addCase(getCharacters.fulfilled, (state, {payload}) => {
      updateCharactersState(state, payload);
    });

    builder.addCase(getCharacters.rejected, (state, action) => {
      state.loading = false;
      state.error = 'error getting characters';
      state.apiErrorMessage = action.payload as string;
    });
  },
});

export const {filterCharacters, updateFilter, clearFilters, setFiltersApplied} =
  characterSlice.actions;

export default characterSlice.reducer;
