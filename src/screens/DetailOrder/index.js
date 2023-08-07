import React from 'react';
import {SafeAreaView, View, Text, Image, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Style_DetailOrder from './style';
import Header from '../../component/Header';
import Line from '../../component/Line';
import Information from '../../component/Information';
import Detail_Input from '../../component/Detail_Input';
import {formatPrice, WINDOW_WIDTH} from '../../MyGlobal';

const DetailOrder = ({route}) => {
  const navigation = useNavigation();

  const data = route?.params?.data;

  return (
    <ScrollView style={Style_DetailOrder.container}>
      <Header
        containerStyle={{paddingHorizontal: 16, paddingTop: 16}}
        onPressLeft={() => navigation.goBack()}
        iconLeft={require('../../assets/Arrow1.png')}
        text={'Chi tiết đơn hàng'}
      />
      <View style={Style_DetailOrder.container_1}>
        <View
          style={{
            backgroundColor: '#005AA9',
            width: WINDOW_WIDTH,
            padding: 10,
            paddingLeft: 20,
          }}>
          <Text style={Style_DetailOrder.text_1}>
            Đơn hàng: #{data?.madh || 3434654}
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', paddingHorizontal: 16}}>
        <Image
          style={Style_DetailOrder.icon}
          source={require('../../assets/imgOder/Rectangle_226.png')}
        />
        <View style={{width: '90%', marginLeft: 15}}>
          <View style={Style_DetailOrder.view_1}>
            <Text style={Style_DetailOrder.text_2}>Người nhận hàng</Text>
          </View>
          <View style={Style_DetailOrder.view_2}>
            <Text style={Style_DetailOrder.text_3}>Chị Huyên</Text>
            <Text style={Style_DetailOrder.text_4}>+ 84864456545</Text>
            <Text style={Style_DetailOrder.text_4}>
              28E Tăng Bạt Hổ, Phường 11, Quận Bình Thạnh, TP.Hồ Chí Minh
            </Text>
          </View>
        </View>
      </View>
      <Line />
      <View style={{flexDirection: 'row', paddingHorizontal: 16}}>
        <Image
          style={Style_DetailOrder.icon_1}
          source={require('../../assets/imgOder/Rectangle_230.png')}
        />
        <View style={{width: '87%', marginLeft: 20}}>
          <Text style={Style_DetailOrder.title_1}>Thông tin cho khách</Text>
          <Information
            text_1={'Tổng tiền hàng:'}
            text_2={'Phí vận chuyển:'}
            text_3={'Tổng số tiền cần thanh toán:'}
            price_1={formatPrice(data?.total)}
            price_3={formatPrice(data?.total) || '1,500,000đ'}
            style_6={{
              color: '#005AA9',
            }}
          />
        </View>
      </View>
      <Line />
      <View style={{flexDirection: 'row', paddingHorizontal: 16}}>
        <Image
          style={Style_DetailOrder.icon_1}
          source={require('../../assets/imgOder/Rectangle_230.png')}
        />
        <View style={{width: '87%', marginLeft: 20}}>
          <Text style={Style_DetailOrder.title_1}>Thông tin cho bạn</Text>
          <Information
            text_1={'Tổng giá nhà cung cấp:'}
            text_2={'Tổng giá bán của bạn:'}
            text_3={'Tổng hoa hồng của bạn:'}
            price_1={formatPrice(data?.producerTotal)}
            price_2={formatPrice(data?.total)}
            price_3={formatPrice(data?.total - data?.producerTotal)}
            style_5={{
              color: '#000000',
            }}
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
          style={Style_DetailOrder.icon_1}
          source={require('../../assets/imgOder/Rectangle_231.png')}
        />
        <View style={{width: '85%'}}>
          <Detail_Input
            style={{padding: -15, borderWidth: 0}}
            text={'Ghi chú'}
            placeholder={'Không có ghi chú cho đơn hàng này!'}
          />
        </View>
      </View>
      <Line />

      <View style={{paddingHorizontal: 16, paddingBottom: 20}}>
        {/* Header */}
        <View style={{flexDirection: 'row'}}>
          <Image
            style={Style_DetailOrder.icon_1}
            source={require('../../assets/imgOder/Rectangle_232.png')}
          />
          <View style={{width: '93%'}}>
            <View style={Style_DetailOrder.view_1}>
              <Text style={Style_DetailOrder.text_2}>Sản phẩm đã mua</Text>
            </View>
          </View>
        </View>
        {/* rendre Item */}
        {data?.goods.map((item, index) => {
          return (
            <View key={index} style={Style_DetailOrder.flatlist}>
              <Image
                source={item.source}
                style={{width: 80, height: 80, marginRight: 10}}
              />
              <View style={Style_DetailOrder.view_3}>
                <Text style={Style_DetailOrder.text_2}>{item.name}</Text>
                <Text style={Style_DetailOrder.text_4}>
                  Giá nhà cung cấp: 600,000đ
                </Text>
                <Text style={Style_DetailOrder.text_3}>
                  Giá bán: {formatPrice(item.price)}
                </Text>
                <Text style={Style_DetailOrder.text_4}>Số lượng: 1</Text>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default DetailOrder;
