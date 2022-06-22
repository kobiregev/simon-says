import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import // SafeAreaView,
// ScrollView,
// StatusBar,
// useColorScheme,
'react-native';
import {Routes} from './src/navigation/Routes';
import persistStore from 'redux-persist/es/persistStore';
import {PersistGate} from 'redux-persist/integration/react';
import {store} from './src/store/store';
import {Provider} from 'react-redux';

const persistor = persistStore(store);

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaProvider>
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

{
  /* <SafeAreaView style={Colors.darker}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={Colors.darker}>
          <View
            style={{
              backgroundColor: Colors.black,
            }}>
            <Game />
          </View>
        </ScrollView>
      </SafeAreaView> */
}
