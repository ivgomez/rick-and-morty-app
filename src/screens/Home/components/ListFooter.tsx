import React from 'react';
import {View, StyleSheet} from 'react-native';
import Text from 'ui/atoms/Text';

type ListFooterProps = {
  errorMessage: string | null;
};

const ListFooter: React.FC<ListFooterProps> = ({errorMessage}) => (
  <View style={styles.footer}>
    <Text style={styles.footerText}>
      {errorMessage ? errorMessage : 'Loading...'}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#888',
  },
});

export default ListFooter;
