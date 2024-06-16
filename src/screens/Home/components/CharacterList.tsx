import React from 'react';
import {FlatList} from 'react-native';
import {Character} from 'models/Character';
import CharacterItem from './CharacterItem';
import ListFooter from './ListFooter';

type CharacterListProps = {
  characters: Character[];
  errorMessage: string | null;
  loadMoreCharacters: () => void;
  handleScroll: (event: any) => void;
  onPressItem: (id: string) => void;
  flatListRef: React.RefObject<FlatList<Character>>;
};

const CharacterList: React.FC<CharacterListProps> = ({
  characters,
  errorMessage,
  loadMoreCharacters,
  handleScroll,
  onPressItem,
  flatListRef,
}) => {
  return (
    <FlatList
      ref={flatListRef}
      data={characters}
      renderItem={({item}) => (
        <CharacterItem item={item} onPressItem={onPressItem} />
      )}
      keyExtractor={item => item.id.toString()}
      onEndReached={loadMoreCharacters}
      onEndReachedThreshold={0.5}
      initialNumToRender={10}
      onScroll={handleScroll}
      ListFooterComponent={<ListFooter errorMessage={errorMessage} />}
    />
  );
};

export default CharacterList;
