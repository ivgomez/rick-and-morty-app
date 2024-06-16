import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {useAppDispatch, useAppSelector} from 'hooks/hooks';
import Text from 'ui/atoms/Text';
import InputField from 'ui/atoms/InputField';
import ActionButton from 'ui/molecules/ActionButton';
import Pill from 'ui/molecules/Pill';
import {applyFilters, clearAllFilters, removeFilter} from 'utils/filterUtils';

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

  const handleApplyFilters = () => {
    applyFilters(dispatch, name, status, onClose);
  };

  const handleClearAllFilters = () => {
    clearAllFilters(dispatch, setName, setStatus, onClose);
  };

  const handleRemoveFilter = (key: string) => {
    removeFilter(dispatch, key, appliedFilters);
  };

  return (
    <View style={styles.modalContainer}>
      <TouchableOpacity
        style={styles.modalBackground}
        onPress={onClose}
        activeOpacity={1}>
        <TouchableOpacity style={styles.modalContent} activeOpacity={1}>
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
              onPress={handleApplyFilters}
              disabled={!isValid}
            />
            <ActionButton
              title="Clear All"
              icon="clear"
              onPress={handleClearAllFilters}
              disabled={!Object.values(appliedFilters).some(value => value)}
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
                    onRemove={() => handleRemoveFilter(key)}
                  />
                ),
            )}
          </ScrollView>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  filterList: {
    marginTop: 20,
    width: '100%',
  },
});

export default FilterModal;
