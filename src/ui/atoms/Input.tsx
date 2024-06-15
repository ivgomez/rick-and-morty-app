import React from 'react';
import {TextInput, StyleSheet, TextInputProps} from 'react-native';

const Input: React.FC<TextInputProps> = props => (
  <TextInput style={styles.input} {...props} />
);

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});

export default Input;
