import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  useWindowDimensions,
  ToastAndroid,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Style_Payment from './style';
import Header from '../../component/Header/index';
import {Checkbox_2} from '../../component/Checkbox/index';
import Button from '../../component/Button';
import TextViewRow from '../../component/TextViewRow';
import {formatPoint, formatPrice} from '../../global';
import {useDispatch, useSelector} from 'react-redux';
import {newOrderStart} from '../../redux/actions/orderActions';
import LoadingOverlay from '../../component/LoadingOverlay';
import {
  removeAllCartProduct,
  rmProductFromCart,
} from '../../redux/actions/cartActions';
import {removeData} from '../../storage';
import {LOCALSTORAGE} from '../../storage/direct';
import {
  NotificationActions,
  useNotificationDispatch,
} from '../../component/NotificationContext/context';
import {NotificationType} from '../../component/NotificationContext/types';
import {riseNormalError} from '../../redux/actions/errorHandlerActions';
import {clientGetDetailUserStart} from '../../redux/actions/userActions';

const Payment = () => {
  const lineWidth = useWindowDimensions().width;
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const notification = useNotificationDispatch();

  const ship = route.params?.ship || {};
  const total = route.params?.total || 0;
  const type = route.params?.type;
  const session_token = useSelector(state => state.user.session_token);
  const newOrderState = useSelector(state => state.order.newOrderState);
  const orderMsg = useSelector(state => state.order.message);
  const walletMain = useSelector(state => state.user.lWallet[0].amount);
  const walletCashback = useSelector(state => state.user.lWallet[1].amount);

  const [payment_type, setPaymentType] = useState(
    type == 'wallet' ? 'wallet' : 'cash_back',
  );
  const [orderPress, setOrderPress] = useState(false);

  const handleTypeAddressPress = payment_type => {
    setPaymentType(payment_type);
  };

  const onPaymentPress = () => {
    if (payment_type == 'momo') {
      dispatch(
        riseNormalError({
          duration: 2500,
          message: 'Thanh toán bằng ví Momo hiện không hỗ trợ',
        }),
      );
    } else if (payment_type == 'wallet' && walletMain - total < 0) {
      dispatch(
        riseNormalError({
          duration: 3000,
          message: 'Thực hiện không thành công, ví tiền của bạn không đủ',
        }),
      );
    } else if (payment_type == 'cash_back' && walletCashback - total < 0) {
      dispatch(
        riseNormalError({
          duration: 3000,
          message: 'Thực hiện không thành công, ví điểm của bạn không đủ',
        }),
      );
    } else {
      dispatch(
        newOrderStart({
          token: session_token,
          address_book_id: ship.address_book_id,
          ship_name: ship.ship_name,
          ship_mobile: ship.ship_mobile,
          ship_address: ship.ship_address,
          ship_note: ship.ship_note,
          ship_fee: ship.ship_fee,
          lItems: JSON.stringify(ship.litems),
          payment_cashback: payment_type === 'cash_back' ? total : 0,
          payment_wallet: payment_type === 'wallet' ? total : 0,
          payment_cod: payment_type === 'cod' ? total : 0,
        }),
      );

      setOrderPress(true);
    }
  };

  useEffect(() => {
    if (!newOrderState && !orderMsg && orderPress) {
      setOrderPress(false);

      // remove product from cart
      ship.litems.forEach(item =>
        dispatch(
          rmProductFromCart({
            productId: item.product_id,
            pType: type == 'wallet' ? 'money' : 'point',
            quantity: 0,
          }),
        ),
      );
      notification(
        NotificationActions.rise({
          data: {
            message:
              'Đặt hàng thành công, truy cập lịch sử đơn hàng để theo dõi',
          },
          duration: 4000,
          type: NotificationType.NORMAL,
        }),
      );
      // if payment type is not cod
      if (payment_type !== 'cod') {
        // then reload user data to get new wallet and point
        dispatch(clientGetDetailUserStart(session_token));
      }
      navigation.navigate('SuccPayment');
    }

    if (!newOrderState && orderMsg && orderPress) {
      dispatch(
        riseNormalError({
          duration: 4000,
          message: orderMsg,
        }),
      );
    }
  }, [newOrderState]);

  return (
    <SafeAreaView style={Style_Payment.container}>
      {newOrderState ? <LoadingOverlay /> : null}
      <Header
        onPressLeft={() => navigation.goBack()}
        iconLeft={require('../../assets/Arrow1.png')}
        text={'Xác nhận thanh toán'}
      />
      <View style={Style_Payment.container_1}>
        <View
          style={{
            backgroundColor: '#005AA9',
            width: lineWidth,
            padding: 10,
            paddingLeft: 20,
          }}>
          <Text style={Style_Payment.text_1}>Đơn hàng</Text>
        </View>
      </View>
      <TextViewRow
        title="Tổng thanh toán"
        price={type == 'wallet' ? formatPrice(total) : undefined}
        point={type == 'cashback' ? formatPoint(total) : undefined}
      />
      <TextViewRow title="Tổng phí vận chuyển" between="Freeship" />

      <Text style={Style_Payment.text_2}>Chọn phương thức thanh toán</Text>

      <View style={{flexDirection: 'row', marginTop: 15, alignItems: 'center'}}>
        <Image
          style={Style_Payment.icon_1}
          source={require('../../assets/imgOder/Rectangle_238.png')}
        />
        <Text style={Style_Payment.title_1}>Thanh toán bằng ví điện tử</Text>
      </View>

      <View style={{marginLeft: 45}}>
        {type == 'cashback' ? (
          <Checkbox_2
            type={'Point'}
            title={'Thanh toán bằng Ví điểm'}
            onSelected={handleTypeAddressPress}
            isSelected={payment_type}
            unique="cash_back"
          />
        ) : null}
        {type == 'wallet' ? (
          <>
            <Checkbox_2
              type={'VNĐ'}
              title={'Thanh toán bằng Ví VNĐ'}
              onSelected={handleTypeAddressPress}
              isSelected={payment_type}
              unique="wallet"
            />
            <Checkbox_2
              title={'Thanh toán bằng Ví Momo'}
              img={require('../../assets/imgOder/Momo.png')}
              onSelected={handleTypeAddressPress}
              isSelected={payment_type}
              unique="momo"
            />
          </>
        ) : null}
      </View>
      {type == 'wallet' ? (
        <Checkbox_2
          styleTitle={{
            fontWeight: '400',
            alignSelf: 'center',
          }}
          styleImg={{
            width: 31,
            height: 31,
          }}
          img={require('../../assets/imgOder/Rectangle_239.png')}
          title={'Thanh toán bằng tiền mặt'}
          onSelected={handleTypeAddressPress}
          isSelected={payment_type}
          unique="cod"
        />
      ) : null}
      <View style={{flex: 1, paddingLeft: 30, paddingRight: 30}}>
        <View style={{flex: 1}}></View>
        <Button onPress={onPaymentPress} text={'Xác nhận thanh toán'} />
      </View>
    </SafeAreaView>
  );
};
export default Payment;
