import React, {useCallback, useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Header from '../../component/Header/index';
import styles from './style';
import Detail_Input from '../../component/Detail_Input';
import Information from '../../component/Information';
import Line from '../../component/Line';
import Button from '../../component/Button';
import {formatPoint, formatPrice, WINDOW_WIDTH} from '../../MyGlobal';
import {useSelector} from 'react-redux';
import VerticalProduct from '../../component/Home/MutalbeListProduct/VerticalProduct';
import TextViewRow from '../../component/TextViewRow';

const CreateOrder = ({route}) => {
  const {
    products,
    totalPoint,
    totalPrices,
    totalDecrementPrices,
    totalDecrementPoint,
  } = route?.params || {};
  const navigation = useNavigation();

  // address default
  const default_address = useSelector(state => state.user.address_default);

  // ship infomation
  const ship_address = `${default_address.address}, ${default_address.ward}, ${default_address.district}, ${default_address.city}`;
  const ship_name = default_address.fullname;
  const ship_mobile = default_address.mobile;
  const address_book_id = default_address.id;
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
          source={{uri: item.product.img_1}}
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
                      navigation.navigate('CustomerInformation', {goback: true})
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
                  price={formatPrice(totalPrices + totalPoint)}
                  point={formatPoint(totalPoint + totalPrices)}
                  between="hoặc"
                />
                <Line />
                <TextViewRow title="Phí vận chuyển:" between="Freeship" />
                <Line />
                <TextViewRow
                  title="Tổng giảm giá:"
                  price={formatPrice(
                    totalDecrementPoint +
                      totalDecrementPrices -
                      totalPrices +
                      totalPoint,
                  )}
                  priceStyle={{color: 'red'}}
                />
                <Line />
                <TextViewRow
                  title="Tổng số tiền cần thanh toán:"
                  price={formatPrice(
                    totalDecrementPoint + totalDecrementPrices,
                  )}
                  point={formatPoint(
                    totalDecrementPoint + totalDecrementPrices,
                  )}
                  between="hoặc"
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
                    total: totalDecrementPoint + totalDecrementPrices,
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
