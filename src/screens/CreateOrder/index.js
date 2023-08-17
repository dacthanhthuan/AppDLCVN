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

const CreateOrder = ({route}) => {
  const navigation = useNavigation();
  const orderAddress = useOrderAddress();

  const {
    products,
    totalPoint,
    totalPrices,
    totalDecrementPrices,
    totalDecrementPoint,
    type,
  } = route?.params || {};

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
    };
  });
  const ship_fee = 0;

  const ship = {
    address_book_id: address_book_id,
    ship_address: ship_address,
    ship_name: ship_name,
    ship_mobile: ship_mobile,
    ship_note: ship_note,
    litems: litems,
    ship_fee: ship_fee,
  };

  const render_item = useCallback(({item}) => {
    const decrement =
      item?.product.decrement != 0 ? item?.product.decrement : undefined;
    const decrementPrice =
      parseInt(item?.product.price) * ((100 - parseInt(decrement)) / 100);

    return (
      <View style={styles.flatlist}>
        {decrement ? (
          <Text style={styles.decrementBadge}>-{decrement}%</Text>
        ) : null}
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
          <Text
            style={[
              styles.text_2,
              item.pType === 'point' ? {color: 'green'} : null,
              decrement ? styles.stroke_line : null,
            ]}>
            Giá bán:{' '}
            {item.pType === 'money'
              ? formatPrice(item.product.price)
              : formatPoint(item.product.price)}
          </Text>
          {decrement ? (
            <Text style={[styles.decrementPrice]}>
              Giá bán:{' '}
              {item.pType === 'money'
                ? formatPrice(decrementPrice)
                : formatPoint(decrementPrice)}
            </Text>
          ) : null}
          <Text style={styles.text_3}>Số lượng: {item.quantity}</Text>
        </View>
      </View>
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
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
                        totalPoint,
                        totalPrices,
                        totalDecrementPrices,
                        totalDecrementPoint,
                        type,
                      })
                    }
                    hitSlop={10}>
                    <Text style={styles.text_2}>Thay đổi</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.view_2}>
                  <Text style={styles.text_2}>{ship_name}</Text>
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
                  <Text style={styles.text_1}>Sản phẩm đặt mua</Text>
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
            <View style={{flexDirection: 'row'}}>
              <Image
                style={styles.icon}
                source={require('../../assets/imgOder/Rectangle_230.png')}
              />
              <View style={{width: '85%', marginLeft: 20}}>
                <Text style={styles.title_1}>Thông tin sản phẩm</Text>
                <TextViewRow
                  title="Tổng tiền hàng:"
                  price={
                    type == 'money_payment'
                      ? formatPrice(totalPrices)
                      : undefined
                  }
                  point={
                    type == 'point_payment'
                      ? formatPoint(totalPoint)
                      : undefined
                  }
                />
                <Line />
                <TextViewRow title="Phí vận chuyển:" between="Freeship" />
                <Line />
                <TextViewRow
                  title="Tổng giảm giá:"
                  price={
                    type == 'money_payment'
                      ? formatPrice(totalPrices - totalDecrementPrices)
                      : formatPoint(totalPoint - totalDecrementPoint)
                  }
                  priceStyle={{color: 'red'}}
                />
                <Line />
                <TextViewRow
                  title="Tổng số tiền cần thanh toán:"
                  price={
                    type == 'money_payment'
                      ? formatPrice(totalDecrementPrices)
                      : undefined
                  }
                  point={
                    type == 'point_payment'
                      ? formatPoint(totalDecrementPoint)
                      : undefined
                  }
                />
              </View>
            </View>
            <View
              style={{
                flex: 1,
                paddingLeft: 30,
                paddingRight: 30,
                marginTop: 50,
              }}>
              <Button
                onPress={() =>
                  navigation.navigate('Payment', {
                    ship: ship,
                    total:
                      type == 'money_payment'
                        ? totalDecrementPrices
                        : totalDecrementPoint,
                    type: type == 'money_payment' ? 'wallet' : 'cashback',
                  })
                }
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
