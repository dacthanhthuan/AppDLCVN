import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import styles from "./styles";
import ProductCart from "../../component/ProductCart";
import Checkbox from "../../component/Checkbox/index";
import Button from "../../component/Button";
import { Swipeable } from "react-native-gesture-handler";
import Header from "../../component/Header";

const Cart = ({ navigation, route }) => {
  const { quantity, item } = route?.params || {};

  console.log("item", item);
  console.log("quantity", quantity);

  const [agreed, setAgreed] = useState(false);
  const [productData, setProductData] = useState([item]);

  const onCheckboxAll = () => {
    setAgreed(value => !value);
  };

  const onPressClearCard = (productId) => {
    const updatedProductData = productData.filter(item => item.id !== productId);
    setProductData(updatedProductData);
  };

  const clearCard = (productId) => {
    return (
      <TouchableOpacity onPress={() => onPressClearCard(productId)} style={{ alignItems: 'center', justifyContent: 'center', padding: 12 }}>
        <Image style={{ width: 22, height: 24 }} resizeMode="contain" source={require('../../assets/clearCart.png')} />
      </TouchableOpacity>
    );
  };

  // Không có đơn hàng chuyển qua trang NoOrders
  useEffect(() => {
    if (productData.length === 0) {
      navigation.navigate('CardEmpty');
    }
  }, [productData, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        iconLeft={require('../../assets/Arrow1.png')}
        text='Giỏ hàng'
        onPressLeft={() => { navigation.goBack() }}
      />

      <FlatList
        data={productData}
        style={{ marginTop: 35 }}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => {
          return (
            <Swipeable renderRightActions={() => clearCard(item.id)}>
              <ProductCart
                sl={quantity}
                title={item.title}
                price={item.price}
                image={item.image}
                checked={agreed}
              />
            </Swipeable>
          );
        }}
      />

      <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Checkbox onPress={onCheckboxAll} checked={agreed} />
          <Text style={{ fontSize: 14, color: '#000000', marginLeft: 10 }}>Chọn tất cả</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 14, color: '#000000', marginLeft: 10 }}>Tổng giá bán</Text>
          <Text style={{ fontSize: 16, color: '#000000', marginLeft: 10, fontWeight: '500' }}>2,500,000 đ</Text>
        </View>
      </View>
      <Button text='Tạo đơn' onPress={() => navigation.navigate('CreateOrder')} />
    </SafeAreaView>
  );
};

export default React.memo(Cart);
