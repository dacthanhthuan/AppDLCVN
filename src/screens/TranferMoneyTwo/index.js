import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text, Image, ToastAndroid} from 'react-native';
import styles from './style';
import Header from '../../component/Header';
import Button from '../../component/Button';
import CardSurplus from '../../component/CardSurplus';
import TextViewRow from '../../component/TextViewRow';
import {BIOMETRIC, formatPoint, formatPrice} from '../../global';
import {useDispatch, useSelector} from 'react-redux';
import {WalletTransfer} from '../../redux/actions/walletActions';
import InputDialog from '../../component/InputDialog';
import {riseNormalError} from '../../redux/actions/errorHandlerActions';
import {
  NotificationActions,
  useNotificationDispatch,
} from '../../component/NotificationContext/context';
import {NotificationType} from '../../component/NotificationContext/types';
import LoadingOverlay from '../../component/LoadingOverlay';
import {StackActions} from '@react-navigation/native';
import {clientGetDetailUserStart} from '../../redux/actions/userActions';
import {getData} from '../../storage';
import {LOCALSTORAGE} from '../../storage/direct';

const TranferMoneyTwo = ({navigation, route}) => {
  const {amount, note, selectUser, wallet_id} = route.params;

  const dispatch = useDispatch();
  const notification = useNotificationDispatch();

  const lWallet = useSelector(state => state.user.lWallet);
  const session_token = useSelector(state => state.user.session_token);
  const transferLoading = useSelector(state => state.wallet.transferLoading);
  const walletMsg = useSelector(state => state.wallet.message);

  const wallet_code = wallet_id == lWallet[0].wallet_id ? 'VND' : 'POINT';

  const [transferPressed, setTransferPressed] = useState(false);
  const [confirmPassVisible, setConfirmPassVisible] = useState(false);
  const [biometricLogin, setBiometricLogin] = useState(false);

  // check biometric login
  const checkBiometricLogin = async () => {
    const loginOption = await getData(LOCALSTORAGE.biometric_login_option);
    if (!loginOption) setBiometricLogin(false);
    else setBiometricLogin(true);
  };

  // initial render:
  useEffect(() => {
    checkBiometricLogin();
  }, []);

  // biometirc verify
  const biometricVerify = () => {
    BIOMETRIC.simplePrompt({
      promptMessage: 'Xác nhận vân tay của bạn',
      cancelButtonText: 'Huỷ',
      fallbackPromptMessage: 'Xác nhận không thành công',
    })
      .then(async res => {
        if (res.success) {
          const {password} = await getData(LOCALSTORAGE.biometric_login_data);
          handlePasswordConfirm(password);
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

  // handle transfer pressed
  const handleTransferPress = () => {
    if (biometricLogin) biometricVerify();
    else setConfirmPassVisible(true);
  };

  // handle password deny
  const handlePasswordDeny = () => {
    setConfirmPassVisible(false);
  };

  // handle password confirmm button is pressed
  const handlePasswordConfirm = text => {
    setConfirmPassVisible(false);

    dispatch(
      WalletTransfer.start({
        amount: amount,
        note: note,
        to: selectUser.user_id,
        token: session_token,
        wallet_id: wallet_id,
        password: text,
      }),
    );

    setTransferPressed(true);
  };

  useEffect(() => {
    if (!transferLoading && transferPressed) {
      setTransferPressed(false);

      if (!walletMsg) {
        const myAmount =
          wallet_code == 'VND' ? formatPrice(amount) : formatPoint(amount);

        notification(
          NotificationActions.rise({
            data: {
              message:
                'Chuyển thành công ' +
                myAmount +
                ' tới tài khoản ' +
                selectUser.fullname,
            },
            duration: 3000,
            type: NotificationType.NORMAL,
          }),
        );

        // reload user data
        dispatch(clientGetDetailUserStart(session_token));

        navigation.dispatch(StackActions.pop(2));
      } else {
        dispatch(
          riseNormalError({
            duration: 3000,
            message: 'Lỗi: ' + walletMsg,
          }),
        );
      }
    }
  }, [transferLoading]);

  return (
    <SafeAreaView style={styles.container}>
      {transferLoading ? <LoadingOverlay /> : null}
      <Header
        onPressLeft={() => navigation.goBack()}
        iconLeft={require('../../assets/Arrow1.png')}
        text={'Chuyển tiền'}
      />
      <Text style={[styles.text_1, {marginTop: 40}]}>Người nhận</Text>
      <View style={styles.viewUser}>
        <Image
          style={styles.imgUser}
          resizeMode="contain"
          source={
            selectUser.avatar
              ? {uri: selectUser.avatar}
              : require('../../assets/no_avatar.png')
          }
        />
        <Text style={styles.text_2}>{selectUser.fullname}</Text>
      </View>
      <Text style={styles.text_1}>Nguồn tiền</Text>
      <View style={{marginTop: 15, marginBottom: 15}}>
        <CardSurplus isMainWallet={wallet_code == 'VND'} />
      </View>
      <Text style={styles.text_1}>Chi tiết giao dịch</Text>
      <View style={styles.viewborder}>
        <TextViewRow
          title="Người nhận"
          price={selectUser.fullname}
          priceStyle={{
            fontSize: 16,
            color: '#000000',
            fontWeight: '500',
          }}
          titleStyle={{
            fontSize: 16,
            color: '#000000',
            fontWeight: '300',
          }}
        />
        <TextViewRow
          title="Số điện thoại"
          price={selectUser.mobile}
          priceStyle={{
            fontSize: 16,
            color: '#000000',
            fontWeight: '500',
          }}
          titleStyle={{
            fontSize: 16,
            color: '#000000',
            fontWeight: '300',
          }}
        />
        <TextViewRow
          title="Số tiền"
          price={
            wallet_code == 'VND' ? formatPrice(amount) : formatPoint(amount)
          }
          priceStyle={{
            fontSize: 16,
            color: '#000000',
            fontWeight: '500',
          }}
          titleStyle={{
            fontSize: 16,
            color: '#000000',
            fontWeight: '300',
          }}
        />
      </View>
      <View style={styles.noteView}>
        <Text style={styles.noteLabel}>Lời nhắn:</Text>
        <Text style={styles.noteText}>{note}</Text>
      </View>
      <View style={styles.view_2}>
        <Text style={styles.text_1}>Tổng tiền giao dịch</Text>
        <Text style={styles.text_1}>
          {wallet_code == 'VND' ? formatPrice(amount) : formatPoint(amount)}
        </Text>
      </View>
      <View style={styles.view_3}>
        <Button text={'Xác nhận chuyển tiền'} onPress={handleTransferPress} />
      </View>
      <InputDialog
        visible={confirmPassVisible}
        title={'Xác nhận mật khẩu'}
        inputPlaceholder="Nhập mật khẩu"
        onDeny={handlePasswordDeny}
        onAccept={handlePasswordConfirm}
      />
    </SafeAreaView>
  );
};

export default TranferMoneyTwo;
