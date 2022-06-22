import React, {useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../Routes';
import {RouteProp} from '@react-navigation/native';
import {ResultsModal} from '../../components/ResultsModal/ResultsModal';
import {useDispatch, useSelector} from 'react-redux';
import {IAppState, IScore} from '../../Redux/types';
import {ScoreList} from '../../components/Score/ScoreList';
import {setScore} from '../../Redux/Actions/scoreActions';
import {CustomButton} from '../../components/Common/CustomButton';

type ResultScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Results'
>;

interface ResultsProps {
  navigation: ResultScreenNavigationProp;
  route: RouteProp<RootStackParamList, 'Results'>;
}
export const Results: React.FC<ResultsProps> = ({
  navigation,
  route,
}): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const dispatch = useDispatch();
  const scoreboard = useSelector<IAppState, IScore[]>(
    state => state.scoreboard,
  );
  const {score} = route.params;
  const playAgain = (): void => {
    navigation.replace('Game');
  };

  const onNameConfirm = (name: string): void => {
    dispatch(setScore(score, name));
    setIsModalOpen(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Scoreboard</Text>
      <ScoreList scores={scoreboard} />
      <CustomButton
        style={styles.playAgainBtn}
        text="Play Again"
        onPress={playAgain}
        position="bottom"
      />
      <ResultsModal
        onNameConfirm={onNameConfirm}
        score={score}
        visible={isModalOpen}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  playAgainBtn: {
    width: '90%',
    marginBottom: 20,
  },
});
