import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {
  RootStackNavigationProp,
  DetailsRouteProp,
} from 'models/RootStackNavigationProps';
import {characterService} from '@services/CharacterService';
import {Character} from 'models/Character';

type Props = {
  navigation: RootStackNavigationProp;
  route: DetailsRouteProp;
};

const Details: React.FC<Props> = ({navigation, route}) => {
  const {id = ''} = route.params;
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      if (id) {
        try {
          const response = await characterService.getCharacter(id);
          setCharacter(response);
          navigation.setOptions({title: response.name}); // Set the header title to the character's name
        } catch (error) {
          console.error('Failed to fetch character', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCharacter();
  }, [id, navigation]);

  const renderCharacterDetails = (character: Character) => {
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
            <Text style={styles.label}>Location:</Text>{' '}
            {character.location.name}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.label}>Created:</Text> {createdDate}
          </Text>
        </View>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {character && renderCharacterDetails(character)}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
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
