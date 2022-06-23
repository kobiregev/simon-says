import React, {useCallback, useEffect, useMemo, useState, useRef} from 'react';
import {getRandomNumber, sleep, loadSound} from '../../utils';
import {StyleSheet, View} from 'react-native';
import Sound from 'react-native-sound';
import {
  BLUE,
  GREEN,
  RED,
  YELLOW,
  NEXT_ROUND_DELAY_TIME,
  SONG_DELAY_TIME,
} from '../../constants/constants';
import {ITile} from '../../types';
import Tile from './Tile';

interface TileProps {
  startGame: boolean;
  onGameOver: () => void;
  setScore: (score: number) => void;
}
const Tiles: React.FC<TileProps> = ({
  startGame,
  setScore,
  onGameOver,
}): JSX.Element => {
  const defaultTileOptions = useMemo<ITile[]>(
    () => [
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
    ],
    [],
  );
  const [isSimonPlaying, setIsSimonPlaying] = useState<boolean>(false);
  const [tileOptions, setTileOptions] = useState<ITile[]>(defaultTileOptions);
  const [playCounter, setPlayCounter] = useState<number>(0);
  const [sequences, setSequence] = useState<number[]>([
    getRandomNumber(tileOptions.length - 1),
  ]);
  const mounted = useRef(false);

  const playSound = useCallback((sound: Sound): void => {
    if (!mounted.current) {
      return;
    }
    // stoping to play mutiple in a row withouth wating for sound to end
    sound.stop();
    sound.play();
  }, []);

  const changeTileActivity = (index: number, active: boolean): void => {
    // only changing state if component is mounted to avoid memory leaks
    if (mounted.current) {
      setTileOptions(prevState => {
        prevState[index].active = active;
        return [...prevState];
      });
    }
  };

  // Responsible for Indacating presses and playing sound
  const playTile = async (index: number): Promise<void> => {
    changeTileActivity(index, true);
    await sleep(SONG_DELAY_TIME);
    playSound(tileOptions[index].sound);
    await sleep(SONG_DELAY_TIME);
    changeTileActivity(index, false);
  };

  // loops over sequences and plays the tiles
  const playSimonSequence = async (): Promise<void> => {
    setIsSimonPlaying(true);
    for (let i = 0; i < sequences.length; i++) {
      const index = sequences[i];
      await playTile(index);
    }
    setIsSimonPlaying(false);
  };

  const handleTilePress = async (tile: ITile) => {
    // Get the index of pressed tile by comparing ids
    const tileIndex = tileOptions.findIndex(t => t.id === tile.id);
    // Play the tile by index
    playTile(tileIndex);
    // check if pressed the correct tile
    if (tileIndex !== sequences[playCounter]) {
      onGameOver();
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
      playSimonSequence();
      setScore(sequences.length - 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sequences, startGame]);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      // sounds cleanup
      tileOptions.forEach(tileOption => {
        tileOption.sound.stop();
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
    alignContent: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
});

export default Tiles;
