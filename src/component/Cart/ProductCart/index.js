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

const ProductCart = ({item, index, debounceTime = 400}) => {
  const [qty, setQty] = useState(item?.quantity);
  const [initialRender, setInitialRender] = useState(true);
  const dispatch = useDispatch();
  const allcheckDispatch = useDispatchAllCheck();

  const decrement =
    item.product.decrement != 0 ? item.product.decrement : undefined;
  const decrementPrice =
    parseInt(item.product.price) * ((100 - parseInt(decrement)) / 100);

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
      <CheckBoxInFlatList index={index} />
      <View style={styles.rightContainer}>
        {decrement ? (
          <Text style={styles.decrementBadge}>-{decrement}%</Text>
        ) : null}
        <Image
          style={styles.image}
          source={
            item?.product?.img_1
              ? {uri: item?.product?.img_1}
              : require('../../../assets/noimage.png')
          }
        />
        <View style={styles.rightCard}>
          <Text style={styles.title} numberOfLines={1}>
            {item?.product?.product_name}
          </Text>
          <View style={styles.rowPriceSL}>
            <Text style={[styles.price, decrement ? styles.stroke_line : null]}>
              {item?.pType === 'point'
                ? formatPoint(item?.product.price)
                : formatPrice(item?.product.price)}
            </Text>
            {decrement ? (
              <Text style={styles.decrementPrice}>
                {item?.pType === 'point'
                  ? formatPoint(decrementPrice)
                  : formatPrice(decrementPrice)}
              </Text>
            ) : null}
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
          </View>
        </View>
      </View>
    </Swipeable>
  );
};

export default React.memo(ProductCart, (pre, next) => {
  return JSON.stringify(pre.item) === JSON.stringify(next.item);
});
