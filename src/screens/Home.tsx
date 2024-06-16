import React, {useEffect, useState, useRef, useCallback} from 'react';
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
import {useFilters} from '@contexts/filters';

type Props = {
  navigation: RootStackNavigationProp;
};

const Home: React.FC<Props> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const flatListRef = useRef<FlatList<Character>>(null);
  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {charactersFiltered, appliedFilters, apiErrorMessage, nextUrl} =
    useAppSelector(state => state.character);
  const {filtersApplied, setFiltersApplied} = useFilters();

  useEffect(() => {
    dispatch(getCharacters());
  }, [dispatch, appliedFilters]);

  useEffect(() => {
    if (filtersApplied && flatListRef.current) {
      flatListRef.current.scrollToOffset({animated: true, offset: 0});
      setFiltersApplied(false);
    }
  }, [filtersApplied, setFiltersApplied]);

  useEffect(() => {
    if (apiErrorMessage) {
      setErrorMessage(apiErrorMessage);
    } else if (nextUrl === '' && charactersFiltered.length > 0) {
      setErrorMessage('No more characters to load');
    } else {
      setErrorMessage(null);
    }
  }, [apiErrorMessage, nextUrl, charactersFiltered]);

  const loadMoreCharacters = () => {
    if (nextUrl !== '') {
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

  const renderItem = useCallback(
    ({item}: {item: Character}) => (
      <Card
        character={item}
        onPress={() => navigation.navigate('Details', {id: item.id.toString()})}
      />
    ),
    [navigation],
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
        ListFooterComponent={
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              {errorMessage ? errorMessage : 'Loading...'}
            </Text>
          </View>
        }
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
