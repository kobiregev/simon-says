import React, {useState} from 'react';
import {Button, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/Routes';
import {RouteProp} from '@react-navigation/native';
import {ResultsModal} from '../components/ResultsModal/ResultsModal';

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
  const {score} = route.params;

  const playAgain = (): void => {
    navigation.replace('Game');
  };

  const onNameConfirm = (name: string): void => {
    console.log(name);
    setIsModalOpen(false);
  };
  //   useEffect(() => {});
  return (
    <SafeAreaView>
      <Text>Results Screen</Text>
      <Text>Your Score Is : {score}</Text>
      <Button title="Play Again" onPress={playAgain} />
      <ResultsModal
        onNameConfirm={onNameConfirm}
        score={score}
        visible={isModalOpen}
      />
    </SafeAreaView>
  );
};
