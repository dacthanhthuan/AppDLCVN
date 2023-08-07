import React, {useState, useEffect, useCallback} from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import styles from './styles';
import {Swipeable} from 'react-native-gesture-handler';
import DeleteProductIcon from '../DeleteProductIcon';
import {useDispatch} from 'react-redux';
import {formatPrice, formatPoint} from '../../../MyGlobal';
import {
  changeProductQuantity,
  rmProductFromCart,
} from '../../../redux/actions/cartActions';
import CheckBoxInFlatList from '../AllCheckBoxGroup/CheckBoxInFlatList';

const ProductCart = ({item, unique, debounceTime = 400}) => {
  const [qty, setQty] = useState(item?.quantity);
  const [initialRender, setInitialRender] = useState(true);
  const dispatch = useDispatch();

  // set quantity if item change
  useEffect(() => {
    setQty(item.quantity);
  }, [item]);

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
          }}
        />
      )}>
      <CheckBoxInFlatList unique={unique} />
      <View style={styles.rightContainer}>
        <Image style={styles.image} source={{uri: item?.product?.img_1}} />
        <View style={styles.rightCard}>
          <Text style={styles.title} numberOfLines={1}>
            {item?.product?.product_name}
          </Text>
          <View style={styles.rowPriceSL}>
            <Text style={{color: '#005AA9', fontSize: 16}}>
              {item?.pType === 'point'
                ? formatPoint(item?.product.price)
                : formatPrice(item?.product.price)}
            </Text>
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
  return JSON.stringify(pre) === JSON.stringify(next);
});
