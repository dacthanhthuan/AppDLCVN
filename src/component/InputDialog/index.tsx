import {Dialog} from '@rneui/themed';
import {memo, useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import styles from './styles';
import Text_Input from '../TextInput';

type InputOverlayProps = {
  onAccept?: (text: string) => void;
  onDeny?: () => void;
  visible: boolean;
  title?: string;
  inputPlaceholder?: string;
  inputValue?: string;
};

function InputOverlay({
  inputPlaceholder,
  onAccept,
  onDeny,
  title,
  inputValue,
  visible,
}: InputOverlayProps) {
  const [text, setText] = useState(inputValue ? inputValue : '');
  const [error, setError] = useState('');

  // handle accept button
  const handleOnAccept = () => {
    if (text!.length > 0) {
      onAccept ? onAccept(text!) : null;
      setError('');
    } else {
      setError('Vui lòng nhập mật khẩu');
    }
  };

  // handle deny button
  const handleOnDeny = () => {
    setError('');
    onDeny ? onDeny() : null;
  };

  return (
    <Dialog
      isVisible={visible}
      overlayStyle={styles.overlayStyle}
      animationType="fade"
      onBackdropPress={handleOnDeny}>
      <Dialog.Title title={title} titleStyle={styles.titleStyle} />

      <Text_Input
        placeholder={inputPlaceholder}
        placeholderTextColor={'grey'}
        onChangetext={setText}
        value={text}
        inputStyle={styles.inputStyle}
        focus={visible}
        secure={true}
        onSubmitEditing={undefined}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.buttonContainer}>
        <Dialog.Actions>
          <Dialog.Button radius={20} onPress={handleOnDeny}>
            Từ chối
          </Dialog.Button>
        </Dialog.Actions>
        <Dialog.Actions>
          <Dialog.Button radius={20} onPress={handleOnAccept}>
            Xác nhận
          </Dialog.Button>
        </Dialog.Actions>
      </View>
    </Dialog>
  );
}

export default memo(InputOverlay);
