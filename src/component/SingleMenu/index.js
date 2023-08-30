import React from 'react';
import { Pressable, Image, View, Text, FlatList } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { formatprice } from '../../global';

const SingleMenu = ({ data, style }) => {

  const navigation = useNavigation();

  // const slicedImages = data?.lItems ? imgLength?.slice(0, 5) : [];
  // const diffImages = imgLength?.length > 4 ? imgLength?.length - slicedImages?.length + 1 : 0;
  const isMore = data?.lItems?.length > 1;

  // Chuyển đổi Unix timestamp sang đối tượng ngày tháng
  const date = new Date(data?.last_update * 1000);

  const day = date.getDate();
  const month = date.getMonth() + 1; // Tháng bắt đầu từ 0, cần cộng thêm 1
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedMonth = month.toString().padStart(2, '0'); // Đảm bảo tháng có hai chữ số
  const formattedMinutes = minutes.toString().padStart(2, '0'); // Đảm bảo phút có hai chữ số

  const lastUpdate = `${day}/${formattedMonth}/${year} - ${hours}:${formattedMinutes}`;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        style,
        pressed ? { opacity: 0.8 } : null,
      ]}
      onPress={() => navigation.navigate('DetailOrder', { data })}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            backgroundColor: '#E8EEFF',
            borderRadius: 25,
            padding: 10,
            alignItems: 'center',
          }}>
          <Image
            style={{ width: 29, height: 28 }}
            source={require('../../assets/Frame.png')}
          />
        </View>
        <View style={{ flexDirection: 'column', marginLeft: 15 }}>
          <Text
            style={{
              fontSize: 15,
              color: '#000000',
              fontFamily: 'Montserrat',
              fontWeight: '600',
            }}>
            Mã đơn hàng: {data?.id}
          </Text>
          <Text style={{ fontSize: 12, color: 'grey', marginTop: 5 }}>
            {lastUpdate}
          </Text>
        </View>
      </View>

      <View style={styles.line}></View>

      {isMore ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <FlatList
            horizontal
            data={data?.lItems}
            renderItem={({ item }) => {
              if (item.image !== '') {
                return (
                  <Image
                    style={{ width: 50, height: 50, marginRight: 16 }}
                    source={{ uri: item.image }}
                  />
                );
              } else {
                return null; // Render nothing for items with empty image source
              }
            }}
          />
          <Image
            resizeMode='contain'
            style={{ width: 15, height: 15 }}
            source={require('../../assets/vectorRight.png')}
          />
        </View>
      )
        : (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 16 }}>
            <View style={{ flexDirection: 'row' }}>
              {data?.lItems[0]?.image ? (
                <Image
                  style={{
                    width: 50,
                    height: 50,
                  }}
                  source={{ uri: data?.lItems[0]?.image }}
                />
              )
                : null}
              <View style={{ flexDirection: 'column', justifyContent: 'space-between', marginLeft: 12 }}>
                <Text style={styles.textName} numberOfLines={1}>{data?.lItems[0]?.product_name}</Text>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                  <Text style={{ fontSize: 16, color: '#000000' }}>Giá bán: </Text>
                  <Text style={styles.textName}>{formatprice(data?.lItems[0]?.price)}</Text>
                </View>
              </View>
            </View>
            <Image
              resizeMode='contain'
              style={{ width: 15, height: 15 }}
              source={require('../../assets/vectorRight.png')}
            />
          </View>
        )
      }

      {isMore ? (
        <View style={{ marginTop: 16 }}>
          <Text style={styles.textName} numberOfLines={1}>{data?.lItems[0]?.product_name}</Text>
          <View style={{ flexDirection: 'row', width: '100%' }}>
            <Text style={{ fontSize: 16, color: '#000000' }}>Giá bán: </Text>
            <Text style={styles.textName}>{formatprice(data?.lItems[0]?.price)}</Text>
          </View>
        </View>
      ) : null
      }


      <View style={styles.line}></View>

      <View style={styles.rowFooter}>
        <Text
          style={{ fontSize: 12, color: '#000000' }}>
          {data?.lItems?.length} sản phẩm
        </Text>
        <Text style={styles.textTotal}>{formatprice(data?.total_product)}</Text>
      </View>
    </Pressable >
  );
};

export default React.memo(SingleMenu);
