import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useAppDispatch, useAppSelector} from 'hooks/hooks';
import {
  getCharacters,
  updateFilter,
  clearFilters,
  setFiltersApplied,
} from 'store/slices/characterSlice';
import Text from 'ui/atoms/Text';
import InputField from 'ui/atoms/InputField';
import ActionButton from 'ui/molecules/ActionButton';
import Pill from 'ui/molecules/Pill';

type Props = {
  onClose: () => void;
};

const FilterModal: React.FC<Props> = ({onClose}) => {
  const dispatch = useAppDispatch();
  const {appliedFilters} = useAppSelector(state => state.character);
  const [name, setName] = useState<string>(appliedFilters.name || '');
  const [status, setStatus] = useState<string>(appliedFilters.status || '');
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    setName(appliedFilters.name || '');
    setStatus(appliedFilters.status || '');
  }, [appliedFilters]);

  useEffect(() => {
    setIsValid(!!name || !!status);
  }, [name, status]);

  const applyFilters = () => {
    const newFilter = {name, status};
    dispatch(updateFilter(newFilter));
    dispatch(getCharacters());
    dispatch(setFiltersApplied(true));
    onClose();
  };

  const clearAllFilters = () => {
    setName('');
    setStatus('');
    dispatch(clearFilters());
    dispatch(getCharacters());
    dispatch(setFiltersApplied(true));
    onClose();
  };

  const removeFilter = (key: string) => {
    const newFilter = {...appliedFilters, [key]: ''};
    dispatch(updateFilter(newFilter));
    dispatch(getCharacters());
    dispatch(setFiltersApplied(true));
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Apply Filters</Text>
        <InputField placeholder="Name" value={name} onChangeText={setName} />
        <InputField
          placeholder="Status"
          value={status}
          onChangeText={setStatus}
        />
        <View style={styles.buttonContainer}>
          <ActionButton
            title="Apply"
            icon="check"
            onPress={applyFilters}
            disabled={!isValid}
          />
          <ActionButton
            title="Clear All"
            icon="clear"
            onPress={clearAllFilters}
            disabled={!Object.keys(appliedFilters).length}
          />
          <ActionButton title="Close" icon="close" onPress={onClose} />
        </View>
        <ScrollView style={styles.filterList} horizontal={true}>
          {Object.entries(appliedFilters).map(
            ([key, value]) =>
              value && (
                <Pill
                  key={key}
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={value}
                  onRemove={() => removeFilter(key)}
                />
              ),
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: 330,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 5,
    paddingLeft: 2,
    paddingRight: 5,
    alignItems: 'center',
    width: 90,
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#aaa',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 5,
  },
  filterList: {
    marginTop: 20,
    width: '100%',
  },
});

export default FilterModal;
