import React from 'react';
import {Pressable, Image, View, Text, FlatList} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {WINDOW_WIDTH, formatPrice, secondToGlobalDate} from '../../global';

const SingleMenu = ({data, style}) => {
  const navigation = useNavigation();

  const isManyProduct = data.lItems.length > 1;
  const slicedImages = data.lItems.slice(0, 5);
  const diffImages =
    data.lItems.length > 4 ? data.lItems.length - slicedImages.length + 1 : 0;

  const globalDate = secondToGlobalDate(data.created_at);

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
            Mã đơn hàng: {data.id}
          </Text>
          <Text style={{fontSize: 13, color: 'grey', marginTop: 5}}>
            {globalDate.toLocaleDateString()} -{' '}
            {globalDate.toLocaleTimeString()}
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
            isManyProduct ? (
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
                <Image
                  style={{width: 25, height: 25}}
                  source={
                    item.image
                      ? {uri: item.image}
                      : require('../../assets/noimage.png')
                  }
                />
                {diffImages > 0 && index === slicedImages?.length - 1 ? (
                  <View style={styles.moreImagesContainer}>
                    <Text style={styles.moreImages}>{`+${diffImages}`}</Text>
                  </View>
                ) : null}
              </View>
            ) : null
          }
        />
        {isManyProduct ? (
          <Image
            style={{width: 7, height: 13}}
            source={require('../../assets/vectorRight.png')}
          />
        ) : null}
      </View>

      {isManyProduct ? (
        <>
          <Text style={styles.textName} numberOfLines={1}>
            {data.lItems[0].name}
          </Text>
          <Text style={styles.textName}>
            <Text style={{color: '#000000', fontWeight: '400'}}>Giá bán:</Text>{' '}
            {formatPrice(data.lItems[0].price)}
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
              source={
                data?.lItems[0]?.image
                  ? {uri: data.lItems[0].image}
                  : require('../../assets/noimage.png')
              }
            />
            <View style={{flexDirection: 'column', width: '80%'}}>
              <Text style={styles.textName} numberOfLines={1}>
                {data.lItems[0].name}
              </Text>
              <Text style={styles.textName}>
                <Text style={{color: '#000000', fontWeight: '400'}}>
                  Giá bán:
                </Text>{' '}
                {formatPrice(data.lItems[0].price)}
              </Text>
            </View>
            <Image
              style={{width: 7, height: 13}}
              source={require('../../assets/vectorRight.png')}
            />
          </View>
        </>
      )}

      <View style={styles.line}></View>

      <View style={styles.rowFooter}>
        <Text
          style={{fontSize: 14, color: '#000000', fontFamily: 'Montserrat'}}>
          {data.lItems.length} sản phẩm
        </Text>
        <Text style={styles.textTotal}>{formatPrice(data.total)}</Text>
      </View>
    </Pressable>
  );
};

export default React.memo(
  SingleMenu,
  (pre, next) => JSON.stringify(pre) === JSON.stringify(next),
);
