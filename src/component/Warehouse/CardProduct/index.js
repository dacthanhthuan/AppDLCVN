import React from 'react';
import {Image, Text, Pressable, View} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {formatPoint, formatDecimal} from '../../../global';
import {useDispatch} from 'react-redux';
import {addProduct2Cart} from '../../../redux/actions/cartActions';

const CardProduct = ({item}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const navigateToDetailProduct = () => {
    navigation.navigate('DetailProduct', {product: item, type: 'point'});
  };

  const sales = formatPoint(item?.sales);
  const price = formatPoint(item?.price);
  const profit = formatPoint(
    parseInt(item?.price) * (parseInt(item?.decrement) / 100),
  );
  const caschback = formatDecimal.format(
    parseFloat(item?.cashback_point).toFixed(2),
  );

  return (
    <View style={[styles.container]}>
      <Pressable
        style={({pressed}) => [
          styles.containerView,
          pressed ? {opacity: 0.8} : {opacity: 1},
        ]}
        onPress={navigateToDetailProduct}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={{uri: item.img_1}}
        />
        <Text style={styles.title} numberOfLines={1}>
          {item.product_name}
        </Text>

        {item.sales && item.sales > 0 && (
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
                pType: 'point',
              }),
            );
          }}>
          <Text style={styles.addToCart}>+</Text>
        </Pressable>
      </Pressable>
    </View>
  );
};

export default React.memo(CardProduct);
