import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {
  COLOR_WHITE,
  ROUTE_GAME,
  ROUTE_RESULTS,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from '../constants/constants';
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
          backgroundColor: COLOR_WHITE,
          width: WINDOW_WIDTH,
          height: WINDOW_HEIGHT,
          alignSelf: 'center',
        },
      }}
      initialRouteName={ROUTE_GAME}>
      <Stack.Screen name={ROUTE_GAME} component={Game} />
      <Stack.Screen name={ROUTE_RESULTS} component={Results} />
    </Stack.Navigator>
  );
};
