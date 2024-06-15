import {NavigationProp, RouteProp} from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  Details: {id: string};
};

export type RootStackNavigationProp = NavigationProp<RootStackParamList>;
export type DetailsRouteProp = RouteProp<RootStackParamList, 'Details'>;
