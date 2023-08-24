import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import Header from '../../component/Header';
import Style_InforTranfer from './style';
import Line from '../../component/Line';
import Button from '../../component/Button';
import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import {formatPrice, secondToGlobalDate} from '../../global';
import {useDispatch, useSelector} from 'react-redux';
import Clipboard from '@react-native-clipboard/clipboard';
import {
  WalletCancel,
  WalletFundHistoryList,
} from '../../redux/actions/walletActions';
import {riseNormalError} from '../../redux/actions/errorHandlerActions';
import {
  NotificationActions,
  useNotificationDispatch,
} from '../../component/NotificationContext/context';
import {NotificationType} from '../../component/NotificationContext/types';
import LoadingOverlay from '../../component/LoadingOverlay';
import {clientGetDetailUserStart} from '../../redux/actions/userActions';

const InforTranfer = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const dispatch = useDispatch();
  const notification = useNotificationDispatch();

  const session_token = useSelector(state => state.user.session_token);
  const cancelLoading = useSelector(state => state.wallet.cancelLoading);
  const walletMsg = useSelector(state => state.wallet.message);

  const {data, history, isWidthDraw, wallet} = route.params;

  const [cancelPressed, setCancelPressed] = useState(false);

  // handle confirm
  const handleConfirm = () => {
    history
      ? navigation.dispatch(StackActions.pop())
      : navigation.dispatch(StackActions.pop(2));
  };

  // handle Copy
  const handleCopy = () => {
    Clipboard.setString(data.memo);
    ToastAndroid.show('Đã sao chép', ToastAndroid.LONG);
  };

  // handle cancel
  const handleCancel = () => {
    dispatch(
      WalletCancel.start({
        token: session_token,
        note: '',
        id: data.id,
      }),
    );

    setCancelPressed(true);
  };

  // make detail transaction to push notification
  function makeTransactionString() {
    const type = data.type == 1 ? 'Nạp ' : 'Rút ';
    const amount = formatPrice(data.amount);
    const temp = data.type == 1 ? ' vào ví' : ' từ ví';
    const time =
      ', vào lúc ' + secondToGlobalDate(data.created_at).toLocaleString();
    return type + amount + temp + time;
  }

  useEffect(() => {
    // when cancel transaction success
    if (!cancelLoading && !walletMsg && cancelPressed) {
      setCancelPressed(false);

      // display notification
      notification(
        NotificationActions.rise({
          data: {
            message: 'Huỷ thành công giao dịch: ' + makeTransactionString(),
          },
          duration: 4000,
          type: NotificationType.NORMAL,
        }),
      );

      // reload history data
      dispatch(WalletFundHistoryList.clear());
      dispatch(
        WalletFundHistoryList.start({
          token: session_token,
          type: isWidthDraw ? '-1' : '1',
          page: 1,
        }),
      );

      // reload user data
      dispatch(clientGetDetailUserStart(session_token));

      handleConfirm();
    }

    // otherwise, cancel transaction not success
    if (!cancelLoading && walletMsg && cancelPressed) {
      setCancelPressed(false);

      dispatch(
        riseNormalError({
          duration: 3000,
          message: 'Lỗi: ' + walletMsg,
        }),
      );
    }
  }, [cancelLoading]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      {cancelLoading ? <LoadingOverlay /> : null}
      <Header
        onPressLeft={() => navigation.goBack()}
        iconLeft={require('../../assets/Arrow1.png')}
        text={'Thông tin giao dịch'}
        containerStyle={{padding: 15}}
      />

      <ScrollView
        contentContainerStyle={Style_InforTranfer.container}
        showsVerticalScrollIndicator={false}>
        <Text
          style={[
            Style_InforTranfer.text_1,
            {marginBottom: 15, marginTop: 20},
          ]}>
          {wallet
            ? 'Nội dung chuyển khoản'
            : isWidthDraw
            ? 'Thông tin tài khoản rút tiền'
            : 'Thực hiện chuyển khoản theo thông tin dưới đây để hoàn tất nạp tiền'}
        </Text>
        <View style={Style_InforTranfer.viewborder}>
          <View style={{marginTop: 10}}>
            <Text style={Style_InforTranfer.text_1}>
              {wallet ? 'Thời gian' : 'Ngân hàng'}
            </Text>
            <Text
              style={[
                Style_InforTranfer.text_2,
                {
                  textTransform: 'capitalize',
                },
              ]}>
              {wallet
                ? secondToGlobalDate(data.created_at).toLocaleString()
                : data?.bankInfo?.bank_name || data?.bank_name}
            </Text>
          </View>
          <Line />
          <View style={{marginTop: 10}}>
            <Text style={Style_InforTranfer.text_1}>
              {wallet ? 'Người chuyển' : 'Tên chủ tài khoản'}
            </Text>
            <Text style={Style_InforTranfer.text_2}>
              {wallet
                ? data.from_fullname
                : data?.bankInfo?.bank_account_name || data?.bank_account_name}
            </Text>
          </View>
          <Line />
          <View style={{marginTop: 10}}>
            <Text style={Style_InforTranfer.text_1}>
              {wallet ? 'Người nhận' : 'Số tài khoản'}
            </Text>
            <Text style={Style_InforTranfer.text_2}>
              {wallet
                ? data.to_fullname
                : data?.bankInfo?.bank_account || data?.bank_account}
            </Text>
          </View>
          <Line />
          <View style={{marginTop: 10}}>
            <Text style={Style_InforTranfer.text_1}>
              {wallet
                ? 'Số tiền'
                : isWidthDraw
                ? 'Số tiền rút ra'
                : 'Số tiền cần chuyển'}
            </Text>
            <Text style={Style_InforTranfer.text_2}>
              {formatPrice(data.amount)}
            </Text>
          </View>
        </View>
        {isWidthDraw ? null : (
          <>
            <View style={{paddingLeft: 30, paddingRight: 30}}>
              <Line />
            </View>

            <View style={Style_InforTranfer.viewborder}>
              <View style={{flexDirection: 'row'}}>
                <Text style={Style_InforTranfer.text_1}>
                  {wallet ? 'Tin nhắn' : 'Nội dung chuyển tiền'}
                </Text>
                <Text style={Style_InforTranfer.text_3}>
                  {' '}
                  {wallet ? '' : '(bắt buộc)'}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}>
                <Text style={Style_InforTranfer.text_2}>
                  {wallet ? data.note : data.memo}
                </Text>
                {!wallet && (
                  <TouchableOpacity onPress={handleCopy}>
                    <Text style={Style_InforTranfer.text_4}>Sao chép</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            {!wallet && (
              <View
                style={{
                  marginTop: 30,
                  justifyContent: 'space-between',
                  height: '15%',
                }}>
                <Text style={Style_InforTranfer.text_5}>Lưu ý</Text>
                <Text style={Style_InforTranfer.text_1}>
                  Giao dịch sẽ không được xử lí nếu sai nội dung chuyển khoản
                </Text>
                <Text style={Style_InforTranfer.text_1}>
                  Sau khi chuyển khoản, vui lòng chờ để chúng tôi xác nhận giao
                  dịch của bạn
                </Text>
              </View>
            )}
          </>
        )}

        <Button text={'Xác nhận'} onPress={handleConfirm} />
        {!wallet && history && data.status == 0 ? (
          <Button text="Huỷ giao dịch" onPress={handleCancel} />
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default InforTranfer;
