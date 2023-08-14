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

/**
 *
 * @returns PointCart Screen
 */
const PointCart = () => {
  const isReady = useIsReady();
  const navigation = useNavigation();
  const cartData = useSelector(state => state.cart.point);
  const isLogin = useSelector(state => state.user.login.status);
  const allcheck = useAllCheck();

  const [totalpoint, setTotalpoint] = useState(0);
  const [totalDecrementpoint, setTotalDecrementpoint] = useState(0);
  const [productOrder, setProductOrder] = useState([]);

  // price calculate
  useEffect(() => {
    let totalPoint = 0;
    let totalDecrementPoint = 0;
    let products = [];

    allcheck.checkboxs.map(unique => {
      let product = cartData.at(unique);
      let decrement = product?.product?.decrement;
      products.push(product);
      totalPoint +=
        parseInt(product.product.price) * parseInt(product.quantity);
      totalDecrementPoint +=
        parseInt(product.product.price) *
        parseInt(product.quantity) *
        ((100 - parseInt(decrement)) / 100);
    });

    setTotalpoint(totalPoint);
    setTotalDecrementpoint(totalDecrementPoint);
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
        text="Giỏ hàng ví điểm"
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
              color: 'green',
              fontWeight: '500',
            }}>
            {formatPoint(totalDecrementpoint)}
          </Text>
        </View>
      </View>
      <Button
        text="Tạo đơn"
        onPress={() =>
          isLogin && productOrder.length > 0
            ? navigation.navigate('CreateOrder', {
                products: productOrder,
                totalPoint: totalpoint,
                totalDecrementPoint: totalDecrementpoint,
                type: 'point_payment',
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
      <PointCart />
    </AllCheckProvider>
  );
}

export default React.memo(WrapperCart);
