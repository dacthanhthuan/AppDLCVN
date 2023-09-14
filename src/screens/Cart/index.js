import React, {useState, useEffect, useCallback, useRef} from 'react';
import {SafeAreaView, View, Text, FlatList, ToastAndroid} from 'react-native';
import styles from './styles';
import ProductCart from '../../component/Cart/ProductCart';
import Button from '../../component/Button';
import Header from '../../component/Header';
import {formatPoint, formatPrice, useIsReady} from '../../global';
import {useDispatch, useSelector} from 'react-redux';
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
import {riseNormalError} from '../../redux/actions/errorHandlerActions';
import FixProduct from '../../component/Cart/FixProduct';
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

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const cartData = useSelector(state => state.cart.wallet);
  const isLogin = useSelector(state => state.user.login.status);
  const allcheck = useAllCheck();
  const orderAddressDispatch = useOrderAddressDispatch();

  const [priceAll, setPriceAll] = useState(0);
  const [importPriceAll, setImportPriceAll] = useState(0);
  const [profitAll, setProfitAll] = useState(0);
  const [productOrder, setProductOrder] = useState([]);
  const priceOriginal = useRef();
  const profitOriginal = useRef();

  const [fixProductVisble, setFixProductVisible] = useState(false);
  const [fixProduct, setFixProduct] = useState(null);

  // event handler: open fix product layout
  const handleOpenFixProduct = item => {
    setFixProductVisible(true);

    setFixProduct(item);
  };

  // event handler: hide fix product layout
  const handleCloseFixProduct = useCallback(() => {
    setFixProductVisible(false);
  }, []);

  // clear order address when user go to cart
  useEffect(() => {
    orderAddressDispatch(OrderAddressActions.clear());
  }, []);

  // price calculate
  useEffect(() => {
    if (cartData.length > 0) {
      let totalPrice = 0;
      let totalImportPrice = 0;
      let totalProfit = 0;
      let products = [];
      let priceO = 0;
      let profitO = 0;

      allcheck.checkboxs.map(unique => {
        let p = cartData.at(unique);

        const decrementInCart = p?.decrementInCart
          ? parseFloat(p?.decrementInCart)
          : 0;

        const importPrice =
          parseFloat(p?.product?.price) -
          parseFloat(p?.product?.price) *
            (parseFloat(p?.product?.decrement) / 100);

        const price = p?.priceInCart
          ? parseFloat(p?.priceInCart) -
            parseFloat(p?.priceInCart) * (decrementInCart / 100)
          : parseFloat(p?.product?.price);

        const profit = price - importPrice;
        const qty = parseFloat(p?.quantity);

        products.push(p);

        totalPrice += price * qty;
        totalImportPrice += importPrice * qty;
        totalProfit += profit * qty;
        priceO += parseFloat(p?.product?.price) * qty;
        profitO +=
          parseFloat(p?.product?.price) *
          (parseFloat(p?.product?.decrement) / 100) *
          qty;
      });

      setProductOrder(products);
      setPriceAll(totalPrice);
      setImportPriceAll(totalImportPrice);
      setProfitAll(totalProfit);
      priceOriginal.current = priceO;
      profitOriginal.current = profitO;
    }
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
        style={{marginTop: 10}}
        renderItem={({item, index}) => (
          <ProductCart
            item={item}
            index={index}
            onFixPress={() => handleOpenFixProduct(item)}
          />
        )}
        removeClippedSubviews
        showsVerticalScrollIndicator={false}
        getItemLayout={(_, index) => {
          return {length: 80, offset: index * 80, index};
        }}
        initialNumToRender={6}
        windowSize={11}
        keyExtractor={item => item.product.product_id}
      />

      <View style={styles.listFooterView}>
        <View style={styles.listFooterItem}>
          <Text style={styles.listFooterHeader}>Thông tin đơn hàng</Text>
        </View>
        <View style={styles.listFooterItem}>
          <Text style={styles.listFooterLabel}>Tổng giá nhập</Text>
          <Text style={styles.listFooterPrice}>
            {formatPrice(importPriceAll)}
          </Text>
        </View>
        <View style={styles.listFooterItem}>
          <Text style={styles.listFooterLabel}>Tổng giá bán</Text>
          <Text style={styles.listFooterPrice}>{formatPrice(priceAll)}</Text>
        </View>
        <View style={styles.listFooterItem}>
          <Text style={styles.listFooterLabel}>Tổng lợi nhuận</Text>
          <Text style={styles.listFooterProfit}>{formatPrice(profitAll)}</Text>
        </View>
      </View>

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}>
        <AllCheckBox dataLength={cartData.length} text={'Chọn tất cả'} />
        <Button
          text="Tạo đơn"
          style={styles.button}
          onPress={() =>
            isLogin && productOrder.length > 0
              ? navigation.navigate('CreateOrder', {
                  products: productOrder,
                  type: 'money_payment',
                  totalPrices: priceAll,
                  totalProfit: profitAll,
                  totalImportPrice: importPriceAll,
                  totalPriceOriginal: priceOriginal.current,
                  totalProfitOriginal: profitOriginal.current,
                })
              : productOrder.length == 0
              ? dispatch(
                  riseNormalError({
                    duration: 2000,
                    message: 'Chưa chọn mặt hàng cần thanh toán.',
                  }),
                )
              : navigation.navigate('Login')
          }
        />
      </View>

      {fixProductVisble && (
        <FixProduct
          visible={fixProductVisble}
          onCloseFilter={handleCloseFixProduct}
          item={fixProduct}
        />
      )}
    </SafeAreaView>
  );
};

function WrapperCart() {
  return (
    <AllCheckProvider>
      <WalletCart />
    </AllCheckProvider>
  );
}

export default React.memo(WrapperCart);
