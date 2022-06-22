import Sound from 'react-native-sound';
Sound.setCategory('Playback');

export const loadSound = (sound: any) => {
  return new Sound(sound, Sound.MAIN_BUNDLE);
};

// Generate random number with max value
export const getRandomNumber = (max: number = 1): number => {
  return Math.floor(Math.random() * max);
};

export const sleep = (ms: number = 0): Promise<void> => {
  let timeout: ReturnType<typeof setTimeout>;
  return new Promise<void>(
    resolve =>
      (timeout = setTimeout(() => {
        resolve();
      }, ms)),
  ).finally(() => {
    clearTimeout(timeout);
  });
};
