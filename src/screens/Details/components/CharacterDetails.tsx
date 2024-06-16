import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Character} from 'models/Character';

type CharacterDetailsProps = {
  character: Character;
};

const CharacterDetails: React.FC<CharacterDetailsProps> = ({character}) => {
  const createdDate = character.created
    ? new Date(character.created).toLocaleDateString()
    : 'Unknown';

  return (
    <>
      <View style={styles.imageContainer}>
        <Image source={{uri: character.image}} style={styles.image} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Name:</Text> {character.name}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Status:</Text> {character.status}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Species:</Text> {character.species}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Gender:</Text> {character.gender}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Origin:</Text> {character.origin.name}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Location:</Text> {character.location.name}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Created:</Text> {createdDate}
        </Text>
      </View>
    </>
  );
};

export default CharacterDetails;

const styles = StyleSheet.create({
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    marginVertical: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  infoContainer: {
    paddingVertical: 20,
    alignItems: 'flex-start',
    width: '100%',
  },
  infoText: {
    fontSize: 18,
    marginVertical: 5,
    color: '#333',
  },
  label: {
    fontWeight: 'bold',
    color: '#000',
  },
});
