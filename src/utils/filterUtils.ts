import {Dispatch, SetStateAction} from 'react';
import {AppDispatch} from '@store/store';
import {
  getCharacters,
  updateFilter,
  clearFilters,
  setFiltersApplied,
} from 'store/slices/characterSlice';
import {Filter} from 'models/Character';

type ApplyFiltersType = (
  dispatch: AppDispatch,
  name: string,
  status: string,
  onClose: () => void,
) => void;

type ClearAllFiltersType = (
  dispatch: AppDispatch,
  setName: Dispatch<SetStateAction<string>>,
  setStatus: Dispatch<SetStateAction<string>>,
  onClose: () => void,
) => void;

type RemoveFilterType = (
  dispatch: AppDispatch,
  key: string,
  appliedFilters: Filter,
) => void;

export const applyFilters: ApplyFiltersType = (
  dispatch,
  name,
  status,
  onClose,
) => {
  const newFilter = {name, status};
  dispatch(updateFilter(newFilter));
  dispatch(getCharacters());
  dispatch(setFiltersApplied(true));
  onClose();
};

export const clearAllFilters: ClearAllFiltersType = (
  dispatch,
  setName,
  setStatus,
  onClose,
) => {
  setName('');
  setStatus('');
  dispatch(clearFilters());
  dispatch(getCharacters());
  dispatch(setFiltersApplied(true));
  onClose();
};

export const removeFilter: RemoveFilterType = (
  dispatch,
  key,
  appliedFilters,
) => {
  const newFilter = {...appliedFilters, [key]: ''};
  dispatch(updateFilter(newFilter));
  dispatch(getCharacters());
  dispatch(setFiltersApplied(true));
};
