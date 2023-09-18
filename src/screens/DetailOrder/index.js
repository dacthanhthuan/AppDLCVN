import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text, Image, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './style';
import Header from '../../component/Header';
import Line from '../../component/Line';
import Detail_Input from '../../component/Detail_Input';
import {formatPoint, formatPrice, WINDOW_WIDTH} from '../../global';
import TextViewRow from '../../component/TextViewRow';
import Button from '../../component/Button';
import {useDispatch, useSelector} from 'react-redux';
import {deleteOrderStart} from '../../redux/actions/orderActions';
import LoadingOverlay from '../../component/LoadingOverlay';
import {riseNormalError} from '../../redux/actions/errorHandlerActions';
import {
  NotificationActions,
  useNotificationDispatch,
} from '../../component/NotificationContext/context';
import {NotificationType} from '../../component/NotificationContext/types';
import ConfirmDialog from '../../component/ConfirmDialog';

const DetailOrder = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const notification = useNotificationDispatch();

  const session_token = useSelector(state => state.user.session_token);
  const deleteOrderState = useSelector(state => state.order.deleteOrderState);
  const orderMsg = useSelector(state => state.order.message);

  const data = route?.params?.data;

  const [deletePress, setDeletePress] = useState(false);
  const [cfVisible, setCfVisible] = useState(false);
  const isPoint = data.payment_name == 'Ví Điểm' ? true : false;

  let totalSalePrice = 0;
  let totalImportPrice = 0;

  data.lItems.map((item, index) => {
    if (data.ship_fee > 0 && index == data.lItems.length - 1) {
      return;
    }

    if (parseFloat(item.sale_price) > 0) {
      totalSalePrice +=
        parseFloat(item.sale_price) *
        ((100 - parseFloat(item.sale_decrement)) / 100) *
        parseFloat(item.quantity);
    } else {
      totalSalePrice += parseFloat(item.price) * parseFloat(item.quantity);
    }

    totalImportPrice +=
      parseFloat(item.price) *
      ((100 - parseFloat(item.decrement)) / 100) *
      parseFloat(item.quantity);
  });

  // handle accept delete
  const handleOnAcceptDelete = () => {
    dispatch(
      deleteOrderStart({
        token: session_token,
        created_at: data.created_at,
        order_id: data.id,
      }),
    );

    setCfVisible(false);

    setDeletePress(true);
  };

  // handle deny delete
  const handleOnDenyDelete = () => {
    setCfVisible(false);
  };

  const handleDeleteOrder = () => {
    setCfVisible(!cfVisible);
  };

  useEffect(() => {
    if (!deleteOrderState && deletePress) {
      // if not error
      if (!orderMsg) {
        setDeletePress(false);
        notification(
          NotificationActions.rise({
            data: {
              message: 'Huỷ thành công đơn hàng ' + data.id,
            },
            duration: 3000,
            type: NotificationType.NORMAL,
          }),
        );

        navigation.pop();
      } else {
        // display error
        dispatch(
          riseNormalError({
            message: orderMsg,
            duration: 3000,
          }),
        );
      }
    }
  }, [deleteOrderState]);

  return (
    <SafeAreaView style={styles.container}>
      {deleteOrderState ? <LoadingOverlay /> : null}
      <Header
        containerStyle={{padding: 16}}
        onPressLeft={() => navigation.goBack()}
        iconLeft={require('../../assets/Arrow1.png')}
        text={'Chi tiết đơn hàng'}
      />
      <View style={styles.container_1}>
        <View
          style={{
            backgroundColor: '#005AA9',
            width: WINDOW_WIDTH,
            padding: 10,
            paddingLeft: 20,
          }}>
          <Text style={styles.text_1}>Đơn hàng: #{data.id}</Text>
        </View>
      </View>

      <ScrollView style={styles.container}>
        <View style={{flexDirection: 'row', paddingHorizontal: 16}}>
          <Image
            style={styles.icon}
            source={require('../../assets/imgOder/Rectangle_226.png')}
          />
          <View style={{width: '90%', marginLeft: 15}}>
            <View style={styles.view_1}>
              <Text style={styles.text_2}>Người nhận hàng</Text>
            </View>
            <View style={styles.view_2}>
              <Text style={styles.text_3}>{data.ship_name}</Text>
              <Text style={styles.text_4}>{data.ship_mobile}</Text>
              <Text style={styles.text_4}>{data.ship_address}</Text>
            </View>
          </View>
        </View>

        <Line />

        <View style={{flexDirection: 'row', paddingHorizontal: 16}}>
          <Image
            style={styles.icon_1}
            source={require('../../assets/imgOder/Rectangle_230.png')}
          />
          <View style={{width: '87%', marginLeft: 20}}>
            <Text style={styles.title_1}>Thông tin cho khách</Text>
            <TextViewRow
              title={'Tổng tiền hàng:'}
              price={
                isPoint
                  ? formatPoint(totalSalePrice)
                  : formatPrice(totalSalePrice)
              }
              priceStyle={{color: 'black'}}
            />
            <TextViewRow
              title={'Phí vận chuyển:'}
              price={formatPrice(data.ship_fee)}
              priceStyle={{color: 'green', fontSize: 15, fontWeight: '500'}}
            />
            <TextViewRow
              title={'Tổng số tiền cần thanh toán:'}
              price={
                isPoint
                  ? formatPoint(totalSalePrice + data.ship_fee)
                  : formatPrice(totalSalePrice + data.ship_fee)
              }
              priceStyle={{fontWeight: '500'}}
            />
          </View>
        </View>

        <Line />

        <View style={{flexDirection: 'row', paddingHorizontal: 16}}>
          <Image
            style={styles.icon_1}
            source={require('../../assets/imgOder/Rectangle_230.png')}
          />
          <View style={{width: '87%', marginLeft: 20}}>
            <Text style={styles.title_1}>Thông tin cho bạn</Text>
            <TextViewRow
              title={'Tổng giá nhà cung cấp:'}
              price={
                isPoint
                  ? formatPoint(totalImportPrice)
                  : formatPrice(totalImportPrice)
              }
              priceStyle={{color: 'black'}}
            />
            <TextViewRow
              title={'Tổng giá bán của bạn:'}
              price={
                isPoint
                  ? formatPoint(totalSalePrice)
                  : formatPrice(totalSalePrice)
              }
              priceStyle={{color: 'green', fontSize: 15, fontWeight: '500'}}
            />
            <TextViewRow
              title={'Tổng lợi nhuận của bạn:'}
              price={
                isPoint
                  ? formatPoint(totalSalePrice - totalImportPrice)
                  : formatPrice(totalSalePrice - totalImportPrice)
              }
              priceStyle={{fontWeight: '500'}}
            />
          </View>
        </View>

        <Line />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
          }}>
          <Image
            style={styles.icon_1}
            source={require('../../assets/imgOder/Rectangle_231.png')}
          />
          <View style={{width: '85%'}}>
            <Detail_Input
              style={{padding: -15, borderWidth: 0}}
              text={'Ghi chú'}
              placeholder={'Không có ghi chú cho đơn hàng này!'}
              value={data.ship_note}
              editable={false}
            />
          </View>
        </View>
        <Line />

        <View style={{paddingHorizontal: 16, paddingBottom: 20}}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={styles.icon_1}
              source={require('../../assets/imgOder/Rectangle_232.png')}
            />
            <View style={{width: '93%'}}>
              <View style={styles.view_1}>
                <Text style={styles.text_2}>Sản phẩm đã mua</Text>
              </View>
            </View>
          </View>
          {data?.lItems.map((item, index) => {
            const decrement = parseInt(item.decrement);
            const importPrice =
              parseInt(item.price) * ((100 - decrement) / 100);
            const salePrice =
              parseFloat(item.sale_price) > 0
                ? parseFloat(item.sale_price) *
                  ((100 - parseFloat(item.sale_decrement)) / 100)
                : item.price;

            return (
              <View
                key={index + new Date() + item.name}
                style={styles.flatlist}>
                <Image
                  source={
                    item.image
                      ? {uri: item.image}
                      : require('../../assets/noimage.png')
                  }
                  style={{width: 80, height: 80, marginRight: 10, flex: 1}}
                />
                <View style={styles.view_3}>
                  <Text style={styles.text_2} numberOfLines={2}>
                    {item.name}
                  </Text>
                  <Text style={{fontSize: 14, color: 'grey'}}>
                    Giá nhập:{' '}
                    {isPoint
                      ? formatPoint(importPrice)
                      : formatPrice(importPrice)}
                  </Text>
                  <Text
                    style={[{fontSize: 14, fontWeight: '400', color: 'black'}]}>
                    Giá bán:{' '}
                    {isPoint
                      ? formatPoint(item.price)
                      : formatPrice(item.price)}
                  </Text>
                  <View style={styles.priceView}>
                    <Text style={[styles.text_3, {fontWeight: '500'}]}>
                      Giá bán của bạn:{' '}
                      {isPoint
                        ? formatPoint(salePrice)
                        : formatPrice(salePrice)}
                    </Text>
                    {parseFloat(item.sale_decrement) > 0 && (
                      <Text style={styles.decrementBadge}>
                        -{parseFloat(item.sale_decrement)}%
                      </Text>
                    )}
                  </View>
                  <Text style={styles.text_4}>
                    Số lượng: {parseInt(item.quantity)}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        <ConfirmDialog
          visible={cfVisible}
          question={'Bạn muốn huỷ đơn hàng này?'}
          onAccept={handleOnAcceptDelete}
          onDeny={handleOnDenyDelete}
        />
        <Button
          text={'Huỷ đơn hàng'}
          style={styles.button}
          onPress={handleDeleteOrder}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailOrder;
