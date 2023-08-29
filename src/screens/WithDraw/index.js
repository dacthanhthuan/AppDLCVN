import React, {useEffect, useState} from 'react';
import styles from './styles';
import {SafeAreaView, Text, View, Image, ScrollView} from 'react-native';
import Header from '../../component/Header/index';
import CardSurplus from '../../component/CardSurplus';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Button from '../../component/Button';
import {WINDOW_HEIGHT, formatPrice} from '../../global';
import CurrencyInput from 'react-native-currency-input';
import {riseNormalError} from '../../redux/actions/errorHandlerActions';
import {useDispatch, useSelector} from 'react-redux';
import {
  NotificationActions,
  useNotificationDispatch,
} from '../../component/NotificationContext/context';
import {WalletWithdraw} from '../../redux/actions/walletActions';
import {clientGetDetailUserStart} from '../../redux/actions/userActions';
import {NotificationType} from '../../component/NotificationContext/types';
import {StackActions} from '@react-navigation/native';
import LoadingOverlay from '../../component/LoadingOverlay';

const WithDraw = ({navigation}) => {
  const dispatch = useDispatch();
  const notification = useNotificationDispatch();

  const user = useSelector(state => state.user);
  const session_token = useSelector(state => state.user.session_token);
  const withdrawLoading = useSelector(state => state.wallet.withdrawLoading);
  const walletMessage = useSelector(state => state.wallet.message);

  const [amount, setAmount] = useState('');
  const [withdrawPressed, setWithdrawPressed] = useState(false);

  const selectAmount = amount => {
    setAmount(amount?.toString() ? amount.toString() : '');
  };

  // handle withdraw button
  const handleWithdraw = () => {
    if (amount >= 50000) {
      dispatch(
        WalletWithdraw.start({
          amount: amount,
          note: '',
          token: session_token,
        }),
      );

      setWithdrawPressed(true);
    } else {
      dispatch(
        riseNormalError({
          duration: 2500,
          message: 'Số tiền rút ra ít nhất là ' + formatPrice(50000),
        }),
      );
    }
  };

  // after withdraw loading success
  useEffect(() => {
    if (!withdrawLoading && withdrawPressed) {
      setWithdrawPressed(false);
      // if not exist error
      if (!walletMessage) {
        // reload user data
        dispatch(clientGetDetailUserStart(session_token));

        // display notification
        notification(
          NotificationActions.rise({
            data: {
              message: 'Rút thành công ' + formatPrice(amount),
            },
            duration: 3000,
            type: NotificationType.NORMAL,
          }),
        );

        // go back previous screen
        navigation.dispatch(StackActions.pop());
      } else if (walletMessage) {
        // display error
        dispatch(
          riseNormalError({
            duration: 3200,
            message: 'Lỗi: ' + walletMessage,
          }),
        );
      }
    }
  }, [withdrawLoading]);

  return (
    <SafeAreaView style={styles.container}>
      {withdrawLoading ? <LoadingOverlay /> : null}
      <Header
        iconLeft={require('../../assets/Arrow1.png')}
        text="Rút tiền"
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <CardSurplus
          onPress={() => navigation.navigate('WalletScreen')}
          style={{marginTop: 35}}
        />

        <Text style={styles.title}>Nhập số tiền cần rút</Text>

        <CurrencyInput
          style={styles.value}
          value={amount}
          onChangeValue={selectAmount}
          suffix=" đ"
          precision={0}
          placeholder="0 đ"
          placeholderTextColor="#C2C2C2"
          keyboardType="number-pad"
          maxValue={100000000}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 25,
          }}>
          <TouchableOpacity
            style={styles.numberContainerMoney}
            onPress={() => selectAmount('50000')}>
            <Text style={styles.numberMoney}>50 000</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.numberContainerMoney}
            onPress={() => selectAmount('500000')}>
            <Text style={styles.numberMoney}>500 000</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.numberContainerMoney}
            onPress={() => selectAmount('5000000')}>
            <Text style={styles.numberMoney}>5 000 000</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.bankContainer}
          onPress={() => navigation.navigate('BankAccount')}>
          <Text style={styles.bankLabel}>Thông tin tài khoản ngân hàng</Text>
          {user.bank_name && user.bank_account && user.bank_fullname ? (
            <>
              <Text style={styles.bankTitle}>
                Ngân hàng:
                <Text> {user.bank_name}</Text>
              </Text>
              <Image
                style={styles.bankIcon}
                source={require('../../assets/vectorRight.png')}
              />
              <Text style={styles.bankTitle}>
                Chủ thẻ:
                <Text style={{textTransform: 'uppercase'}}>
                  {' '}
                  {user.bank_fullname}
                </Text>
              </Text>
              <Text style={styles.bankTitle}>
                Mã thẻ:
                <Text>
                  {' '}
                  {user.bank_account.substring(0, 4)}{' '}
                  {user.bank_account.substring(4, 8)}{' '}
                  {user.bank_account.substring(8, 12)}{' '}
                  {user.bank_account.substring(12, 16)}{' '}
                </Text>
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.bankTitle}>
                Chưa có thông tin tài khoản ngân hàng, thêm tại đây
              </Text>
              <Image
                style={styles.bankIcon}
                source={require('../../assets/vectorRight.png')}
              />
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.textCard}>Hướng dẫn rút tiền</Text>
          <Image
            style={styles.iconRight}
            source={require('../../assets/vectorRight.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('WithdrawHistory')}
          style={[styles.card, {marginTop: 12}]}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={styles.iconLeft}
              source={require('../../assets/Rectangle331.png')}
            />
            <Text style={[styles.textCard, {marginLeft: 8}]}>
              Lịch sử rút tiền
            </Text>
          </View>
          <Image
            style={styles.iconRight}
            source={require('../../assets/vectorRight.png')}
          />
        </TouchableOpacity>

        <View style={{alignItems: 'center', marginTop: WINDOW_HEIGHT * 0.1}}>
          <Button
            text="Tiếp theo"
            style={{width: '90%'}}
            onPress={handleWithdraw}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(WithDraw);
