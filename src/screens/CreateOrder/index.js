import React from 'react';
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
import Style_CreateOrder from './style';
import Detail_Input from '../../component/Detail_Input';
import Information from '../../component/Information';
import Line from '../../component/Line';
import Button from '../../component/Button';
import {formatPoint, formatPrice, WINDOW_WIDTH} from '../../MyGlobal';
import {useSelector} from 'react-redux';

const CreateOrder = ({route}) => {
  const {products, totalPoint, totalPrices} = route?.params || {};
  const navigation = useNavigation();

  const user = useSelector(state => state.user);

  const render_item = ({item}) => {
    return (
      <View style={Style_CreateOrder.flatlist}>
        <Image
          style={{width: 80, height: 80}}
          source={{uri: item.product.img_1}}
        />
        <View style={Style_CreateOrder.view_3}>
          <Text style={Style_CreateOrder.text_1} numberOfLines={2}>
            {item.product.product_name}
          </Text>
          <Text
            style={[
              Style_CreateOrder.text_2,
              item.pType === 'point' ? {color: 'green'} : null,
            ]}>
            Giá bán:{' '}
            {item.pType === 'money'
              ? formatPrice(item.product.price)
              : formatPoint(item.product.price)}
          </Text>
          <Text style={Style_CreateOrder.text_3}>
            Số lượng: {item.quantity}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={Style_CreateOrder.container}>
      <Header
        onPressLeft={() => navigation.goBack()}
        iconLeft={require('../../assets/Arrow1.png')}
        text={'Tạo đơn hàng'}
      />
      <FlatList
        style={{width: WINDOW_WIDTH, alignSelf: 'center'}}
        data={products}
        renderItem={render_item}
        // keyExtractor={(item, title) => title.toString()}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={Style_CreateOrder.container}>
            <View style={{alignItems: 'center', marginBottom: 15}}>
              <Image
                style={{width: WINDOW_WIDTH}}
                source={require('../../assets/imgOder/Group_203.png')}
              />
            </View>

            <View style={{flexDirection: 'row'}}>
              <Image
                style={Style_CreateOrder.icon}
                source={require('../../assets/imgOder/Rectangle_225.png')}
              />
              <View style={{width: '90%'}}>
                <View style={Style_CreateOrder.view_1}>
                  <Text style={Style_CreateOrder.text_1}>
                    Địa chỉ giao hàng
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('CustomerInformation')}>
                    <Text style={Style_CreateOrder.text_2}>Thay đổi</Text>
                  </TouchableOpacity>
                </View>
                <View style={Style_CreateOrder.view_2}>
                  <Text style={Style_CreateOrder.text_2}>{user.fullname}</Text>
                  <Text style={Style_CreateOrder.text_3}>{user.mobile}</Text>
                  <Text style={Style_CreateOrder.text_3}>
                    {user.address ? user.address : 'Chưa có địa chỉ'}
                  </Text>
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
                style={Style_CreateOrder.icon}
                source={require('../../assets/imgOder/Rectangle_232.png')}
              />
              <View style={{width: '90%'}}>
                <View style={Style_CreateOrder.view_1}>
                  <Text style={Style_CreateOrder.text_1}>Sản phẩm đặt mua</Text>
                  <Text style={Style_CreateOrder.text_4}>#3434654</Text>
                </View>
              </View>
            </View>
          </View>
        }
        ListFooterComponent={
          <View style={Style_CreateOrder.container}>
            <Line />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Image
                style={Style_CreateOrder.icon}
                source={require('../../assets/imgOder/Rectangle_231.png')}
              />
              <View style={{width: '85%', marginLeft: 20}}>
                <Detail_Input
                  style={{padding: 5, paddingLeft: 15}}
                  text={'Ghi chú'}
                  placeholder={'Chưa có ghi chú cho đơn hàng này!'}
                />
              </View>
            </View>
            <Line />
            <View style={{flexDirection: 'row'}}>
              <Image
                style={Style_CreateOrder.icon}
                source={require('../../assets/imgOder/Rectangle_230.png')}
              />
              <View style={{width: '85%', marginLeft: 20}}>
                <Text style={Style_CreateOrder.title_1}>
                  Thông tin sản phẩm
                </Text>
                <Information
                  text_1={'Tổng tiền hàng:'}
                  text_2={'Phí vận chuyển:'}
                  text_3={'Tổng số tiền cần thanh toán:'}
                  price_1={totalPrices ? formatPrice(totalPrices) : undefined}
                  price_11={totalPoint ? formatPoint(totalPoint) : undefined}
                  price_2={'Freeship'}
                  price_3={totalPrices ? formatPrice(totalPrices) : undefined}
                  price_33={totalPoint ? formatPoint(totalPoint) : undefined}
                  style_p2={{
                    color: '#000000',
                    fontStyle: 'italic',
                  }}
                  style_p1={{
                    fontSize: 15,
                    color: '#005aa9',
                  }}
                  style_p11={{
                    fontSize: 15,
                    color: 'green',
                  }}
                  style_p3={{
                    color: '#005aa9',
                    fontSize: 15,
                  }}
                  style_p33={{
                    color: 'green',
                    fontSize: 15,
                  }}
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
                onPress={() => navigation.navigate('Payment')}
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
