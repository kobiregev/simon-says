import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';

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
    console.log('first');
    if (!name.trim()) return;
    onNameConfirm(name);
  };
  return (
    <Modal visible={visible}>
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
        <TouchableOpacity style={styles.button} onPress={handleConfirm}>
          <Text style={[styles.buttonText, styles.centerText]}>Confirm</Text>
        </TouchableOpacity>
        {/* <Button color="#817ffe" title="Confirm" /> */}
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  centerText: {
    textAlign: 'center',
  },
  input: {
    height: 40,
    marginVertical: 8,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    // width: '25%',
    backgroundColor: '#817ffe',
    padding: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  actionContainer: {
    flexDirection: 'column',
    alignSelf: 'center',
    width: '90%',
  },
});
