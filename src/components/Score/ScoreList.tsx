import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IScore} from '../../Redux/types';
import {ScoreItem} from './ScoreItem';
interface ScoreListProps {
  scores: IScore[];
}
export const ScoreList: React.FC<ScoreListProps> = ({scores}): JSX.Element => {
  return (
    <View>
      <View style={styles.scoreHeader}>
        <Text style={styles.header}>Name</Text>
        <Text style={styles.header}>Score</Text>
      </View>

      {scores.map((score, i) => {
        return <ScoreItem key={i} score={score} />;
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  scoreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    borderBottomWidth: 1,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
