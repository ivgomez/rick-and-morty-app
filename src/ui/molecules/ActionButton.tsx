import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Props = {
  title: string;
  icon: string;
  onPress: () => void;
  disabled?: boolean;
};

const ActionButton: React.FC<Props> = ({title, icon, onPress, disabled}) => (
  <TouchableOpacity
    style={[styles.button, disabled && styles.buttonDisabled]}
    onPress={onPress}
    disabled={disabled}>
    <MaterialIcons name={icon} size={20} color="#fff" />
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 5,
    paddingLeft: 2,
    paddingRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
  },
  buttonDisabled: {
    backgroundColor: '#aaa',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 5,
  },
});

export default ActionButton;
