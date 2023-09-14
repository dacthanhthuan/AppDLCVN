import {
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  formatPrice,
  formatDecimal,
} from '../../global';
import {memo} from 'react';
import {StyleSheet, View, Text, Pressable, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {addProduct2Cart} from '../../redux/actions/cartActions';

const Product = ({item}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const goToDetailProduct = () => {
    navigation.navigate('DetailProduct', {product: item, type: 'money'});
  };

  const sales = formatPrice(item?.sales);
  const price = formatPrice(item?.price);
  const profit = formatPrice(
    parseInt(item?.price) * (parseInt(item?.decrement) / 100),
  );
  const caschback = formatDecimal.format(
    parseFloat(item?.cashback_point).toFixed(2),
  );

  return (
    <View style={[styles.renderItem]}>
      <Pressable
        onPress={goToDetailProduct}
        style={({pressed}) => [
          styles.renderPressable,
          pressed ? {opacity: 0.8} : null,
        ]}>
        <Image
          source={
            item?.img_1
              ? {uri: item?.img_1}
              : require('../../assets/noimage.png')
          }
          style={[styles.renderImage]}
          resizeMode="contain"
        />

        <Text style={styles.renderTitle} numberOfLines={1}>
          {item?.product_name}
        </Text>

        {item?.sales != 0 && (
          <Text style={styles.renderProductId} numberOfLines={1}>
            Giá gốc: <Text style={[styles.renderDecrement]}>{sales}</Text>
          </Text>
        )}

        <Text style={styles.renderProductId} numberOfLines={1}>
          Giá bán: <Text style={[styles.renderPrice]}>{price}</Text>
        </Text>

        {item?.decrement != 0 && (
          <Text style={styles.renderProductId} numberOfLines={1}>
            Lợi nhuận: <Text style={styles.renderProfit}>{profit}</Text>
          </Text>
        )}

        {item?.cashback_point != 0 && (
          <Text style={styles.renderProductId} numberOfLines={1}>
            Tích điểm: <Text style={styles.renderCommission}>{caschback}</Text>
          </Text>
        )}

        <Pressable
          style={({pressed}) => [
            styles.addToCartContainer,
            pressed ? {opacity: 0.5} : null,
          ]}
          onPress={() => {
            dispatch(
              addProduct2Cart({
                product: item,
                quantity: 1,
                pType: 'money',
              }),
            );
          }}>
          <Text style={styles.addToCart}>+</Text>
        </Pressable>
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
    height: 280,
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
    height: '50%',
    width: '90%',
    alignSelf: 'center',
  },

  renderTitle: {
    paddingVertical: '1%',
    fontSize: 16,
    paddingVertical: 8,
    color: '#005AA9',
    fontWeight: '400',
  },

  renderProductId: {
    paddingVertical: '1%',
    fontSize: 13,
    color: '#8B8787',
  },

  renderPrice: {
    fontSize: 14,
    color: '#005AA9',
    fontWeight: '500',
  },

  renderCommission: {
    fontSize: 13,
    color: '#1A5D1A',
    fontWeight: '500',
  },

  renderProfit: {
    fontSize: 13,
    color: '#141E46',
    fontWeight: '500',
  },

  renderDecrement: {
    fontSize: 13,
    color: 'red',
    textDecorationLine: 'line-through',
    fontWeight: '500',
  },

  decrementBadge: {
    width: 35,
    height: 35,
    backgroundColor: 'red',
    color: 'white',
    borderRadius: 20,
    position: 'absolute',
    right: 5,
    top: 5,
    textAlign: 'center',
    verticalAlign: 'middle',
    zIndex: 1,
    fontSize: 13,
  },

  addToCartContainer: {
    width: 35,
    height: 35,
    position: 'absolute',
    bottom: 2,
    right: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  addToCart: {
    fontSize: 20,
    color: 'white',
    backgroundColor: '#005aa9',
    width: '80%',
    height: '80%',
    textAlign: 'center',
    verticalAlign: 'middle',
    borderRadius: 20,
  },
});
