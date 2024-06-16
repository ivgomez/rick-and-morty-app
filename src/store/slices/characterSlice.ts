import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {characterService} from '@services/CharacterService';
import {Info} from '@models/Info';
import {Character} from '@models/Character';

const name: string = 'character.action';

interface Filter {
  name?: string;
  status?: string;
}

interface StateModel {
  loading: boolean;
  error: string;
  info: Info;
  character: Character;
  characters: Character[];
  charactersFiltered: Character[];
  appliedFilters: Filter;
  filter: string;
  apiErrorMessage: string | null;
  nextUrl: string;
  filtersApplied: boolean;
}

const initialState: StateModel = {
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
  appliedFilters: {
    name: '',
    status: '',
  },
  apiErrorMessage: null,
  nextUrl: `${process.env.API_URL}/character?page=1`,
  filtersApplied: false,
};

export const getCharacters = createAsyncThunk(
  `${name}/GetCharacters`,
  async (_, {getState, rejectWithValue}) => {
    const state = getState() as {character: StateModel};
    const {appliedFilters, nextUrl} = state.character;

    let url = nextUrl;

    // Construir la URL con filtros aplicados
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

    console.log('URL:', url);

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
      state.characters = []; // Clear characters when filters are updated
      state.charactersFiltered = [];
      state.nextUrl = `${process.env.API_URL}/character?page=1`; // Reset to first page with filters
    },
    clearFilters(state) {
      state.appliedFilters = {};
      state.characters = [];
      state.charactersFiltered = [];
      state.nextUrl = `${process.env.API_URL}/character?page=1`; // Reset to first page
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
