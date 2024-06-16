import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

type InputFieldProps = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
};

const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  value,
  onChangeText,
}) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default InputField;
