import React, {useState} from 'react';
import {Modal, StyleSheet, Text, TextInput, View} from 'react-native';
import {
  COLOR_BLACK,
  COLOR_PRIMARY,
  COLOR_WHITE,
} from '../../constants/constants';
import {CustomButton} from '../Common/CustomButton';

interface ResultsModalProps {
  score: number;
  visible: boolean;
  onNameConfirm: (name: string) => void;
}

export const ResultsModal: React.FC<ResultsModalProps> = ({
  score,
  visible,
  onNameConfirm,
}): JSX.Element => {
  const [name, setName] = useState('');
  const handleConfirm = (): void => {
    onNameConfirm(name);
  };
  const isInputInvalid: boolean = !name.trim();
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <View>
          <Text style={styles.centerText}>
            Congratulations Your Score is : {score}
          </Text>
          <Text style={styles.centerText}>Please Enter Your Name</Text>
        </View>
        <View style={styles.actionContainer}>
          <TextInput
            autoComplete="name"
            style={styles.input}
            placeholder="Name"
            onChangeText={text => setName(text)}
            value={name}
          />
          <CustomButton
            style={[styles.button]}
            onPress={handleConfirm}
            disabled={isInputInvalid}
            text="Confirm"
          />
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerText: {
    textAlign: 'center',
    color: COLOR_BLACK,
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    marginVertical: 8,
    borderWidth: 1,
    padding: 10,
    color: COLOR_BLACK,
  },
  button: {
    backgroundColor: COLOR_PRIMARY,
    marginVertical: 4,
    padding: 10,
  },

  buttonText: {
    color: COLOR_WHITE,
    fontWeight: 'bold',
    fontSize: 16,
  },
  actionContainer: {
    flexDirection: 'column',
    alignSelf: 'center',
    marginVertical: 10,
    width: '90%',
  },
});
