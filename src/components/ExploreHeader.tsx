import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useAppDispatch} from '@hooks/hooks';
import {filterCharacters} from 'store/slices/characterSlice';

const ExploreHeader = () => {
  const dispatch = useAppDispatch();

  const handleFilterChange = (text: string) => {
    dispatch(filterCharacters(text));
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.inputContainer}>
          <FontAwesome
            name="search"
            size={20}
            color="#000"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Search..."
            onChangeText={handleFilterChange}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7eff84',
    paddingBottom: 10,
  },
  headerContainer: {
    height: 55,
    marginTop: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 10,
    width: '90%',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
});

export default ExploreHeader;
