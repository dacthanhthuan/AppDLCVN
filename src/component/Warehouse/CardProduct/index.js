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
        <Text style={styles.id}>{item.product_id}</Text>
        <Text style={styles.price}>{formatPoint(item.price)}</Text>
      </Pressable>
    </View>
  );
};

export default React.memo(CardProduct);
