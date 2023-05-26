import React, {useState, useEffect} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import Checkbox from '../Checkbox';

const ProductCart = ({title, price, image, onChecked, style, allCheck}) => {
  const [agreed, setAgreed] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const onCheckbox = value => {
    setAgreed(value);
    onChecked(value);
  };

  // Tăng số lượng
  const increase = () => {
    setQuantity(quantity + 1);
  };

  // Giảm số lượng
  const reduce = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <Checkbox onChecked={onCheckbox} check={allCheck} />
      <View style={styles.rightContainer}>
        <TouchableOpacity>
          <Image style={styles.image} source={image} />
        </TouchableOpacity>
        <View style={styles.rightCard}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.rowPriceSL}>
            <Text style={{color: '#005AA9', fontSize: 16}}>{price} đ</Text>
            <View style={styles.rowSL}>
              <TouchableOpacity onPress={reduce}>
                <Text style={styles.buttonSL}>-</Text>
              </TouchableOpacity>
              <Text style={styles.buttonSL}>{quantity}</Text>
              <TouchableOpacity onPress={increase}>
                <Text style={styles.buttonSL}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default React.memo(ProductCart);
