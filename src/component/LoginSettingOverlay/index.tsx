import {CheckBox, Dialog} from '@rneui/themed';
import style from './style';
import {useEffect, useState} from 'react';
import {getData, multiRemoveData, storeData} from '../../storage';
import {LOCALSTORAGE} from '../../storage/direct';
import {BIOMETRIC} from '../../global';
import PasswordConfirmOverlay from '../PasswordConfirmOverlay';
import {ToastAndroid} from 'react-native';
import {Linking} from 'react-native';

type LoadingOverlayProps = {
  visible: boolean;
  onBackdropPress: () => void;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function LoginSettingOverlay({
  visible = true,
  onBackdropPress: backdropPress,
  onConfirm,
  onCancel,
}: LoadingOverlayProps) {
  // state of checkbox (current option)
  const [checkbox, setCheckbox] = useState(false);
  // state show or hide PasswordConfirmOverlay
  const [togglePwConfirm, setTogglePwConfirm] = useState(false);

  // change PasswordConfirmOverlay visible state
  const togglePasswordConfirm = () => {
    setTogglePwConfirm(!togglePwConfirm);
  };

  // update checkbox whenever visible state change
  useEffect(() => {
    // get login option from local storage and set to checkbox
    getData(LOCALSTORAGE.biometric_login_option)
      .then(res => {
        res = res === 'true' ? true : false;
        setCheckbox(res);
      })
      .catch(err => {});
  }, [visible]);

  // handler whenever Confirm button is pressed
  async function onConfirmHandler() {
    try {
      // get user login option
      let login_option = await getData(LOCALSTORAGE.biometric_login_option);

      // check user login option vs current option, if they different, ask user verification password
      // otherwise, run onConfirm() function
      if (login_option !== checkbox.toString()) {
        setTogglePwConfirm(true);
      } else {
        onConfirm();
      }
    } catch (error: any) {
      throw new Error(error!);
    }
  }

  // confirm biometric of user
  const biometricConfirm = async (password: string) => {
    // local side verification
    await BIOMETRIC.simplePrompt({
      promptMessage: 'Xác nhận vân tay người dùng',
      cancelButtonText: 'Huỷ',
    })
      .then(async res => {
        // if user verification success
        if (res.success) {
          // if user want to active biometric login
          if (checkbox) {
            // check key is existed or not
            const {keysExist} = await BIOMETRIC.biometricKeysExist();
            if (!keysExist) {
              const {publicKey} = await BIOMETRIC.createKeys();
              storeData(LOCALSTORAGE.publickey, publicKey);
            }
            const user = await getData(LOCALSTORAGE.user);
            // store biometric login data and option
            storeData(LOCALSTORAGE.biometric_login_option, checkbox.toString());
            storeData(LOCALSTORAGE.biometric_login_data, {
              mobile: user.mobile,
              password: password,
            });
          }
          // otherwise, user want to unactive biometric login
          else {
            // remove biometric login data and option
            await multiRemoveData([
              LOCALSTORAGE.biometric_login_data,
              LOCALSTORAGE.biometric_login_option,
            ]);
          }
        }
      })
      .catch(err => {
        ToastAndroid.show(
          err.message + ', Vui lòng đăng ký vân tay và thử lại',
          ToastAndroid.LONG,
        );
        Linking.sendIntent('android.settings.SECURITY_SETTINGS')
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .finally(() => {
        onConfirm();
      });
  };

  return (
    <Dialog
      isVisible={visible}
      onBackdropPress={backdropPress}
      overlayStyle={style.container}>
      <Dialog.Title title="Tuỳ chọn đăng nhập" titleStyle={style.dialogTitle} />
      <CheckBox
        checked={checkbox}
        onPress={() => setCheckbox(!checkbox)}
        title={'Sử dụng vân tay để đăng nhập'}
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        size={30}
        textStyle={style.dialogText}
        wrapperStyle={style.checkboxContainer}
      />
      <PasswordConfirmOverlay
        visible={togglePwConfirm}
        onBackdropPress={togglePasswordConfirm}
        onCancel={togglePasswordConfirm}
        onConfirm={password => {
          // if user verify password success, ask user verify biometric
          biometricConfirm(password);
        }}
      />
      <Dialog.Actions>
        <Dialog.Button title="Xác nhận" onPress={onConfirmHandler} />
        <Dialog.Button title="Huỷ" onPress={onCancel} />
      </Dialog.Actions>
    </Dialog>
  );
}