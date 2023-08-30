import React from 'react';
import { SafeAreaView, View, Text, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Style_DetailOrder from './style';
import Header from '../../component/Header';
import Line from '../../component/Line';
import Information from '../../component/Information';
import Detail_Input from '../../component/Detail_Input';
import { formatprice, WINDOW_WIDTH } from '../../global';

const DetailOrder = ({ route }) => {
  const navigation = useNavigation();

  const data = route?.params?.data;
  console.log(data);

  const textColor = data?.ship_note ? '#000000' : '#C2C2C2';

  return (
    <>
      <Header
        containerStyle={{ paddingHorizontal: 16, paddingTop: 16, backgroundColor: '#FFFFFF' }}
        onPressLeft={() => navigation.goBack()}
        iconLeft={require('../../assets/Arrow1.png')}
        text={'Chi tiết đơn hàng'}
      />
      <ScrollView style={Style_DetailOrder.container}>
        <View style={Style_DetailOrder.container_1}>
          <View
            style={{
              backgroundColor: '#005AA9',
              width: WINDOW_WIDTH,
              padding: 10,
              paddingLeft: 20,
            }}>
            <Text style={Style_DetailOrder.text_1}>
              Đơn hàng: #{data?.id || 3434654}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', paddingHorizontal: 16 }}>
          <Image
            style={Style_DetailOrder.icon}
            source={require('../../assets/imgOder/Rectangle_226.png')}
          />
          <View style={{ width: '90%', marginLeft: 15 }}>
            <View style={Style_DetailOrder.view_1}>
              <Text style={Style_DetailOrder.text_2}>Người nhận hàng</Text>
            </View>
            <View style={Style_DetailOrder.view_2}>
              <Text style={Style_DetailOrder.text_3}>{data?.ship_name}</Text>
              <Text style={Style_DetailOrder.text_4}>{data?.ship_mobile}</Text>
              <Text style={Style_DetailOrder.text_4}>{data?.ship_address}</Text>
            </View>
          </View>
        </View>

        <View style={{ paddingHorizontal: 16 }}>

          <Information title='Thông tin cho khách'
            textOne='Tổng tiền hàng:' textTwo='Phí vận chuyển:' textThree='Tổng số tiền cần thanh toán:'
            valueOne={formatprice(data?.total_product)} valueTwo='Free Ship' valueThree={formatprice(data?.total_product)} />
          <Information title='Thông tin cho bạn'
            textOne='Tổng giá nhà cung cấp:' textTwo='Tổng giá bán của bạn:' textThree='Tổng hoa hồng của bạn:'
            valueOne={formatprice(data?.total_product)} valueTwo='Free Ship' valueThree={formatprice(data?.total_product)} />
        </View>

        <Line />
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 16,
          }}>
          <Image
            style={Style_DetailOrder.icon_1}
            source={require('../../assets/imgOder/Rectangle_231.png')}
          />
          <View style={{ marginLeft: 20 }}>
            <Text style={Style_DetailOrder.textNote}>Ghi chú</Text>
            <Text style={{ color: textColor, marginTop: 8 }}>{data?.ship_note ? data?.ship_note : 'Không có ghi chú cho đơn hàng này'}</Text>
          </View>
        </View>
        <Line />

        <View style={{ paddingHorizontal: 16, paddingBottom: 10 }}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              style={Style_DetailOrder.icon_1}
              source={require('../../assets/imgOder/Rectangle_232.png')}
            />
            <Text style={[Style_DetailOrder.text_2, { marginLeft: 20 }]}>Sản phẩm đã mua</Text>
          </View>
          {/* render Item */}
          {data?.lItems?.map((item, index) => {
            return (
              <View key={index} style={Style_DetailOrder.flatlist}>
                {
                  item?.image ? (
                    <Image
                      source={{ uri: item?.image }}
                      style={{ width: 80, height: 80, marginRight: 10 }}
                    />
                  ) : <View style={{ width: 80, height: 80, marginRight: 10 }} />
                }
                <View style={Style_DetailOrder.view_3}>
                  <Text style={Style_DetailOrder.text_2} numberOfLines={1}>{item?.name}</Text>
                  <Text style={Style_DetailOrder.text_4}>
                    Giá nhà cung cấp: {formatprice(item?.retail_price)}
                  </Text>
                  <Text style={Style_DetailOrder.text_3}>
                    Giá bán: {formatprice(item?.price)}
                  </Text>
                  <Text style={Style_DetailOrder.text_4}>Số lượng: {parseInt(item?.quantity)}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </>

  );
};

export default DetailOrder;
