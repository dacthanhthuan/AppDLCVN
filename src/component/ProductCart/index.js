import React, { useState, useEffect } from 'react';
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import Checkbox from '../Checkbox';


const ProductCart = ({ title, price, image, onChecked, style, allCheck, sl, onPressMinus, onPressPlus }) => {
  const [agreed, setAgreed] = useState(false);

  const onCheckbox = value => {
    setAgreed(value);
    onChecked(value);
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
            <Text style={{ color: '#005AA9', fontSize: 16 }}>{price}</Text>
            <View style={styles.rowSL}>
              <Pressable hitSlop={10} onPress={onPressMinus}>
                <Text style={styles.buttonSL}>-</Text>
              </Pressable>
              <Text style={styles.buttonSL}>{sl}</Text>
              <Pressable hitSlop={10} onPress={onPressPlus}>
                <Text style={styles.buttonSL}>+</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default React.memo(ProductCart);
