import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';
import Sound from 'react-native-sound';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Game from './src/containers/Game';

// const redSound = require('./src/assets/audios/red.mp3');
// const blueSound = require('./src/assets/audios/blue.mp3');
// const greenSound = require('./src/assets/audios/green.mp3');
// const yellowSound = require('./src/assets/audios/yellow.mp3');

// export const loadSound = (sound: any) => {
//   return new Sound(sound, error => {
//     if (error) {
//       console.log('failed to load the sound', error);
//       return;
//     }
//   });
// };
// export const sounds = {
//   redSound: loadSound(redSound),
//   blueSound: loadSound(blueSound),
//   greenSound: loadSound(greenSound),
//   yellowSound: loadSound(yellowSound),
// };

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={Colors.darker}>
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
    </SafeAreaView>
  );
};

export default App;
