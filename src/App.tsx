import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, Text, View} from 'react-native';
import {Provider} from 'react-redux';
import {store} from '@store/store';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaView>
        <StatusBar />
        <ScrollView>
          <View>
            <Text>Hello world</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
}

export default App;
