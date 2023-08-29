import {SafeAreaView, ScrollView, Text, ToastAndroid, View} from 'react-native';
import styles from './styles';
import BankCard from '../../component/BankCard';
import Header from '../../component/Header';
import {useDispatch, useSelector} from 'react-redux';
import BankInput from '../../component/BankInput';
import Button from '../../component/Button';
import {useNavigation} from '@react-navigation/native';
import BankChoosen from '../../component/BankChoosen';
import api_get_bank_list from '../../api/api_get_bank_list';
import {useEffect, useState} from 'react';
import {WalletAddBankInfor} from '../../redux/actions/walletActions';
import InputDialog from '../../component/InputDialog';
import {riseNormalError} from '../../redux/actions/errorHandlerActions';
import {
  NotificationActions,
  useNotificationDispatch,
} from '../../component/NotificationContext/context';
import {NotificationType} from '../../component/NotificationContext/types';
import {clientGetDetailUserStart} from '../../redux/actions/userActions';
import LoadingOverlay from '../../component/LoadingOverlay';
import {getData} from '../../storage';
import {LOCALSTORAGE} from '../../storage/direct';
import {BIOMETRIC} from '../../global';

export default function BankAccount() {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const notification = useNotificationDispatch();

  const user = useSelector((state: any) => state.user);
  const session_token = useSelector((state: any) => state.user.session_token);
  const addBankInforLoading = useSelector(
    (state: any) => state.wallet.addBankInforLoading,
  );
  const walletMsg = useSelector((state: any) => state.wallet.message);

  const [banks, setBanks] = useState<any[]>([]);
  const [chooseBank, setChooseBank] = useState<any>(undefined);
  const [bankAccount, setBankAccount] = useState(user?.bank_account);
  const [bankFullName, setBankFullName] = useState(user?.bank_fullname);
  const [bankBranch, setBankBranch] = useState(user?.bank_branch);
  const [bankCity, setBankCity] = useState(user?.bank_city);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [error, setError] = useState(''); // error state
  const [pressed, setPressed] = useState(false); // accept pressed
  const [biometricLogin, setBiometricLogin] = useState(false); // biometric login option

  // get bank list api
  const getBankListApi = async () => {
    const form = new FormData();
    form.append('token', session_token);

    const res = await api_get_bank_list(form);

    setBanks(res.l);
  };

  // check biometric login option
  const checkBiometricLogin = async () => {
    const loginOption = await getData(LOCALSTORAGE.biometric_login_option);
    if (!loginOption) {
      setBiometricLogin(false);
    } else {
      setBiometricLogin(true);
    }
  };

  // initial rendered: get bank list data
  useEffect(() => {
    getBankListApi();
    checkBiometricLogin();
  }, []);

  // handle biometric verification
  const biometricVerify = () => {
    BIOMETRIC.simplePrompt({
      promptMessage: 'Xác nhận vân tay của bạn',
      cancelButtonText: 'Huỷ',
      fallbackPromptMessage: 'Xác nhận không thành công',
    })
      .then(async res => {
        if (res.success) {
          const {password} = await getData(LOCALSTORAGE.biometric_login_data);
          handleAcceptPassword(password);
        } else {
          ToastAndroid.show(
            'Xác thực vân tay không thành công',
            ToastAndroid.LONG,
          );
        }
      })
      .catch(err => {
        ToastAndroid.show(err.message, ToastAndroid.LONG);
      });
  };

  // handle continue button
  const handleContinue = () => {
    if (!user?.bank_name && !chooseBank) {
      setError('Vui lòng chọn ngân hàng');
    } else if (!bankFullName) {
      setError('Vui lòng nhập họ và tên chủ thẻ');
    } else if (!bankAccount) {
      setError('Vui lòng nhập mã thẻ');
    } else {
      setError('');
      if (!biometricLogin) setDialogVisible(true);
      else biometricVerify();
    }
  };

  // handle password confirm button
  const handleAcceptPassword = (text: string) => {
    setDialogVisible(false);
    dispatch(
      WalletAddBankInfor.start({
        token: session_token,
        bank_name: chooseBank
          ? `${chooseBank.short} - ${chooseBank.name}`
          : user?.bank_name,
        bank_account: bankAccount,
        bank_fullname: bankFullName,
        bank_branch: bankBranch,
        bank_city: bankCity,
        password: text,
      }),
    );

    setPressed(true);
  };

  // handle password deny button
  const handleDenyPassword = () => {
    setDialogVisible(false);
  };

  // when addbank action is done
  useEffect(() => {
    if (!addBankInforLoading && pressed) {
      setPressed(false);

      if (!walletMsg) {
        // display notification
        notification(
          NotificationActions.rise({
            data: {
              message: 'Cập nhật tài khoản ngân hàng thành công',
            },
            duration: 3000,
            type: NotificationType.NORMAL,
          }),
        );

        // reload user information
        dispatch(clientGetDetailUserStart(session_token));
      } else {
        // display error
        dispatch(
          riseNormalError({
            duration: 3000,
            message: 'Lỗi: ' + walletMsg,
          }),
        );
      }
    }
  }, [addBankInforLoading]);

  return (
    <SafeAreaView style={styles.container}>
      {addBankInforLoading ? <LoadingOverlay /> : null}
      <Header
        text={'Tài khoản ngân hàng'}
        iconLeft={require('../../assets/Arrow1.png')}
        onPressLeft={() => navigation.goBack()}
        containerStyle={{padding: 15}}
        iconRight={undefined}
        onPressRight={undefined}
        showCartBadge={undefined}
      />

      <ScrollView
        style={styles.scrollview}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentScrollview}>
        <BankCard
          bankName={
            chooseBank
              ? chooseBank.short.toUpperCase()
              : user?.bank_name?.split('-')[0].toUpperCase()
          }
          bankAccount={bankAccount ? bankAccount : user?.bank_account}
          userName={
            bankFullName
              ? bankFullName.toUpperCase()
              : user?.bank_fullname?.toUpperCase()
          }
        />

        <BankChoosen
          choose={user?.bank_name || 'Chọn ngân hàng'}
          data={banks}
          onChoose={item => {
            setChooseBank(item);
          }}
        />

        <BankInput
          label={'Họ và tên chủ thẻ:'}
          placeholder={'Nhập họ và tên chủ thẻ'}
          onChangeText={setBankFullName}
          value={bankFullName}
          upperCase
        />
        <BankInput
          label={'Mã thẻ:'}
          placeholder={'Nhập mã thẻ'}
          onChangeText={setBankAccount}
          maxLength={16}
          value={bankAccount}
        />
        <BankInput
          label={'Chi nhánh:'}
          placeholder={'Nhập chi nhánh ngân hàng'}
          onChangeText={setBankBranch}
          value={bankBranch}
        />
        <BankInput
          label={'Thành phố:'}
          placeholder={'Nhập thành phố'}
          onChangeText={setBankCity}
          value={bankCity}
        />

        {error ? <Text style={styles.errorText}>*{error}</Text> : null}

        <Button
          text={'Tiếp theo'}
          style={styles.button}
          onPress={handleContinue}
          styleText={undefined}
        />
      </ScrollView>

      <InputDialog
        visible={dialogVisible}
        title={'Xác nhận mật khẩu'}
        inputPlaceholder="Nhập mật khẩu"
        onDeny={handleDenyPassword}
        onAccept={handleAcceptPassword}
        secure={true}
      />
    </SafeAreaView>
  );
}
