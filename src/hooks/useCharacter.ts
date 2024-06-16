import {useEffect, useState} from 'react';
import {characterService} from 'services/CharacterService';
import {Character} from 'models/Character';
import {RootStackNavigationProp} from 'models/RootStackNavigationProps';

type useCharacterProps = {
  id: string;
  navigation: RootStackNavigationProp;
};

const useCharacter = ({id, navigation}: useCharacterProps) => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      if (id) {
        try {
          const response = await characterService.getCharacter(id);
          setCharacter(response);
          navigation.setOptions({title: response.name});
        } catch (error) {
          console.error('Failed to fetch character', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCharacter();
  }, [id, navigation]);

  return {character, loading};
};

export default useCharacter;
