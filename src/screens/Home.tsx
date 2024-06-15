import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  FlatList,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '@hooks/hooks';
import {getCharacters} from 'store/slices/characterSlice';
import {RootStackNavigationProp} from 'models/RootStackNavigationProps';
import Card from '@ui/molecules/Card';
import {Character} from '@models/Character';
import Text from '@ui/atoms/Text';
import ScrollToTopButton from 'ui/molecules/ScrollToTopButton';

type Props = {
  navigation: RootStackNavigationProp;
};

const Home: React.FC<Props> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const flatListRef = useRef<FlatList<Character>>(null);
  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);
  const {charactersFiltered, info} = useAppSelector(state => state.character);

  useEffect(() => {
    dispatch(getCharacters());
  }, [dispatch]);

  const loadMoreCharacters = () => {
    if (info.next !== null) {
      dispatch(getCharacters());
    }
  };

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowScrollButton(offsetY > 300);
  };

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({animated: true, offset: 0});
  };

  const renderItem = ({item}: {item: Character}) => (
    <Card
      character={item}
      onPress={() => navigation.navigate('Details', {id: item.id.toString()})}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={charactersFiltered}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        onEndReached={loadMoreCharacters}
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
        onScroll={handleScroll}
        ListFooterComponent={info.next ? <Text>Loading...</Text> : null}
      />
      <ScrollToTopButton onPress={scrollToTop} visible={showScrollButton} />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  scrollToTopButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  scrollToTopText: {
    color: '#fff',
    fontSize: 16,
  },
});
