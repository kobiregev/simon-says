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
// import {SafeAreaView} from 'react-native-safe-area-context';
// import {Colors} from 'react-native/Libraries/NewAppScreen';
// import Game from './src/containers/Game';

// function HomeScreen({navigation}) {
//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <Text>Home Screen</Text>
//       <Button
//         title="Go to Details"
//         onPress={() => navigation.navigate('Details')}
//       />
//     </View>
//   );
// }
// function DetailsScreen() {
//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <Text>Details Screen</Text>
//     </View>
//   );
// }

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Routes />
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
