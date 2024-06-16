import {Info} from 'models/Info';
import {Character, Filter} from 'models/Character';

export interface StateModel {
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
