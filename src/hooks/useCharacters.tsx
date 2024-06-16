import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from 'hooks/hooks';
import {getCharacters} from 'store/slices/characterSlice';
import {useFilters} from 'contexts/filters';

const useCharacters = () => {
  const dispatch = useAppDispatch();
  const {charactersFiltered, appliedFilters, apiErrorMessage, nextUrl} =
    useAppSelector(state => state.character);
  const {filtersApplied, setFiltersApplied} = useFilters();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getCharacters());
  }, [dispatch, appliedFilters]);

  useEffect(() => {
    if (filtersApplied) {
      setFiltersApplied(false);
    }
  }, [filtersApplied, setFiltersApplied]);

  useEffect(() => {
    if (apiErrorMessage) {
      setErrorMessage(apiErrorMessage);
    } else if (nextUrl === '' && charactersFiltered.length > 0) {
      setErrorMessage('No more characters to load');
    } else {
      setErrorMessage(null);
    }
  }, [apiErrorMessage, nextUrl, charactersFiltered]);

  const loadMoreCharacters = () => {
    if (nextUrl !== '') {
      dispatch(getCharacters());
    }
  };

  return {charactersFiltered, errorMessage, loadMoreCharacters};
};

export default useCharacters;
