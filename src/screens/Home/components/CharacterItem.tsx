import React from 'react';
import {Character} from 'models/Character';
import Card from 'ui/molecules/Card';

type CharacterItemProps = {
  item: Character;
  onPressItem: (id: string) => void;
};

const CharacterItem: React.FC<CharacterItemProps> = ({item, onPressItem}) => {
  return (
    <Card character={item} onPress={() => onPressItem(item.id.toString())} />
  );
};

export default React.memo(CharacterItem);
