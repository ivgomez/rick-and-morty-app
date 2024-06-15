import React from 'react';
import {
  Text as RNText,
  StyleSheet,
  TextProps as RNTextProps,
} from 'react-native';

interface TextProps extends RNTextProps {
  style?: RNTextProps['style'];
}

const Text: React.FC<TextProps> = ({children, style, ...props}) => (
  <RNText style={[styles.text, style]} {...props}>
    {children}
  </RNText>
);

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: '#000',
  },
});

export default Text;
