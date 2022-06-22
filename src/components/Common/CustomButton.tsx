import React, {useCallback} from 'react';
import {
  TouchableOpacityProps,
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  StyleProp,
  TextStyle,
} from 'react-native';
import {GenericTouchableProps} from 'react-native-gesture-handler/lib/typescript/components/touchables/GenericTouchable';
import {COLOR_DISABLED, COLOR_PRIMARY} from '../../constants/constants';

type Position = 'top' | 'bottom';

interface CustomButtonProps {
  text?: string;
  textStyle?: StyleProp<TextStyle>;
  position?: Position;
}

export const CustomButton: React.FC<
  CustomButtonProps & TouchableOpacityProps & GenericTouchableProps
> = ({style, text, position, textStyle, disabled, ...props}): JSX.Element => {
  const getButtonPosition = useCallback((): ViewStyle | null => {
    if (!position) {
      return null;
    }

    return {
      position: 'absolute',
      [position]: 0,
      alignSelf: 'center',
    };
  }, [position]);
  return (
    <TouchableOpacity
      style={[
        styles.button,
        style,
        getButtonPosition(),
        disabled && styles.disabledButton,
      ]}
      {...props}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: COLOR_PRIMARY,
    padding: 10,
  },
  disabledButton: {
    backgroundColor: COLOR_DISABLED,
  },
  text: {
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
