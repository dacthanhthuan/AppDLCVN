import React, {useState, useEffect, useCallback} from 'react';
import {SafeAreaView, View, Text, FlatList, ToastAndroid} from 'react-native';
import styles from './styles';
import ProductCart from '../../component/Cart/ProductCart';
import Button from '../../component/Button';
import Header from '../../component/Header';
import {formatPoint, formatPrice, useIsReady} from '../../global';
import {useSelector} from 'react-redux';
import CartEmpty from '../CartEmpty';
import {
  AllCheckProvider,
  useAllCheck,
} from '../../component/Cart/AllCheckBoxGroup/context';
import {useNavigation} from '@react-navigation/native';
import AllCheckBox from '../../component/Cart/AllCheckBoxGroup/AllCheckBox';
import LoadingOverlay from '../../component/LoadingOverlay';
import {
  OrderAddressActions,
  useOrderAddressDispatch,
} from '../../component/OrderAddressContext';
// Vấn đề check-all box và hướng giải quyết: xem <AllCheckBoxGroup />
/**
 * ** Ngoài ra, còn có thể sử dụng OnLayout nếu các component render ra có cùng kích thước
 * để tối ưu hiệu suất.
 */

/**
 *
 * @returns WalletCart screen
 */
const WalletCart = () => {
  const isReady = useIsReady();
  const navigation = useNavigation();
  const cartData = useSelector(state => state.cart.wallet);
  const isLogin = useSelector(state => state.user.login.status);
  const allcheck = useAllCheck();
  const orderAddressDispatch = useOrderAddressDispatch();

  const [totalprice, setTotalprice] = useState(0);
  const [totalDecrementprice, setTotalDecrementprice] = useState(0);
  const [productOrder, setProductOrder] = useState([]);

  // clear order address when user go to cart
  useEffect(() => {
    orderAddressDispatch(OrderAddressActions.clear());
  }, []);

  // price calculate
  useEffect(() => {
    let totalPrice = 0;
    let totalDecrementPrice = 0;
    let products = [];

    allcheck.checkboxs.map(unique => {
      let product = cartData.at(unique);
      let decrement = product?.product?.decrement;
      products.push(product);

      totalPrice +=
        parseInt(product?.product?.price) * parseInt(product?.quantity);
      totalDecrementPrice +=
        parseInt(product?.product.price) *
        parseInt(product?.quantity) *
        ((100 - parseInt(decrement)) / 100);
    });

    setTotalprice(totalPrice);
    setTotalDecrementprice(totalDecrementPrice);
    setProductOrder(products);
  }, [allcheck.checkboxs, cartData]);

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
            {formatPrice(totalDecrementprice)}
          </Text>
        </View>
      </View>
      <Button
        text="Tạo đơn"
        onPress={() =>
          isLogin && productOrder.length > 0
            ? navigation.navigate('CreateOrder', {
                products: productOrder,
                totalPrices: totalprice,
                totalDecrementPrices: totalDecrementprice,
                type: 'money_payment',
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
  return <ProductCart item={item} index={index} />;
}

function WrapperCart() {
  return (
    <AllCheckProvider>
      <WalletCart />
    </AllCheckProvider>
  );
}

export default React.memo(WrapperCart);
