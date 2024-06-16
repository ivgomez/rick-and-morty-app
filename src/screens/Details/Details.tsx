import React from 'react';
import {
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  DetailsRouteProp,
  RootStackNavigationProp,
} from 'models/RootStackNavigationProps';
import useCharacter from 'hooks/useCharacter';
import CharacterDetails from './components/CharacterDetails';

type Props = {
  route: DetailsRouteProp;
  navigation: RootStackNavigationProp;
};

export const Details: React.FC<Props> = ({route, navigation}) => {
  const {id = ''} = route.params;
  const {character, loading} = useCharacter({id, navigation});

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {character && <CharacterDetails character={character} />}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

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
});
