import React, {useEffect, useRef} from 'react';
import {
  SafeAreaView,
  FlatList,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '@hooks/hooks';
import {getCharacter} from 'store/slices/characterSlice';
import {RootStackNavigationProp} from 'models/RootStackNavigationProps';
import Card from '@ui/molecules/Card';
import {Character} from '@models/Character';
import Text from '@ui/atoms/Text';
import Button from '@ui/atoms/Button';
import ExploreHeader from '@components/ExploreHeader';

type Props = {
  navigation: RootStackNavigationProp;
};

const Home: React.FC<Props> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const flatListRef = useRef<FlatList<Character>>(null);
  const {results, info} = useAppSelector(state => state.character);

  useEffect(() => {
    dispatch(getCharacter());
  }, [dispatch]);

  const loadMoreCharacters = () => {
    if (info.next !== null) {
      dispatch(getCharacter());
    }
  };

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({animated: true, offset: 0});
  };

  const renderItem = ({item}: {item: Character}) => <Card character={item} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={results}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        onEndReached={loadMoreCharacters}
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
        ListFooterComponent={info.next ? <Text>Loading...</Text> : null}
      />
      <View style={styles.buttonContainer}>
        <Button title="Load More" onPress={loadMoreCharacters} />
        <Button title="Up" onPress={scrollToTop} />
      </View>
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
