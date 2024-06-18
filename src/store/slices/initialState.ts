import {StateModel} from 'models/StateModel';

export const initialState: StateModel = {
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
