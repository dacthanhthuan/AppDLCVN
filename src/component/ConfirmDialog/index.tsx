import {Dialog} from '@rneui/themed';
import {useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import {Text} from 'react-native';
import styles from './styles';

type ConfirmDialogProps = {
  visible: boolean;
  question: string;
  acceptText: string;
  denyText: string;
  onAccept: () => void;
  onDeny: () => void;
};

export default function ConfirmDialog({
  visible,
  question,
  acceptText = 'Xác nhận',
  denyText = 'Huỷ bỏ',
  onAccept,
  onDeny,
}: ConfirmDialogProps) {
  const [appear, setAppear] = useState(visible);

  // set appear whenver visible change
  useEffect(() => {
    setAppear(visible);
  }, [visible]);

  const handleAccept = () => {
    onAccept ? onAccept() : null;
    setAppear(!visible);
  };

  const handleDeny = () => {
    onDeny ? onDeny() : null;
    setAppear(!visible);
  };

  return (
    <Dialog isVisible={appear} overlayStyle={styles.container}>
      <Text style={styles.title} children={question} />
      <View style={styles.buttonContainer}>
        <Dialog.Actions>
          <Dialog.Button title={denyText} onPress={handleDeny} hitSlop={10} />
        </Dialog.Actions>
        <Dialog.Actions>
          <Dialog.Button
            title={acceptText}
            onPress={handleAccept}
            hitSlop={10}
          />
        </Dialog.Actions>
      </View>
    </Dialog>
  );
}
