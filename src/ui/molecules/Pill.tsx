import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type FilterPillProps = {
  label: string;
  value: string;
  onRemove: () => void;
};

const FilterPill: React.FC<FilterPillProps> = ({label, value, onRemove}) => {
  return (
    <View style={styles.filterPill}>
      <Text style={styles.filterText}>
        {label}: {value}
      </Text>
      <TouchableOpacity onPress={onRemove}>
        <MaterialIcons name="close" size={16} color="#ff0000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default FilterPill;
