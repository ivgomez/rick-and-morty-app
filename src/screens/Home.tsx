import React, {useEffect} from 'react';
import {SafeAreaView, Button, View, Text} from 'react-native';
import {useAppDispatch, useAppSelector} from '@hooks/hooks';
import {getCharacter} from 'store/slices/characterSlice';
import {RootStackNavigationProp} from 'models/RootStackNavigationProps';

type Props = {
  navigation: RootStackNavigationProp;
};

const Home: React.FC<Props> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {data} = useAppSelector(state => state.character);
  console.log('data================>:', data);
  useEffect(() => {
    dispatch(getCharacter());
  }, [dispatch]);
  return (
    <SafeAreaView>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Details')}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
