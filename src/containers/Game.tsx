import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Tile, {TileHandle} from '../components/Tile/Tile';
import {
  defaultTileOptions,
  NEXT_ROUND_DELAY_TIME,
} from '../constants/constants';
import {ITile} from '../types';
import {getRandomNumber} from '../utils/getRandomNumber';
import sleep from '../utils/sleep';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Game = () => {
  const [startGame, setStartGame] = useState(false);
  const [tileOptions, setTileOptions] = useState(defaultTileOptions);
  const [playCounter, setPlayCounter] = useState(0);
  const [sequences, setSequence] = useState([
    getRandomNumber(tileOptions.length - 1),
  ]);

  const redTileRef = useRef<TileHandle>();
  const greenTileRef = useRef<TileHandle>();
  const blueTileRef = useRef<TileHandle>();
  const yellowTileRef = useRef<TileHandle>();

  // loops over sequences and plays the sounds
  const playSequence = async () => {
    for (let i = 0; i < sequences.length; i++) {
      const index = sequences[i];
      setTileOptions(prevState => {
        prevState[index].active = true;
        return [...prevState];
      });
      playPause(tileOptions[index]);
      await sleep(200);
      setTileOptions(prevState => {
        prevState[index].active = false;
        return [...prevState];
      });
    }
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
      console.log(sequences);
    }
  }, [sequences, startGame]);

  const handleTilePress = async tile => {
    // play the sound
    playPause(tile);
    const tileIndex = tileOptions.findIndex(t => t.id === tile.id);
    // check if pressed the correct tile
    if (!(tileIndex === sequences[playCounter])) {
      Alert.alert('Wrong tile Pressed');
      return;
    }
    // if done
    if (playCounter === sequences.length - 1) {
      await sleep(NEXT_ROUND_DELAY_TIME);
      setSequence([...sequences, getRandomNumber(tileOptions.length - 1)]);
      setPlayCounter(0);
    } else {
      setPlayCounter(prevCounter => (prevCounter += 1));
    }
  };

  return (
    <View style={styles.container}>
      {!startGame && (
        <View style={styles.overlay}>
          <TouchableOpacity onPress={handleGameStart}>
            <Text style={styles.playButton}>Play</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.tileContainer}>
        <Tile
          color={tileOptions[0].color}
          id={tileOptions[0].id}
          sound={tileOptions[0].sound}
          active={tileOptions[0].active}
          onTilePress={() => handleTilePress(tileOptions[0])}
          ref={redTileRef}
        />
        <Tile
          color={tileOptions[1].color}
          id={tileOptions[1].id}
          sound={tileOptions[1].sound}
          active={tileOptions[1].active}
          onTilePress={() => handleTilePress(tileOptions[1])}
          ref={blueTileRef}
        />
        <Tile
          color={tileOptions[2].color}
          id={tileOptions[2].id}
          sound={tileOptions[2].sound}
          active={tileOptions[2].active}
          onTilePress={() => handleTilePress(tileOptions[2])}
          ref={greenTileRef}
        />
        <Tile
          color={tileOptions[3].color}
          id={tileOptions[3].id}
          sound={tileOptions[3].sound}
          active={tileOptions[3].active}
          onTilePress={() => handleTilePress(tileOptions[3])}
          ref={yellowTileRef}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
  },
  tileContainer: {
    width: 140,
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
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
