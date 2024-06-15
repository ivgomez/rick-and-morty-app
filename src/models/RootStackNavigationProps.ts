import {NavigationProp} from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

export type RootStackNavigationProp = NavigationProp<RootStackParamList>;
