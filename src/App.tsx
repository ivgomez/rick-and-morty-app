import React from 'react';
import {Provider} from 'react-redux';
import {store} from 'store/store';
import {StackNavigator} from 'navigator/StackNavigator';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <StackNavigator />
    </Provider>
  );
}

export default App;
