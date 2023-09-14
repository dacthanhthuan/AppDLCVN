import React, {useState, useEffect, useCallback} from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import styles from './styles';
import {Swipeable} from 'react-native-gesture-handler';
import DeleteProductIcon from '../DeleteProductIcon';
import {useDispatch} from 'react-redux';
import {formatPrice, formatPoint} from '../../../global';
import {
  changeProductQuantity,
  rmProductFromCart,
} from '../../../redux/actions/cartActions';
import CheckBoxInFlatList from '../AllCheckBoxGroup/CheckBoxInFlatList';
import {
  useDispatchAllCheck,
  AllCheckActions,
} from '../AllCheckBoxGroup/context';
import {TouchableOpacity} from 'react-native';

const ProductCart = ({item, index, debounceTime = 400, onFixPress}) => {
  const [qty, setQty] = useState(item?.quantity);
  const [initialRender, setInitialRender] = useState(true);
  const dispatch = useDispatch();
  const allcheckDispatch = useDispatchAllCheck();

  const decrementInCart = item?.decrementInCart
    ? parseFloat(item?.decrementInCart)
    : 0;
  const price = item?.priceInCart
    ? parseFloat(item?.priceInCart) -
      parseFloat(item?.priceInCart) * (decrementInCart / 100)
    : parseFloat(item?.product?.price);
  const profit =
    parseFloat(item?.product?.price) *
    (parseFloat(item?.product?.decrement) / 100);
  const importPrice = parseFloat(item?.product?.price) - profit;

  // debouce when user change quantity is fast
  let quantityDebounceTimer;

  const quantityDebouncing = useCallback(quantity => {
    clearTimeout(quantityDebounceTimer);

    if (quantity < 1) {
      dispatch(
        rmProductFromCart({
          productId: item.product.product_id,
          quantity: 0,
          pType: item?.pType,
        }),
      );

      allcheckDispatch(AllCheckActions.Delete_Check_Box(index));
    } else {
      quantityDebounceTimer = setTimeout(() => {
        dispatch(
          changeProductQuantity({
            productId: item.product.product_id,
            quantity: quantity,
            pType: item?.pType,
          }),
        );
      }, debounceTime);
    }
  }, []);

  useEffect(() => {
    if (!initialRender) {
      quantityDebouncing(qty);
    }
    setInitialRender(false);
  }, [qty]);

  useEffect(() => {
    setQty(item.quantity);
  }, [item]);

  return qty < 1 ? null : (
    <Swipeable
      childrenContainerStyle={styles.container}
      renderRightActions={() => (
        <DeleteProductIcon
          onPress={() => {
            dispatch(
              rmProductFromCart({
                productId: item.product.product_id,
                quantity: 0,
                pType: item?.pType,
              }),
            );

            allcheckDispatch(AllCheckActions.Delete_Check_Box(index));
          }}
        />
      )}>
      <CheckBoxInFlatList index={index}>
        <View style={styles.rightContainer}>
          <Image
            style={styles.image}
            source={
              item?.product?.img_1
                ? {uri: item?.product?.img_1}
                : require('../../../assets/noimage.png')
            }
          />

          <View style={styles.rightCard}>
            <Text style={styles.title} numberOfLines={2}>
              {item?.product?.product_name}
            </Text>

            <Text>
              Giá nhập:{' '}
              <Text>
                {item?.pType === 'point'
                  ? formatPoint(importPrice)
                  : formatPrice(importPrice)}
              </Text>
            </Text>

            <View style={styles.rowPriceSL}>
              <Text>
                Giá bán:{' '}
                <Text style={styles.price}>
                  {item?.pType === 'point'
                    ? formatPoint(price)
                    : formatPrice(price)}
                </Text>
              </Text>
              {item.decrementInCart != 0 &&
                item.decrementInCart != undefined && (
                  <Text style={styles.decrementBadge}>
                    -{item.decrementInCart}%
                  </Text>
                )}
            </View>

            <View style={styles.rowPriceSL}>
              <View style={styles.rowSL}>
                <Pressable
                  hitSlop={10}
                  onPress={() => {
                    setQty(qty => qty - 1);
                  }}>
                  <Text style={styles.buttonSL}>-</Text>
                </Pressable>
                <Text style={styles.buttonSL}>{qty}</Text>
                <Pressable
                  hitSlop={10}
                  onPress={() => {
                    setQty(qty => qty + 1);
                  }}>
                  <Text style={styles.buttonSL}>+</Text>
                </Pressable>
              </View>

              <TouchableOpacity
                style={styles.fixButton}
                hitSlop={10}
                onPress={onFixPress}>
                <Text style={styles.fixLabel}>Sửa</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </CheckBoxInFlatList>
    </Swipeable>
  );
};

export default React.memo(ProductCart, (pre, next) => {
  return JSON.stringify(pre) === JSON.stringify(next);
});
