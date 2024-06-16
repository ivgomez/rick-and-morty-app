import React, {createContext, useState, useContext, ReactNode} from 'react';

interface FiltersContextType {
  filtersApplied: boolean;
  setFiltersApplied: (value: boolean) => void;
}

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export const FiltersProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const [filtersApplied, setFiltersApplied] = useState<boolean>(false);

  return (
    <FiltersContext.Provider value={{filtersApplied, setFiltersApplied}}>
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = (): FiltersContextType => {
  const context = useContext(FiltersContext);
  if (context === undefined) {
    throw new Error('useFilters must be used within a FiltersProvider');
  }
  return context;
};
