import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { WINDOW_WIDTH } from '../../../global';
import { memo } from 'react';
import { useNavigation } from '@react-navigation/native';

const VerticalProduct = ({ data }) => {
  const navigation = useNavigation();

  const goToDetailProduct = () => {
    navigation.navigate('DetailProduct', { item: data });
  };

  const formatCurrency = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  const price = formatCurrency.format(data.price).replace(/\./g, ',');
  const priceBefore = formatCurrency.format(data.priceBefore).replace(/\./g, ',');
  const commission = formatCurrency.format(data.commission).replace(/\./g, ',');

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.containerPressable,
          pressed ? { opacity: 0.5 } : null,
        ]}
        onPress={() => goToDetailProduct()}>
        <Image source={data.source} style={styles.image} resizeMode="contain" />
        <Text style={styles.promotion} numberOfLines={2}>
          {data.promotion.title}
        </Text>
        <View style={styles.secondCont}>
          <Text style={styles.title} numberOfLines={2}>
            {data.title}
          </Text>
          <View style={styles.priceAndComContainer}>
            <Text style={[styles.secondTitle]}>Giá bán: </Text>
            {data.price === data.priceBefore ? (
              <Text style={styles.price} numberOfLines={2}>
                {price}
              </Text>
            ) : (
              <>
                <Text style={styles.priceStroke} numberOfLines={2}>
                  {price}
                </Text>
                <Text style={[styles.price, { left: 15 }]} numberOfLines={2}>
                  {priceBefore}
                </Text>
              </>
            )}
          </View>
          <View style={styles.priceAndComContainer}>
            <Text style={styles.secondTitle}>Hoa hồng:</Text>
            <Text style={styles.commission}>{commission}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default memo(VerticalProduct, (pre, next) => {
  return JSON.stringify(pre.data) === JSON.stringify(next.data);
});

const styles = StyleSheet.create({
  container: {
    height: 130,
    width: WINDOW_WIDTH * 0.96,
    backgroundColor: 'white',
  },

  containerPressable: {
    width: '96%',
    height: '92%',
    borderRadius: 5,
    elevation: 3,
    backgroundColor: 'white',
    alignSelf: 'center',
  },

  secondCont: {
    top: '10%',
    left: '30%',
  },

  image: {
    position: 'absolute',
    width: '25%',
    height: '60%',
    top: '20%',
    left: '3%',
  },

  title: {
    fontSize: 16,
    color: 'black',
    fontWeight: '400',
    width: '48%',
  },

  priceStroke: {
    color: '#8B8787',
    fontSize: 13,
    fontWeight: '400',
    textDecorationLine: 'line-through',
  },

  price: {
    color: '#005AA9',
    fontSize: 13,
    fontWeight: '500',
  },

  secondTitle: {
    color: 'black',
    fontSize: 13,
    width: 72,
  },

  commission: {
    color: '#F5CC18',
    fontSize: 13,
    fontWeight: '500',
  },

  priceAndComContainer: {
    flexDirection: 'row',
    marginTop: '2%',
    marginBottom: '1%',
  },

  promotion: {
    position: 'absolute',
    fontSize: 11,
    color: 'white',
    fontWeight: '500',
    top: '10%',
    right: '3%',
    width: '17%',
    backgroundColor: '#F0958E',
    textAlign: 'center',
  },
});
