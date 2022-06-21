import React from 'react';
import {TouchableOpacity, StyleSheet, ViewStyle, View} from 'react-native';
import {ITile} from '../../types';

interface TileProps {
  tile: ITile;
  disabled: boolean;
  onTilePress: () => void;
}

// TODO:  ACTIVE PROPS HIGHLIGHT THE TILE AND HIGHOFF THE TILE
const Tile = React.forwardRef<React.Ref<TouchableOpacity>, TileProps>(
  (
    {tile: {active, color, position}, onTilePress, disabled},
    ref,
  ): JSX.Element => {
    console.log(active);
    return (
      <TouchableOpacity
        ref={() => ref}
        disabled={disabled}
        onPress={onTilePress}>
        <View
          style={[
            {backgroundColor: color},
            styles.container,
            styles[position],
            active ? styles.active : styles.inActive,
          ]}
        />
      </TouchableOpacity>
    );
  },
);

const styles: Record<string, ViewStyle> = StyleSheet.create({
  container: {
    width: 120,
    height: 120,
    opacity: 0.5,
    margin: 4,
  },
  active: {
    borderWidth: 3,
    borderColor: 'white',
    opacity: 1,
  },
  inActive: {
    opacity: 0.5,
  },
  topRight: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 320,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  topLeft: {
    borderTopLeftRadius: 320,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  bottomRight: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 320,
  },
  bottomLeft: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 320,
    borderBottomRightRadius: 20,
  },
});
export default Tile;
