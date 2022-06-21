import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {ITile} from '../../types';

export type TileHandle = {
  onPress: () => void;
};

// TODO:  ACTIVE PROPS HIGHLIGHT THE TILE AND HIGHOFF THE TILE
const Tile = React.forwardRef<TileHandle, ITile>((props, ref) => {
  return (
    <TouchableOpacity
      ref={ref}
      onPress={props.onTilePress}
      style={[
        {backgroundColor: props.color},
        styles.container,
        props.active ? styles.active : null,
      ]}
    />
  );
});

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
