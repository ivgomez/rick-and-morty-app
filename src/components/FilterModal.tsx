import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '@hooks/hooks';
import {
  getCharacters,
  updateFilter,
  clearFilters,
  setFiltersApplied,
} from '@store/slices/characterSlice';

type Props = {
  onClose: () => void;
};

const FilterModal: React.FC<Props> = ({onClose}) => {
  const dispatch = useAppDispatch();
  const {appliedFilters} = useAppSelector(state => state.character);
  const [name, setName] = useState<string>(appliedFilters.name || '');
  const [status, setStatus] = useState<string>(appliedFilters.status || '');

  useEffect(() => {
    setName(appliedFilters.name || '');
    setStatus(appliedFilters.status || '');
  }, [appliedFilters]);

  const applyFilters = () => {
    const newFilter = {name, status};
    dispatch(updateFilter(newFilter));
    dispatch(getCharacters());
    dispatch(setFiltersApplied(true));
    onClose(); // Close the modal after applying filters
  };

  const clearAllFilters = () => {
    setName('');
    setStatus('');
    dispatch(clearFilters());
    dispatch(getCharacters());
    dispatch(setFiltersApplied(true));
    onClose(); // Close the modal after clearing filters
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Apply Filters</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Status"
          value={status}
          onChangeText={setStatus}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={applyFilters}>
            <Text style={styles.buttonText}>Apply</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={clearAllFilters}>
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.filterList} horizontal={true}>
          {Object.keys(appliedFilters).map((key, index) => (
            <View key={index} style={styles.filterPill}>
              <Text style={styles.filterText}>
                {key.charAt(0).toUpperCase() + key.slice(1)}:{' '}
                {appliedFilters[key as keyof Filter]}
              </Text>
              <TouchableOpacity onPress={clearAllFilters}>
                <Text style={styles.removeButton}>X</Text>
              </TouchableOpacity>
            </View>
          ))}
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
    width: '80%',
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
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    width: '30%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  filterList: {
    marginTop: 20,
    width: '100%',
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    padding: 10,
    margin: 5,
  },
  filterText: {
    marginRight: 10,
  },
  removeButton: {
    color: '#ff0000',
  },
});

export default FilterModal;
