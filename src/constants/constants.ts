import Sound from 'react-native-sound';
import {ITile} from '../types';

Sound.setCategory('Playback');
export const loadSound = (sound: any) => {
  return new Sound(sound, Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    console.log('loaded', sound);
  });
};
export const RED = 'RED';
export const BLUE = 'BLUE';
export const GREEN = 'GREEM';
export const YELLOW = 'YELLOW';

export const tileOptions: ITile[] = [
  {
    id: RED,
    color: '#ff0000',
    sound: loadSound('red.mp3'),
    onTilePress: (): void => {},
  },
  {
    id: BLUE,
    color: '#0000FF',
    sound: loadSound('blue.mp3'),
    onTilePress: (): void => {},
  },
  {
    id: GREEN,
    color: '#008000',
    sound: loadSound('green.mp3'),
    onTilePress: (): void => {},
  },
  {
    id: YELLOW,
    color: '#ffff00',
    sound: loadSound('yellow.mp3'),
    onTilePress: (): void => {},
  },
];
