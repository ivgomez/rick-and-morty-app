import React from 'react';
import {TouchableOpacity, StyleSheet, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  onPress: () => void;
  visible: boolean;
};

const ScrollToTopButton: React.FC<Props> = ({onPress, visible}) => {
  return (
    <Animated.View style={[styles.container, {opacity: visible ? 1 : 0}]}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Icon name="arrow-up" size={25} color="#fff" />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 70,
    right: 20,
    zIndex: 100,
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 50,
    padding: 15,
    elevation: 5,
  },
});

export default ScrollToTopButton;
