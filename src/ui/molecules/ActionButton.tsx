import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type ActionButtonProps = {
  title: string;
  icon: string;
  onPress: () => void;
  disabled?: boolean;
};

const ActionButton: React.FC<ActionButtonProps> = ({
  title,
  icon,
  onPress,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.buttonDisabled]}
      onPress={onPress}
      disabled={disabled}>
      <MaterialIcons name={icon} size={20} color="#fff" />
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
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
