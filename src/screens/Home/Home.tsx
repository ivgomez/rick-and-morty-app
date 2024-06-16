import React, {useState, useRef} from 'react';
import {SafeAreaView, FlatList, StatusBar, StyleSheet} from 'react-native';
import {RootStackNavigationProp} from 'models/RootStackNavigationProps';
import {Character} from 'models/Character';
import ScrollToTopButton from 'ui/molecules/ScrollToTopButton';
import useCharacters from 'hooks/useCharacters';
import CharacterList from './components/CharacterList';

type Props = {
  navigation: RootStackNavigationProp;
};

export const Home: React.FC<Props> = ({navigation}) => {
  const flatListRef = useRef<FlatList<Character>>(null);
  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);
  const {charactersFiltered, errorMessage, loadMoreCharacters} =
    useCharacters();

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowScrollButton(offsetY > 300);
  };

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({animated: true, offset: 0});
  };

  const onPressItem = (id: string) => {
    navigation.navigate('Details', {id});
  };

  return (
    <SafeAreaView style={styles.container}>
      <CharacterList
        flatListRef={flatListRef}
        characters={charactersFiltered}
        errorMessage={errorMessage}
        loadMoreCharacters={loadMoreCharacters}
        handleScroll={handleScroll}
        onPressItem={onPressItem}
      />
      <ScrollToTopButton onPress={scrollToTop} visible={showScrollButton} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});
