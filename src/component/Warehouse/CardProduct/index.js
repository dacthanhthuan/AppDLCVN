import React from 'react';
import {Image, Text, Pressable, View} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {formatPoint} from '../../../MyGlobal';

const CardProduct = ({item}) => {
  const navigation = useNavigation();

  const navigateToDetailProduct = () => {
    navigation.navigate('DetailProduct', {product: item, type: 'point'});
  };

  const decrement = item.decrement != 0 ? item.decrement : undefined;
  const priceDecrement = formatPoint(
    parseInt(item?.price) * ((100 - parseInt(decrement)) / 100),
  );

  return (
    <View style={[styles.container]}>
      <Pressable
        style={({pressed}) => [
          styles.containerView,
          pressed ? {opacity: 0.8} : {opacity: 1},
        ]}
        onPress={navigateToDetailProduct}>
        {decrement ? (
          <Text style={styles.decrementBadge}>-{decrement}%</Text>
        ) : null}
        <Image
          style={styles.image}
          resizeMode="contain"
          source={{uri: item.img_1}}
        />
        <Text style={styles.title} numberOfLines={1}>
          {item.product_name}
        </Text>
        <Text style={styles.id}>{item.product_id}</Text>
        <Text style={[styles.price, decrement ? styles.stroke_text : null]}>
          {formatPoint(item.price)}
        </Text>
        {decrement ? (
          <Text style={styles.renderDecrement}>{priceDecrement}</Text>
        ) : null}
      </Pressable>
    </View>
  );
};

export default React.memo(CardProduct);
