import React, {useCallback, useEffect, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import Sound from 'react-native-sound';
import {
  BLUE,
  GREEN,
  loadSound,
  NEXT_ROUND_DELAY_TIME,
  RED,
  SONG_DELAY_TIME,
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
    position: 'topLeft',
  },
  {
    id: BLUE,
    color: '#0000FF',
    sound: loadSound('blue.mp3'),
    active: false,
    position: 'topRight',
  },
  {
    id: GREEN,
    color: '#008000',
    sound: loadSound('green.mp3'),
    active: false,
    position: 'bottomLeft',
  },
  {
    id: YELLOW,
    color: '#ffff00',
    sound: loadSound('yellow.mp3'),
    active: false,
    position: 'bottomRight',
  },
];
interface TileProps {
  startGame: boolean;
  setScore: (score: number) => void;
}
const Tiles: React.FC<TileProps> = ({startGame, setScore}): JSX.Element => {
  const [isSimonPlaying, setIsSimonPlaying] = useState<boolean>(false);
  const [tileOptions, setTileOptions] = useState<ITile[]>(defaultTileOptions);
  const [playCounter, setPlayCounter] = useState<number>(0);
  const [sequences, setSequence] = useState<number[]>([
    getRandomNumber(tileOptions.length - 1),
  ]);

  const playSound = useCallback((sound: Sound): void => {
    // stoping to play mutiple in a row withouth wating for sound to end
    sound.stop();
    sound.play(success => {
      if (!success) console.log('playback failed due to audio decoding errors');
    });
  }, []);

  const playTile = async (index: number): Promise<void> => {
    setTileOptions(prevState => {
      prevState[index].active = true;
      return [...prevState];
    });
    await sleep(SONG_DELAY_TIME);
    playSound(tileOptions[index].sound);
    await sleep(SONG_DELAY_TIME);
    setTileOptions(prevState => {
      prevState[index].active = false;
      return [...prevState];
    });
  };
  // loops over sequences and plays the sounds
  const playSequence = async (): Promise<void> => {
    setIsSimonPlaying(true);
    for (let i = 0; i < sequences.length; i++) {
      const index = sequences[i];
      await playTile(index);
    }
    setIsSimonPlaying(false);
  };

  const handleTilePress = async (tile: ITile) => {
    // play the sound

    const tileIndex = tileOptions.findIndex(t => t.id === tile.id);
    playTile(tileIndex);
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
  };

  useEffect(() => {
    // load sounds for first time

    if (startGame) {
      playSequence();
      setScore(sequences.length - 1);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sequences, startGame]);
  useEffect(() => {
    return () => {
      // sounds cleanup
      tileOptions.forEach(tileOption => {
        tileOption.sound.release();
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
    width: 260,
    height: 260,
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    display: 'flex',
    alignContent: 'center',
  },
});

export default Tiles;
