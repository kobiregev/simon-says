import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Routes} from './src/navigation/Routes';
import persistStore from 'redux-persist/es/persistStore';
import {PersistGate} from 'redux-persist/integration/react';
import {store} from './src/store/store';
import {Provider} from 'react-redux';
import {StyleSheet} from 'react-native';
import {COLOR_WHITE} from './src/constants/constants';

const persistor = persistStore(store);

const App = () => {
  return (
    <SafeAreaProvider style={styles.appContainer}>
      <NavigationContainer>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <Routes />
          </PersistGate>
        </Provider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: COLOR_WHITE,
  },
});
