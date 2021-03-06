import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Tiles from '../../components/Tile/Tiles';
import {CustomButton} from '../../components/Common/CustomButton';
import {RootStackParamList} from '../Routes';
import {COLOR_BLACK} from '../../constants/constants';
import {Overlay} from '../../components/Common/Overlay';

type GameScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Game'>;
interface GameProps {
  navigation: GameScreenNavigationProp;
}
const Game: React.FC<GameProps> = ({navigation}) => {
  const [startGame, setStartGame] = useState(false);
  const [score, setScore] = useState(0);
  const handleGameOver = (): void => {
    navigation.replace('Results', {score});
  };
  return (
    <View style={styles.container}>
      {!startGame && (
        <Overlay>
          <CustomButton
            textStyle={styles.playButton}
            text="Play"
            onPress={() => setStartGame(true)}
          />
        </Overlay>
      )}
      <View>
        <Text style={styles.score}>Score: {score}</Text>
      </View>
      <Tiles
        onGameOver={handleGameOver}
        startGame={startGame}
        setScore={setScore}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  score: {
    color: COLOR_BLACK,
    fontSize: 28,
    marginTop: 20,
  },
  playButton: {
    fontSize: 32,
  },
});
export default Game;
