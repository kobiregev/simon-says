import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IScore} from '../../Redux/types';

interface ScoreItemProps {
  score: IScore;
}

export const ScoreItem: React.FC<ScoreItemProps> = ({
  score: {name, score},
}): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text>{name}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text>{score}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 40,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
