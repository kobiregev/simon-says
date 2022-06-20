import Sound from 'react-native-sound';

// Tile Props interface
export interface ITile {
  id: string;
  color: string;
  sound: Sound;
  onTilePress: () => void;
}
