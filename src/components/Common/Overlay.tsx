import React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';
import {COLOR_WHITE} from '../../constants/constants';

export const Overlay: React.FC<ViewProps> = ({
  style,
  children,
  ...props
}): JSX.Element => {
  return (
    <View style={[styles.overlay, style]} {...props}>
      {children}
    </View>
  );
};
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    top: 0,
    opacity: 0.7,
    zIndex: 1,
    backgroundColor: COLOR_WHITE,
    width: '100%',
    height: '100%',
  },
});
