import {Text} from 'react-native';
import {Dialog} from '@rneui/themed';
import style from './style';
import {useEffect, useState} from 'react';
import {getData} from '../../storage';
import {LOCALSTORAGE} from '../../storage/direct';
import baseURL, {getUrl} from '../../api/baseURL';
import apiHelper, {NETWORK} from '../../api/apiHelper';
import LoadingOverlay from '../LoadingOverlay';
import Text_Input from '../TextInput';

type PasswordConfirmOverlayProps = {
  visible: boolean;
  onBackdropPress: () => void;
  onConfirm: (password: string) => void;
  onCancel: () => void;
};

export default function PasswordConfirmOverlay({
  visible,
  onBackdropPress,
  onConfirm,
  onCancel,
}: PasswordConfirmOverlayProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [confirming, setConfirming] = useState(false);

  // clear error whenever visibble change
  useEffect(() => {
    setError('');
  }, [visible]);

  // when user confirm password
  const onConfirmHandler = async () => {
    setConfirming(true);
    const success = await handlerConfirmPassword(password);
    // if password is correct invoked onConfirm
    if (success) {
      onConfirm!(password);
      onBackdropPress();
    }
  };

  // confirm password with api
  const handlerConfirmPassword = async (password: string) => {
    try {
      let success = false;
      await getUrl(baseURL.login_url).then(async url => {
        const user = await getData(LOCALSTORAGE.user);
        const formData = new FormData();
        formData.append('username', user.mobile);
        formData.append('password', password);

        await apiHelper(url, formData).then(respone => {
          if (respone?.code === NETWORK.SUCCESS) {
            success = true;
            setError('');
          } else {
            setError('Xác nhận mật khẩu sai');
          }
        });
      });
      setConfirming(false);
      return success;
    } catch (error) {
      throw new Error(
        'LoginSettingOverlay - handlerConfirmPassword error: ' + error,
      );
    }
  };

  return (
    <Dialog
      isVisible={visible}
      onBackdropPress={onBackdropPress}
      overlayStyle={style.container}>
      <LoadingOverlay visible={confirming}></LoadingOverlay>
      <Dialog.Title
        title="Xác nhận mật khẩu người dùng"
        titleStyle={style.dialogTitle}
      />
      <Text_Input
        inputStyle={style.inputPasswordConfirm}
        placeholder="Nhập mật khẩu"
        placeholderTextColor={'black'}
        onChangetext={setPassword}
        secure={true}
        onSubmitEditing={onConfirmHandler}
        value={undefined}
      />
      {error ? <Text children={error} style={style.confirmError} /> : null}
      <Dialog.Actions>
        <Dialog.Button title="Xác nhận" onPress={onConfirmHandler} />
        <Dialog.Button title="Huỷ" onPress={onCancel} />
      </Dialog.Actions>
    </Dialog>
  );
}
