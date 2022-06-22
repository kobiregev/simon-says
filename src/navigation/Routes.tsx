import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../constants/constants';
import Game from './GameRoute/Game';
import {Results} from './ResultRoute/Results';
interface RoutesProps {}

export type RootStackParamList = {
  Game: undefined;
  Results: {score: number};
};

const Stack = createStackNavigator<RootStackParamList>();

export const Routes: React.FC<RoutesProps> = ({}): JSX.Element => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
        cardStyle: {
          backgroundColor: '#ffffff',
          width: WINDOW_WIDTH,
          height: WINDOW_HEIGHT,
          alignSelf: 'center',
        },
      }}
      initialRouteName="Game">
      <Stack.Screen name="Game" component={Game} />
      <Stack.Screen name="Results" component={Results} />
    </Stack.Navigator>
  );
};
