import React, {useEffect} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {ITile} from '../../types';

const Tile = React.forwardRef((props: ITile, ref) => {
  return (
    <TouchableOpacity
      ref={ref}
      onPress={props.onTilePress}
      style={[{backgroundColor: props.color}, styles.container]}
    />
  );
});

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
  },
});
export default Tile;
