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
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withTiming(visible ? 180 : 0, {duration: 300});
  }, [visible, rotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{rotate: `${rotation.value}deg`}],
    opacity: withTiming(visible ? 1 : 0, {duration: 300}),
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Icon name="arrow-down" size={25} color="#fff" />
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
