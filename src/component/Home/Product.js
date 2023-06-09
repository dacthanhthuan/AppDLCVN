import {WINDOW_WIDTH, WINDOW_HEIGHT, formatprice} from '../../global';
import {memo} from 'react';
import {StyleSheet, View, Text, Pressable, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Product = ({item}) => {
  const navigation = useNavigation();

  const goToDetailProduct = () => {
    navigation.navigate('DetailProduct', {item});
  };
  const price = formatprice(item?.price);
  const commission = formatprice(item?.commission);

  return (
    <View style={[styles.renderItem]}>
      <Pressable
        onPress={goToDetailProduct}
        style={({pressed}) => [
          styles.renderPressable,
          pressed ? {opacity: 0.8} : null,
        ]}>
        <Image
          source={item?.source}
          style={[styles.renderImage]}
          resizeMode="contain"
        />
        <Text style={styles.renderTitle} numberOfLines={2}>
          {item?.title}
        </Text>
        <Text style={styles.renderProductId} numberOfLines={1}>
          {item?.idProduct}
        </Text>
        <Text style={styles.renderProductId} numberOfLines={1}>
          Giá bán: <Text style={styles.renderPrice}>{price}</Text>
        </Text>
        <Text style={styles.renderProductId} numberOfLines={1}>
          Hoa hồng: <Text style={styles.renderCommission}>{commission}</Text>
        </Text>
      </Pressable>
    </View>
  );
};

export default memo(Product, (pre, next) => {
  return JSON.stringify(pre.item) === JSON.stringify(next.item);
});

const styles = StyleSheet.create({
  renderItem: {
    width: (WINDOW_WIDTH * 0.94) / 2,
    height: WINDOW_HEIGHT * 0.35,
    backgroundColor: 'white',
    justifyContent: 'center',
  },

  renderPressable: {
    width: '96%',
    height: '96%',
    borderRadius: 7,
    alignSelf: 'center',
    backgroundColor: 'white',
    elevation: 3,
    justifyContent: 'center',
    paddingHorizontal: '8%',
  },

  renderImage: {
    height: '45%',
    width: '90%',
    alignSelf: 'center',
  },

  renderTitle: {
    paddingVertical: '1%',
    fontSize: 16,
    color: '#005AA9',
    fontWeight: '400',
  },

  renderProductId: {
    paddingVertical: '1%',
    fontSize: 13,
    color: '#8B8787',
  },

  renderPrice: {
    fontSize: 13,
    color: '#005AA9',
    fontWeight: '500',
  },

  renderCommission: {
    fontSize: 13,
    color: '#19A538',
    fontWeight: '500',
  },
});
