import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import Tiles from '../components/Tile/Tiles';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Game = () => {
  const [startGame, setStartGame] = useState(false);
  const [score, setScore] = useState(0);
  return (
    <View style={styles.container}>
      {!startGame && (
        <View style={styles.overlay}>
          <TouchableOpacity onPress={() => setStartGame(true)}>
            <Text style={styles.playButton}>Play</Text>
          </TouchableOpacity>
        </View>
      )}
      <View>
        <Text style={styles.score}>Score: {score}</Text>
      </View>
      <Tiles startGame={startGame} setScore={setScore} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  score: {
    color: 'white',
    fontSize: 22,
  },
  playButton: {
    color: 'white',
    fontWeight: '800',
    fontSize: 32,
    backgroundColor: 'black',
    padding: 12,
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    left: 0,
    top: 0,
    opacity: 0.5,
    zIndex: 1,
    backgroundColor: 'white',
    width: windowWidth,
    height: windowHeight,
  },
});
export default Game;
