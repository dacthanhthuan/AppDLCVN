import React from 'react';
import {Pressable, Image, View, Text, FlatList} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {WINDOW_WIDTH, formatPrice} from '../../global';

const SingleMenu = ({data, style}) => {
  const isMore = data.slSp > 1;
  const slicedImages = data?.goods?.length ? data?.goods?.slice(0, 5) : [];
  const diffImages =
    data?.slSp > 4 ? data?.goods?.length - slicedImages?.length + 1 : 0;
  const navigation = useNavigation();

  return (
    <Pressable
      style={({pressed}) => [
        styles.container,
        style,
        pressed ? {opacity: 0.8} : null,
      ]}
      onPress={() => navigation.navigate('DetailOrder', {data})}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            backgroundColor: '#E8EEFF',
            borderRadius: 25,
            padding: 10,
            alignItems: 'center',
          }}>
          <Image
            style={{width: 29, height: 28}}
            source={require('../../assets/Frame.png')}
          />
        </View>
        <View style={{flexDirection: 'column', marginLeft: 15}}>
          <Text
            style={{
              fontSize: 15,
              color: '#000000',
              fontFamily: 'Montserrat',
              fontWeight: '600',
            }}>
            Mã đơn hàng: {data.madh}
          </Text>
          <Text style={{fontSize: 12, color: 'grey', marginTop: 5}}>
            {data.date} - {data.time}
          </Text>
        </View>
      </View>
      <View style={styles.line}></View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,
        }}>
        <FlatList
          data={slicedImages}
          horizontal
          renderItem={({item, index}) =>
            isMore ? (
              <View
                style={{
                  backgroundColor: '#E7E7E7',
                  borderRadius: 25,
                  alignItems: 'center',
                  padding: 10,
                  width: 45,
                  height: 45,
                  marginRight: 10,
                }}>
                <Image style={{width: 25, height: 25}} source={item?.source} />
                {diffImages > 0 && index === slicedImages?.length - 1 ? (
                  <View style={styles.moreImagesContainer}>
                    <Text style={styles.moreImages}>{`+${diffImages}`}</Text>
                  </View>
                ) : null}
              </View>
            ) : null
          }
          keyExtractor={(item, index) => index.toString()}
        />
        <Image
          style={{width: 7, height: 13}}
          source={require('../../assets/vectorRight.png')}
        />
      </View>

      {isMore ? (
        <>
          <Text style={styles.textName} numberOfLines={1}>
            {data.goods[0].name}
          </Text>
          <Text style={styles.textName}>
            <Text style={{color: '#000000', fontWeight: '400'}}>Giá bán:</Text>{' '}
            {formatPrice(data.goods[0].price)}
          </Text>
        </>
      ) : (
        <>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              width: WINDOW_WIDTH * 0.8,
              height: 70,
            }}>
            <Image
              style={{
                width: 50,
                height: 50,
                marginVertical: 10,
                marginRight: 10,
              }}
              source={data?.goods[0].source}
            />
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.textName} numberOfLines={1}>
                {data.goods[0].name}
              </Text>
              <Text style={styles.textName}>
                <Text style={{color: '#000000', fontWeight: '400'}}>
                  Giá bán:
                </Text>{' '}
                {formatPrice(data.goods[0].price)}
              </Text>
            </View>
          </View>
        </>
      )}

      <View style={styles.line}></View>

      <View style={styles.rowFooter}>
        <Text
          style={{fontSize: 12, color: '#000000', fontFamily: 'Montserrat'}}>
          {data.slSp} sản phẩm
        </Text>
        <Text style={styles.textTotal}>{formatPrice(data.total)}</Text>
      </View>
    </Pressable>
  );
};

export default React.memo(SingleMenu);
