import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

const ExploreHeader = ({}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search..."
            onChangeText={() => {}}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#8f8787',
    paddingBottom: 10,
  },
  headerContainer: {
    backgroundColor: '#fff',
    height: 130,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 10,
  },
});

export default ExploreHeader;
