import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Game from '../containers/Game';
import {Results} from '../containers/Results';
interface RoutesProps {}

export type RootStackParamList = {
  Game: undefined;
  Results: {score: number};
};

const Stack = createStackNavigator<RootStackParamList>();

export const Routes: React.FC<RoutesProps> = ({}): JSX.Element => {
  return (
    <Stack.Navigator
      screenOptions={{header: () => null}}
      initialRouteName="Game">
      <Stack.Screen name="Game" component={Game} />
      <Stack.Screen name="Results" component={Results} />
    </Stack.Navigator>
  );
};
