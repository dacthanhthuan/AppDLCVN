import React, {useEffect, useState} from 'react';
import styles from './styles';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import Header from '../../component/Header';
import CardSurplus from '../../component/CardSurplus';
import Button from '../../component/Button';
import LogoBanking from '../../component/LogoBanking';
import {WINDOW_HEIGHT, formatPrice} from '../../global';
import {useDispatch, useSelector} from 'react-redux';
import {riseNormalError} from '../../redux/actions/errorHandlerActions';
import {WalletBankList, WalletDeposit} from '../../redux/actions/walletActions';
import LoadingOverlay from '../../component/LoadingOverlay';
import {clientGetDetailUserStart} from '../../redux/actions/userActions';

const Recharge = ({navigation}) => {
  const dispatch = useDispatch();

  const session_token = useSelector(state => state.user.session_token);
  const bankList = useSelector(state => state.wallet.bankList);
  const deposit = useSelector(state => state.wallet.deposit);
  const depositLoading = useSelector(state => state.wallet.depositLoading);
  const walletMessage = useSelector(state => state.wallet.message);

  const [bankSelect, setBankSelect] = useState(bankList[0]);
  const [amount, setAmount] = useState('');
  const [depositPressed, setDepositPressed] = useState(false); // users is pressed on deposit

  const selectAmount = amount => {
    setAmount(amount?.toString() ? amount.toString() : '');
  };

  // load bank list data
  const getBankWalletListApi = () => {
    try {
      dispatch(WalletBankList.start(session_token));
    } catch (error) {}
  };

  // get bank wallet list
  useEffect(() => {
    // if banklist is not loaded then
    if (bankList.length == 0) getBankWalletListApi();
  }, []);

  // handle continue button
  const handleContinue = async () => {
    if (amount >= 50000) {
      dispatch(
        WalletDeposit.start({
          amount: amount,
          bank_id: bankSelect.id,
          note: '',
          token: session_token,
        }),
      );

      setDepositPressed(true);
    } else {
      if (!bankSelect) {
        dispatch(
          riseNormalError({
            duration: 2500,
            message: 'Vui lòng chọn ngân hàng',
          }),
        );
      } else {
        dispatch(
          riseNormalError({
            duration: 2000,
            message: 'Số tiền nhập vào phải từ ' + formatPrice(50000),
          }),
        );
      }
    }
  };

  // if deposit success
  useEffect(() => {
    if (!depositLoading && depositPressed && !walletMessage) {
      setDepositPressed(false);

      navigation.navigate('InforTranfer', {
        data: deposit,
      });

      //reload user data
      dispatch(clientGetDetailUserStart(session_token));
    }

    // otherwise, deposit is not success
    if (!depositLoading && depositPressed && walletMessage) {
      setDepositPressed(false);

      dispatch(
        riseNormalError({
          duration: 3000,
          message: 'Lỗi: ' + walletMessage,
        }),
      );
    }
  }, [depositLoading]);

  return (
    <SafeAreaView style={styles.container}>
      {depositLoading ? <LoadingOverlay /> : null}
      <Header
        iconLeft={require('../../assets/Arrow1.png')}
        text="Nạp tiền"
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <CardSurplus
          onPress={() => navigation.navigate('WalletScreen')}
          style={{marginTop: 35}}
        />

        <Text style={styles.title}>Nhập số tiền cần nạp</Text>

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

        <Text style={styles.textBanking}>Chọn ngân hàng</Text>

        <View style={{flexDirection: 'row', marginTop: 8}}>
          <LogoBanking
            data={bankList}
            isSelected={bankSelect}
            onSelect={setBankSelect}
          />
        </View>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.textCard}>Hướng dẫn rút tiền</Text>
          <Image
            style={styles.iconRight}
            source={require('../../assets/vectorRight.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('RechargeHistory')}
          style={[styles.card, {marginTop: 12}]}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={styles.iconLeft}
              source={require('../../assets/Rectangle331.png')}
            />
            <Text style={[styles.textCard, {marginLeft: 8}]}>
              Lịch sử nạp tiền
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
            onPress={handleContinue}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(Recharge);
