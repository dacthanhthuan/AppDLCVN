import React from 'react';
import {Image, Text, Pressable, View} from 'react-native';
import styles from './styles';

const CardProduct = ({title, categori, price, style, image, onPress}) => {
  return (
    <View style={[styles.container, style]}>
      <Pressable
        style={({pressed}) => [
          styles.containerView,
          pressed ? {opacity: 0.8} : {opacity: 1},
        ]}
        onPress={onPress}>
        <Image style={styles.image} resizeMode="contain" source={image} />
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.id}>{categori}</Text>
        <Text style={styles.price}>{price}</Text>
      </Pressable>
    </View>
  );
};

export default React.memo(CardProduct);
