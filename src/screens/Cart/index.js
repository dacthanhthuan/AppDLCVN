import React, {useState, useEffect, useCallback} from 'react';
import {SafeAreaView, View, Text, FlatList, ToastAndroid} from 'react-native';
import styles from './styles';
import ProductCart from '../../component/Cart/ProductCart';
import Button from '../../component/Button';
import Header from '../../component/Header';
import {formatPoint, formatPrice, useIsReady} from '../../MyGlobal';
import {useSelector} from 'react-redux';
import CartEmpty from '../CartEmpty';
import {
  AllCheckProvider,
  useAllCheck,
} from '../../component/Cart/AllCheckBoxGroup/context';
import {useNavigation} from '@react-navigation/native';
import AllCheckBox from '../../component/Cart/AllCheckBoxGroup/AllCheckBox';
import LoadingOverlay from '../../component/LoadingOverlay';
// Vấn đề check-all box và hướng giải quyết: xem <AllCheckBoxGroup />
/**
 * ** Ngoài ra, còn có thể sử dụng OnLayout nếu các component render ra có cùng kích thước
 * để tối ưu hiệu suất.
 */
const Cart = () => {
  const isReady = useIsReady();
  const navigation = useNavigation();
  const cartData = useSelector(state => state.cart.data);
  const isLogin = useSelector(state => state.user.login.status);
  const allcheck = useAllCheck();

  const [totalprice, setTotalprice] = useState(0);
  const [totalpoint, setTotalpoint] = useState(0);
  const [productOrder, setProductOrder] = useState([]);

  // price calculate
  useEffect(() => {
    let totalPrice = 0;
    let totalPoint = 0;
    let products = [];

    allcheck.checkboxs.map(unique => {
      let product = cartData.at(unique);
      products.push(product);
      if (product.pType === 'point') {
        totalPoint +=
          parseInt(product.product.price) * parseInt(product.quantity);
      } else {
        totalPrice +=
          parseInt(product.product.price) * parseInt(product.quantity);
      }
    });

    setTotalprice(totalPrice);
    setTotalpoint(totalPoint);
    setProductOrder(products);
  }, [allcheck.checkboxs]);

  if (!isReady) {
    return <LoadingOverlay />;
  }

  return cartData.length === 0 ? (
    <CartEmpty />
  ) : (
    <SafeAreaView style={styles.container}>
      <Header
        iconLeft={require('../../assets/Arrow1.png')}
        text="Giỏ hàng"
        onPressLeft={() => {
          navigation.goBack();
        }}
      />

      <FlatList
        data={cartData}
        style={{marginTop: 35}}
        renderItem={RenderItem}
        removeClippedSubviews
        showsVerticalScrollIndicator={false}
        getItemLayout={(_, index) => {
          return {length: 80, offset: index * 80, index};
        }}
        initialNumToRender={6}
        windowSize={11}
        keyExtractor={(item, index) => item.product.product_id + index}
      />

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <AllCheckBox dataLength={cartData.length} text={'Chọn tất cả'} />

        <View style={{flexDirection: 'column', alignItems: 'flex-end'}}>
          <Text style={{fontSize: 13, color: '#000000'}}>Tổng giá bán</Text>
          <Text
            style={{
              fontSize: 16,
              color: '#000000',
              fontWeight: '500',
            }}>
            {formatPrice(totalprice)}
          </Text>
          {totalpoint > 0 ? (
            <Text
              style={{
                fontSize: 16,
                color: 'green',
                fontWeight: '500',
              }}>
              {formatPoint(totalpoint)}
            </Text>
          ) : null}
        </View>
      </View>
      <Button
        text="Tạo đơn"
        onPress={() =>
          isLogin && productOrder.length > 0
            ? navigation.navigate('CreateOrder', {
                products: productOrder,
                totalPrices: totalprice,
                totalPoint: totalpoint,
              })
            : productOrder.length == 0
            ? ToastAndroid.show('Chưa chọn mặt hàng', ToastAndroid.LONG)
            : navigation.navigate('Login')
        }
      />
    </SafeAreaView>
  );
};

function RenderItem({item, index}) {
  return <ProductCart item={item} unique={index} />;
}

function WrapperCart() {
  return (
    <AllCheckProvider>
      <Cart />
    </AllCheckProvider>
  );
}

export default React.memo(WrapperCart);
