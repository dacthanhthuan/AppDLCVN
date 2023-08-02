import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import styles from './style';

const Information = ({
  text_1,
  text_2,
  text_3,
  price_1,
  price_11,
  price_2,
  price_22,
  price_3,
  price_33,
  style_t1,
  style_t2,
  style_t3,
  style_p1,
  style_p11,
  style_p2,
  style_p22,
  style_p3,
  style_p33,
}) => {
  return (
    <SafeAreaView style={styles.container_1}>
      {text_1 || price_1 ? (
        <View style={styles.container_2}>
          <Text style={[styles.text_1, style_t1]}>{text_1}</Text>
          <View style={styles.container_3}>
            {price_1 ? (
              <Text style={[styles.price_1, style_p1]}>{price_1}</Text>
            ) : null}
            {price_11 ? (
              <Text style={[styles.price_1, style_p11]}>{price_11}</Text>
            ) : null}
          </View>
        </View>
      ) : null}
      {text_2 || price_2 ? (
        <View style={styles.container_2}>
          {price_2 ? (
            <Text style={[styles.text_1, style_t2]}>{text_2}</Text>
          ) : null}
          <View style={styles.container_3}>
            <Text style={[styles.price_1, style_p2]}>{price_2}</Text>
            {price_22 ? (
              <Text style={[styles.price_1, style_p22]}>{price_22}</Text>
            ) : null}
          </View>
        </View>
      ) : null}
      {text_3 || price_3 ? (
        <View style={styles.container_2}>
          <Text style={[styles.text_1, style_t3]}>{text_3}</Text>
          <View style={styles.container_3}>
            {price_3 ? (
              <Text style={[styles.price_1, style_p3]}>{price_3}</Text>
            ) : null}
            {price_33 ? (
              <Text style={[styles.price_1, style_p33]}>{price_33}</Text>
            ) : null}
          </View>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default Information;
