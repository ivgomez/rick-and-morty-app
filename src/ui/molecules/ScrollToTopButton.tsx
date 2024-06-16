import React, {useEffect} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  onPress: () => void;
  visible: boolean;
};

const ScrollToTopButton: React.FC<Props> = ({onPress, visible}) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(visible ? 1 : 0, {duration: 300});
  }, [visible, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
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
