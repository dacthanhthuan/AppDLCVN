import React, {useState, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ToastAndroid,
} from 'react-native';
import styles from './styles';
import ProductCart from '../../component/ProductCart';
import Checkbox from '../../component/Checkbox';
import Button from '../../component/Button';
import {Swipeable} from 'react-native-gesture-handler';
import Header from '../../component/Header';
import {formatPoint, formatPrice} from '../../global';
import {useDispatch, useSelector} from 'react-redux';
import {
  addProduct2Cart,
  changeProductQuantity,
  rmProductFromCart,
} from '../../redux/actions/cartActions';
import CartEmpty from '../CartEmpty';

const Cart = ({navigation, route}) => {
  const dispatch = useDispatch();
  const productData = useSelector(state => state.cart.data);
  const isLogin = useSelector(state => state.user.login.status);

  const [totalprice, setTotalprice] = useState(0);
  const [totalpoint, setTotalpoint] = useState(0);
  const [productOrder, setProductOrder] = useState([]);

  const [allCheck, setallCheck] = useState(false);
  const [forceChange, setForceChange] = useState(false);
  const [listCheck, setListCheck] = useState(
    new Array(productData.length).fill(false),
  );
  const [check, setCheck] = useState(-1);

  const onCheckboxAll = checked => {
    if (check === -1 && checked === false) {
      setListCheck(new Array(productData.length).fill(false));
      setallCheck(false);
    } else setallCheck(checked);
  };

  useEffect(() => {
    const check = listCheck.findIndex(item => item === false);
    if ((!allCheck && check === -1) || (allCheck && check !== -1)) {
      setForceChange(!forceChange);
    }
    setCheck(check);
  }, [listCheck]);

  useEffect(() => {
    let prices = productData.map(
      item => parseInt(item.product.price) * parseInt(item.quantity),
    );

    let totalPrice = 0;
    let totalPoint = 0;
    let products = [];

    listCheck.map((item, index) => {
      if (item && productData[index]) {
        if (productData[index].pType === 'money') {
          totalPrice += prices[index];
        } else {
          totalPoint += prices[index];
        }
        products.push(productData[index]);
      }
    });

    setTotalprice(totalPrice);
    setTotalpoint(totalPoint);
    setProductOrder(products);
  }, [productData, listCheck]);

  const clearCard = (productId, type) => {
    return (
      <TouchableOpacity
        onPress={() => {
          dispatch(
            rmProductFromCart({
              productId: productId,
              quantity: 0,
              pType: type,
            }),
          );
        }}
        style={{alignItems: 'center', justifyContent: 'center', padding: 12}}>
        <Image
          style={{width: 22, height: 24}}
          resizeMode="contain"
          source={require('../../assets/clearCart.png')}
        />
      </TouchableOpacity>
    );
  };

  const RenderItem = ({item, index}) => {
    return (
      <Swipeable
        renderRightActions={() =>
          clearCard(item?.product.product_id, item.pType)
        }>
        <ProductCart
          onQtyChange={qty => {
            if (qty < 1) {
              dispatch(
                rmProductFromCart({
                  productId: item.product.product_id,
                  quantity: 0,
                  pType: item?.pType,
                }),
              );
            } else {
              dispatch(
                changeProductQuantity({
                  productId: item.product.product_id,
                  quantity: qty,
                  pType: item?.pType,
                }),
              );
            }
          }}
          sl={item.quantity}
          onChecked={value => {
            listCheck[index] = value;
            setListCheck(list => [...listCheck]);
          }}
          title={item?.product.product_name}
          price={
            item?.pType === 'point'
              ? formatPoint(item?.product.price)
              : formatPrice(item?.product.price)
          }
          image={item?.source || {uri: item?.product.img_1}}
          allCheck={allCheck ? allCheck : listCheck[index]}
        />
      </Swipeable>
    );
  };

  return productData.length === 0 ? (
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
        data={productData}
        style={{marginTop: 35}}
        renderItem={RenderItem}
        removeClippedSubviews
      />

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Checkbox
          onChecked={onCheckboxAll}
          text={'Chọn tất cả'}
          forceChangeState={forceChange}
        />
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

export default React.memo(Cart);
