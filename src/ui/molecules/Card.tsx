import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import Text from 'ui/atoms/Text';

interface Character {
  id: number;
  name: string;
  status: string;
  image: string;
}

interface CardProps {
  character: Character;
  onPress?: (event: GestureResponderEvent) => void;
}

const Card: React.FC<CardProps> = ({character, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.card}
      testID="card-button">
      <Image
        source={{uri: character.image}}
        style={styles.image}
        testID="character-image"
      />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
          {character.name}
        </Text>
        <Text style={styles.status}>{character.status}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  info: {
    marginLeft: 16,
    justifyContent: 'center',
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    flexShrink: 1,
  },
  status: {
    marginTop: 4,
    color: '#666',
  },
});

export default Card;
