import Sound from 'react-native-sound';

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

export const SONG_DELAY_TIME: number = 200;
export const NEXT_ROUND_DELAY_TIME: number = 300;
