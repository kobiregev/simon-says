import React, {useCallback, useEffect, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import Sound from 'react-native-sound';
import {
  BLUE,
  GREEN,
  loadSound,
  NEXT_ROUND_DELAY_TIME,
  RED,
  YELLOW,
} from '../../constants/constants';
import {ITile} from '../../types';
import {getRandomNumber} from '../../utils/getRandomNumber';
import sleep from '../../utils/sleep';
import Tile from './Tile';

const defaultTileOptions: ITile[] = [
  {
    id: RED,
    color: '#ff0000',
    sound: loadSound('red.mp3'),
    active: false,
  },
  {
    id: BLUE,
    color: '#0000FF',
    sound: loadSound('blue.mp3'),
    active: false,
  },
  {
    id: GREEN,
    color: '#008000',
    sound: loadSound('green.mp3'),
    active: false,
  },
  {
    id: YELLOW,
    color: '#ffff00',
    sound: loadSound('yellow.mp3'),
    active: false,
  },
];
interface TileProps {
  startGame: boolean;
  setScore: (score: number) => void;
}
const Tiles: React.FC<TileProps> = ({startGame, setScore}): JSX.Element => {
  const [isSimonPlaying, setIsSimonPlaying] = useState(false);
  const [tileOptions, setTileOptions] = useState(defaultTileOptions);
  const [playCounter, setPlayCounter] = useState(0);
  const [sequences, setSequence] = useState([
    getRandomNumber(tileOptions.length - 1),
  ]);

  const playSound = useCallback((sound: Sound): void => {
    // stoping to play mutiple in a row withouth wating for sound to end
    sound.stop();
    sound.play(success => {
      if (!success) console.log('playback failed due to audio decoding errors');
    });
  }, []);

  // loops over sequences and plays the sounds
  const playSequence = useCallback(async (): Promise<void> => {
    setIsSimonPlaying(true);
    for (let i = 0; i < sequences.length; i++) {
      const index = sequences[i];
      setTileOptions(prevState => {
        prevState[index].active = true;
        return [...prevState];
      });

      await sleep(200);
      playSound(tileOptions[index].sound);
      await sleep(200);

      setTileOptions(prevState => {
        prevState[index].active = false;
        return [...prevState];
      });
    }
    setIsSimonPlaying(false);
  }, [playSound, sequences, tileOptions]);

  const handleTilePress = useCallback(
    async (tile: ITile) => {
      // play the sound
      playSound(tile.sound);
      const tileIndex = tileOptions.findIndex(t => t.id === tile.id);
      // check if pressed the correct tile
      if (
        tileIndex !== sequences[playCounter] ||
        playCounter === sequences.length
      ) {
        Alert.alert('Wrong tile Pressed');
        return;
      }
      // if done
      if (playCounter === sequences.length - 1) {
        setIsSimonPlaying(true);
        await sleep(NEXT_ROUND_DELAY_TIME);
        setSequence([...sequences, getRandomNumber(tileOptions.length - 1)]);
        setPlayCounter(0);
      } else {
        setPlayCounter(prevCounter => prevCounter + 1);
      }
    },
    [playCounter, playSound, sequences, tileOptions],
  );

  useEffect(() => {
    // load sounds for first time
    if (startGame) {
      playSequence();
      setScore(sequences.length - 1);
      console.log(sequences);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sequences, startGame]);

  return (
    <View style={styles.tileContainer}>
      {tileOptions.map(tile => {
        return (
          <Tile
            onTilePress={() => handleTilePress(tile)}
            key={tile.id}
            tile={tile}
            disabled={isSimonPlaying}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tileContainer: {
    width: 140,
    height: 140,
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    display: 'flex',
    alignContent: 'center',
  },
});

export default Tiles;
