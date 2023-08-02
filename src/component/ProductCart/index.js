import React, {useState, useEffect, useCallback} from 'react';
import {Image, Pressable, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import Checkbox from '../Checkbox';

const ProductCart = ({
  title,
  price,
  image,
  onChecked,
  style,
  allCheck,
  sl,
  onQtyChange,
  debounceTime = 400,
}) => {
  const [agreed, setAgreed] = useState(false);
  const [qty, setQty] = useState(sl);
  // debouce when user change quantity is fast
  let quantityDebounceTimer;
  const quantityDebouncing = useCallback(quantity => {
    clearTimeout(quantityDebounceTimer);

    if (quantity < 1) {
      onQtyChange(quantity);
    } else {
      quantityDebounceTimer = setTimeout(() => {
        onQtyChange(quantity);
      }, debounceTime);
    }
  }, []);

  useEffect(() => {
    quantityDebouncing(qty);
  }, [qty]);

  const onCheckbox = value => {
    setAgreed(value);
    onChecked(value);
  };

  return qty < 1 ? null : (
    <View style={[styles.container, style]}>
      <Checkbox onChecked={onCheckbox} check={allCheck} />
      <Pressable
        style={({pressed}) => [
          styles.rightContainer,
          pressed
            ? {
                backgroundColor: 'rgba(255,255,255,0.9)',
              }
            : {
                backgroundColor: 'rgba(255,255,255,1)',
              },
        ]}>
        <Image style={styles.image} source={image} />
        <View style={styles.rightCard}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <View style={styles.rowPriceSL}>
            <Text style={{color: '#005AA9', fontSize: 16}}>{price}</Text>
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
      </Pressable>
    </View>
  );
};

export default React.memo(ProductCart);
