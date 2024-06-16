import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from 'screens/Home';
import {Details} from 'screens/Details';
import ExploreHeader from 'components/ExploreHeader';
import {FiltersProvider} from 'contexts/filters';

export function StackNavigator() {
  const Stack = createNativeStackNavigator();
  return (
    <FiltersProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{title: 'Home', header: ExploreHeader}}
          />
          <Stack.Screen
            name="Details"
            component={Details}
            options={{title: 'Details'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </FiltersProvider>
  );
}
