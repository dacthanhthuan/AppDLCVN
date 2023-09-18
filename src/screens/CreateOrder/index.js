import React, {useCallback, useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Header from '../../component/Header/index';
import styles from './style';
import Detail_Input from '../../component/Detail_Input';
import Line from '../../component/Line';
import Button from '../../component/Button';
import {formatPoint, formatPrice, WINDOW_WIDTH} from '../../global';
import {useSelector} from 'react-redux';
import TextViewRow from '../../component/TextViewRow';
import {useOrderAddress} from '../../component/OrderAddressContext';
import api_get_delivery_fee from '../../api/api_get_delivery_fee';
import LoadingOverlay from '../../component/LoadingOverlay';

const CreateOrder = ({route}) => {
  const navigation = useNavigation();
  const orderAddress = useOrderAddress();

  const {
    products,
    totalPrices,
    totalProfit,
    totalImportPrice,
    totalPriceOriginal,
    totalProfitOriginal,
    type,
    chosenShipment,
  } = route?.params || {};

  const app = useSelector(s => s.app.data);
  const session_token = useSelector(s => s.user.session_token);
  // address default
  const address_default = useSelector(state => state.user.address_default);
  const ship_location = orderAddress.address
    ? orderAddress.address
    : address_default;

  // ship infomation
  const ship_address = ship_location
    ? `${ship_location.address}, ${ship_location.ward}, ${ship_location.district}, ${ship_location.city}`
    : 'Chưa có địa chỉ';
  const ship_name = ship_location?.fullname;
  const ship_mobile = ship_location?.mobile;
  const address_book_id = ship_location?.id;
  const [ship_note, setNote] = useState('');
  const litems = products.map(item => {
    return {
      unique_id: item?.product.unique_id,
      product_id: item?.product.product_id,
      amount: item?.quantity,
      price: item?.product.price,
      decrement: item?.product.decrement,

      sale_price: item.priceInCart ? item.priceInCart : item.product.price,

      sale_decrement: item.decrementInCart ? item.decrementInCart : 0,
    };
  });
  const [feeLoading, setFeeLoading] = useState(true);
  const [shipFeeList, setShipFeeList] = useState([]);
  const [shipment, setShipment] = useState(chosenShipment);

  const ship = {
    address_book_id: address_book_id,
    ship_address: ship_address,
    ship_name: ship_name,
    ship_mobile: ship_mobile,
    ship_note: ship_note,
    litems: litems,
    ship_fee: shipment?.total_fee ? shipment.total_fee : 0,
    rate_id: shipment?.id,
    rate_info: shipment,
  };

  // const default supplier id
  const supplier_id = app.default_supplier;

  const lOrder = [
    {
      supplier_id,
      COD_total: totalPrices,
      lItems: litems,
    },
  ];

  // side effect: run once after initial rendering
  useEffect(() => {
    setFeeLoading(true);
    fetchDeliveryFee(
      session_token,
      address_book_id,
      lOrder,
      res => {
        const feeList = res[0]?.lShipFee;

        feeList.sort((a, b) => {
          if (a.total_fee < b.total_fee) {
            return -1;
          } else {
            return 1;
          }
        });

        setShipment(feeList[0]);
        setShipFeeList(feeList);
        setFeeLoading(false);
      },
      err => {},
    );
  }, [address_book_id]);

  // side effect: synchorous shipment which is user chosen
  useEffect(() => {
    if (chosenShipment) setShipment(chosenShipment);
  }, [chosenShipment]);

  const render_item = useCallback(({item}) => {
    const decrementInCart = item?.decrementInCart
      ? parseFloat(item?.decrementInCart)
      : 0;
    const price = item?.priceInCart
      ? parseFloat(item?.priceInCart) -
        parseFloat(item?.priceInCart) * (decrementInCart / 100)
      : parseFloat(item?.product?.price);
    const profit =
      parseFloat(item?.product?.price) *
      (parseFloat(item?.product?.decrement) / 100);
    const importPrice = parseFloat(item?.product?.price) - profit;

    return (
      <View style={styles.flatlist}>
        <Image
          style={{width: 80, height: 80}}
          source={
            item.product.img_1
              ? {uri: item.product.img_1}
              : require('../../assets/noimage.png')
          }
        />
        <View style={styles.view_3}>
          <Text style={[styles.text_1]} numberOfLines={2}>
            {item.product.product_name}
          </Text>
          <Text style={[styles.text_2]}>
            Giá nhập:{' '}
            {item.pType === 'money'
              ? formatPrice(importPrice)
              : formatPoint(importPrice)}
          </Text>
          <View style={styles.priceView}>
            <Text style={[styles.text_2]}>
              Giá bán:{' '}
              <Text style={styles.price}>
                {item.pType === 'money'
                  ? formatPrice(price)
                  : formatPoint(price)}
              </Text>
            </Text>
            {decrementInCart != 0 && (
              <Text style={styles.decrementBadge}>-{decrementInCart}%</Text>
            )}
          </View>
          <Text style={styles.text_3}>Số lượng: {item.quantity}</Text>
        </View>
      </View>
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {feeLoading && <LoadingOverlay />}
      <Header
        onPressLeft={() => navigation.goBack()}
        iconLeft={require('../../assets/Arrow1.png')}
        text={'Tạo đơn hàng'}
        containerStyle={{padding: 16}}
      />
      <FlatList
        style={{width: WINDOW_WIDTH, alignSelf: 'center'}}
        contentContainerStyle={{padding: 16}}
        data={products}
        renderItem={render_item}
        // keyExtractor={(item, title) => title.toString()}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.container}>
            <View style={{alignItems: 'center', marginBottom: 15}}>
              <Image
                style={{width: WINDOW_WIDTH}}
                source={require('../../assets/imgOder/Group_203.png')}
              />
            </View>

            <View style={{flexDirection: 'row'}}>
              <Image
                style={styles.icon}
                source={require('../../assets/imgOder/Rectangle_225.png')}
              />
              <View style={{width: '90%'}}>
                <View style={styles.view_1}>
                  <Text style={styles.text_1}>Địa chỉ giao hàng</Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('CustomerInformation', {
                        goback: true,
                        ship_location_id: ship_location?.id,
                        products,
                        totalPrices,
                        totalProfit,
                        totalImportPrice,
                        totalPriceOriginal,
                        totalProfitOriginal,
                        type,
                      })
                    }
                    hitSlop={10}>
                    <Text style={[styles.text_2, {color: '#005aa9'}]}>
                      Thay đổi
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.view_2}>
                  <Text style={styles.name}>{ship_name}</Text>
                  <Text style={styles.text_3}>{ship_mobile}</Text>
                  <Text style={styles.text_3}>{ship_address}</Text>
                </View>
              </View>
            </View>

            <View
              style={{alignItems: 'center', marginTop: 15, marginBottom: 15}}>
              <Image
                style={{width: WINDOW_WIDTH}}
                source={require('../../assets/imgOder/Group_203.png')}
              />
            </View>

            <View style={{flexDirection: 'row'}}>
              <Image
                style={styles.icon}
                source={require('../../assets/imgOder/Rectangle_232.png')}
              />
              <View style={{width: '90%'}}>
                <View style={styles.view_1}>
                  <Text style={styles.title_1}>Sản phẩm đặt mua</Text>
                  <Text style={styles.text_4}></Text>
                </View>
              </View>
            </View>
          </View>
        }
        ListFooterComponent={
          <View style={styles.container}>
            <Line />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Image
                style={styles.icon}
                source={require('../../assets/imgOder/Rectangle_231.png')}
              />
              <View style={{width: '85%', marginLeft: 20}}>
                <Detail_Input
                  style={{padding: 5, paddingLeft: 15}}
                  text={'Ghi chú'}
                  placeholder={'Chưa có ghi chú cho đơn hàng này!'}
                  onChangeText={setNote}
                />
              </View>
            </View>

            <Line />
            <View
              style={{
                backgroundColor: '#df123420',
                paddingVertical: 10,
                borderRadius: 10,
              }}>
              <View style={{flexDirection: 'row', gap: 10}}>
                <Image
                  style={styles.icon}
                  source={require('../../assets/shipment.png')}
                />
                <Text style={styles.text_1}>
                  Phương thức vận chuyển (Nhấn để chọn)
                </Text>
              </View>
              <TouchableOpacity
                style={styles.ship}
                onPress={() =>
                  navigation.navigate('ShipmentList', {
                    data: shipFeeList,
                    products,
                    totalPrices,
                    totalProfit,
                    totalImportPrice,
                    totalPriceOriginal,
                    totalProfitOriginal,
                    type,
                  })
                }>
                <Text
                  style={[styles.text_2, {color: 'black', fontWeight: '400'}]}>
                  Dịch vụ giao hàng:{' '}
                  <Text style={styles.shipName}>{shipment?.service}</Text>
                </Text>
                <Text
                  style={[styles.text_2, {color: 'black', fontWeight: '400'}]}>
                  Đơn vị vận chuyển:{' '}
                  <Text style={styles.shipName}>{shipment?.carrier_name}</Text>
                </Text>
                <Text
                  style={[styles.text_2, {color: 'black', fontWeight: '400'}]}>
                  Phí vận chuyển:{' '}
                  <Text style={styles.shipPrice}>
                    {formatPrice(shipment?.total_fee)}
                  </Text>
                </Text>
                <Image
                  source={require('../../assets/vectorRight.png')}
                  style={styles.shipImage}
                />
              </TouchableOpacity>
            </View>

            <Line />

            <View style={{flexDirection: 'row', gap: 10}}>
              <Image
                style={styles.icon}
                source={require('../../assets/packingnote.png')}
              />
              <Text style={styles.title_1}>Thông tin xuất bán</Text>
            </View>
            <View style={{marginLeft: 15}}>
              <TextViewRow
                title="Tổng tiền hàng:"
                price={
                  type == 'money_payment'
                    ? formatPrice(totalPrices)
                    : formatPoint(totalPrices)
                }
                priceStyle={{color: 'black', fontWeight: '400'}}
              />
              <TextViewRow
                title="Phí vận chuyển:"
                price={formatPrice(
                  shipment?.total_fee ? shipment.total_fee : 0,
                )}
                priceStyle={{color: '#fd2345', fontWeight: '400'}}
              />
              <TextViewRow
                title="Tổng thành tiền:"
                price={
                  type == 'money_payment'
                    ? formatPrice(
                        shipment?.total_fee
                          ? totalPrices + shipment.total_fee
                          : totalPrices + 0,
                      )
                    : formatPrice(shipment?.total_fee)
                }
                priceStyle={{color: 'black', fontWeight: '400'}}
              />
              <TextViewRow
                title="Tổng số tiền cần thanh toán:"
                price={
                  type == 'money_payment'
                    ? formatPrice(
                        shipment?.total_fee
                          ? totalPrices + shipment.total_fee
                          : totalPrices + 0,
                      )
                    : formatPrice(shipment?.total_fee)
                }
                titleStyle={{fontSize: 16, fontWeight: '500'}}
                priceStyle={{fontSize: 16, color: '#12aa34', fontWeight: '500'}}
              />
            </View>

            <Line />
            <View style={{flexDirection: 'row', gap: 10}}>
              <Image
                style={styles.icon}
                source={require('../../assets/ordernote.png')}
              />
              <Text style={styles.title_1}>Thông tin đơn hàng</Text>
            </View>
            <View style={{marginLeft: 15}}>
              <TextViewRow
                title="Tổng tiền hàng:"
                price={
                  type == 'money_payment'
                    ? formatPrice(totalPriceOriginal)
                    : formatPoint(totalPriceOriginal)
                }
                priceStyle={{color: 'black', fontWeight: '400'}}
              />
              <TextViewRow
                title="Lợi nhuận:"
                price={
                  type == 'money_payment'
                    ? formatPrice(totalProfitOriginal)
                    : formatPoint(totalProfitOriginal)
                }
                priceStyle={{color: '#005aa9', fontWeight: '500'}}
              />
              <TextViewRow
                title="Lợi nhuận đơn hàng:"
                price={
                  type == 'money_payment'
                    ? formatPrice(totalProfit)
                    : formatPoint(totalProfit)
                }
                priceStyle={{color: '#005aa9', fontWeight: '500'}}
              />
              <TextViewRow
                title="Phí giao hàng:"
                price={formatPrice(
                  shipment?.total_fee ? shipment.total_fee : 0,
                )}
                priceStyle={{color: 'black', fontWeight: '400'}}
              />
              <TextViewRow
                title="Tổng thành tiền:"
                price={
                  type == 'money_payment'
                    ? formatPrice(
                        shipment?.total_fee
                          ? totalImportPrice + shipment.total_fee
                          : totalImportPrice,
                      )
                    : formatPrice(shipment?.total_fee)
                }
                priceStyle={{color: 'black', fontWeight: '400'}}
              />
              <TextViewRow
                title="Số tiền thanh toán:"
                price={
                  type == 'money_payment'
                    ? formatPrice(
                        shipment?.total_fee
                          ? totalImportPrice + shipment.total_fee
                          : totalImportPrice,
                      )
                    : formatPrice(shipment?.total_fee)
                }
                titleStyle={{fontSize: 16, fontWeight: '500'}}
                priceStyle={{fontSize: 16, color: '#12aa34', fontWeight: '500'}}
              />
            </View>

            <View
              style={{
                flex: 1,
                paddingLeft: 30,
                paddingRight: 30,
                marginTop: 20,
              }}>
              <Button
                onPress={() => {
                  navigation.navigate('Payment', {
                    ship: ship,
                    total: totalPrices,
                    type: type == 'money_payment' ? 'wallet' : 'cashback',
                  });
                }}
                text={'Tiến hành thanh toán'}
              />
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default CreateOrder;

function fetchDeliveryFee(token, addressId, lOrder, onSuccess, onFailure) {
  const form = new FormData();
  form.append('token', token);
  form.append('address_id', addressId);
  form.append('lOrder', JSON.stringify(lOrder));

  api_get_delivery_fee(form).then(onSuccess).catch(onFailure);
}
