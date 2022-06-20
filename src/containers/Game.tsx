import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import Tile from '../components/Tile/Tile';
import {tileOptions} from '../constants/constants';
import {ITile} from '../types';
import {getRandomNumber} from '../utils/getRandomNumber';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// TODO: Move to another file utils
// Sound files

const Game = () => {
  const [startGame, setStartGame] = useState(false);
  // create sequnces to play by simon,
  const [sequences, setSequence] = useState([
    getRandomNumber(tileOptions.length - 1),
  ]);
  //   const soundLoaded =
  //check if first play to load sounds
  const firstPlay: boolean = tileOptions.length === 1;

  //testing sound works
  // TODO: CREATE CONSTANTS TO COLORS SOUNDS.
  const redTileRef = useRef();
  const greenTileRef = useRef();
  const blueTileRef = useRef();
  const yellowTileRef = useRef();

  let playingIndex: number = 0;

  // loops over sequences and plays the sounds
  const playSequence = () => {
    sequences.forEach(index => {
      console.log(tileOptions[index]);

      playPause(tileOptions[index]);
    });
  };
  const handleGameStart = (): void => {
    setStartGame(true);
  };
  const playPause = (tile: ITile) => {
    // stoping to play mutiple in a row withouth wating for sound to end
    tile.sound.stop();
    tile.sound.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  };

  // Play the sequnces after sequnces is updated
  useEffect(() => {
    // load sounds for first time
    if (startGame) {
      playSequence();
    }
    // return () => {
    // };
  }, [sequences, startGame]);

  // will be called inside tile after playing the sound.
  // checks if player pressed the correct tile by comparing the ids of the sequnce by current index.
  // if users pressed the wrong tile, show modal to collect user information.
  //   const onTilePress = () => {};

  return (
    <View style={styles.container}>
      {!startGame && (
        <View style={styles.overlay}>
          <TouchableOpacity onPress={handleGameStart}>
            <Text style={styles.playButton}>Play</Text>
          </TouchableOpacity>
        </View>
      )}
      <Tile
        color={tileOptions[0].color}
        id={tileOptions[0].id}
        sound={tileOptions[0].sound}
        onTilePress={() => playPause(tileOptions[0])}
        ref={redTileRef}
      />
      <Tile
        color={tileOptions[1].color}
        id={tileOptions[1].id}
        sound={tileOptions[1].sound}
        onTilePress={() => playPause(tileOptions[1])}
        ref={blueTileRef}
      />
      <Tile
        color={tileOptions[2].color}
        id={tileOptions[2].id}
        sound={tileOptions[2].sound}
        onTilePress={() => playPause(tileOptions[2])}
        ref={greenTileRef}
      />
      <Tile
        color={tileOptions[3].color}
        id={tileOptions[3].id}
        sound={tileOptions[2].sound}
        onTilePress={() => playPause(tileOptions[3])}
        ref={yellowTileRef}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
  },
  playButton: {
    color: 'white',
    fontWeight: '800',
    fontSize: 32,
    backgroundColor: 'black',
    padding: 12,
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    left: 0,
    top: 0,
    opacity: 0.5,
    zIndex: 1,
    backgroundColor: 'white',
    width: windowWidth,
    height: windowHeight,
  },
});
export default Game;
