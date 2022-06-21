import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {ITile} from '../../types';

interface TileProps {
  tile: ITile;
  disabled: boolean;
  onTilePress: () => void;
}

// TODO:  ACTIVE PROPS HIGHLIGHT THE TILE AND HIGHOFF THE TILE
const Tile: React.FC<TileProps> = ({
  tile: {active, color},
  onTilePress,
  disabled,
}): JSX.Element => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onTilePress}
      style={[
        {backgroundColor: color},
        styles.container,
        active ? styles.active : null,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: 70,
    height: 70,
  },
  active: {
    borderWidth: 1,
    borderColor: 'white',
    opacity: 0.5,
  },
});
export default Tile;
