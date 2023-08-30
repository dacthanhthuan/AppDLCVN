import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import styles from './styles';
import ProductCart from '../../component/ProductCart';
import Checkbox from '../../component/Checkbox';
import Button from '../../component/Button';
import { Swipeable } from 'react-native-gesture-handler';
import Header from '../../component/Header';
import { formatprice } from "../../global";
import { useSelector } from 'react-redux';
import store from '../../redux/store';
import { cleardeliveryAddress, removeFromCart, updateCartQuantity } from '../../redux/actions';
import CardEmpty from '../CardEmpty';
import { localSaveProductCart } from '../../Local/AsyncStorage';

const Cart = ({ navigation }) => {

  // Retrieve the cart products from the Redux store
  const { cartItems } = useSelector(state => state.postReducers);

  const [allCheck, setallCheck] = useState(false);
  const [forceChange, setForceChange] = useState(false);
  // Giá trị ban đầu tất cả sản phẩm == false
  const [listCheck, setListCheck] = useState(
    new Array(cartItems?.length).fill(false),
  );
  const [check, setCheck] = useState(-1);

  const onCheckboxAll = checked => {
    if (check === -1 && checked === false) {
      setListCheck(
        listCheck.map((_, i) => {
          return false;
        }),
      );
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

  // Khi sản phẩm trong giỏ hàng thay đổi sẽ lưu lại vào Local
  useEffect(() => {
    if (cartItems?.length > 0) {
      localSaveProductCart(cartItems)
    }
  }, [cartItems])

  // Xóa sản phẩm
  const onPressClearCard = (productId) => {
    store.dispatch(removeFromCart(productId));

    // Cập nhật dữ liệu trong local storage sau khi đã xóa sản phẩm khỏi Redux state
    const updatedCartItems = cartItems.filter(
      item => item?.productData?.product_id !== productId
    );
    localSaveProductCart(updatedCartItems);
  };

  // Icon xóa sản phẩm 
  const clearCard = (productId) => {
    return (
      <TouchableOpacity onPress={() => onPressClearCard(productId)} style={{ alignItems: 'center', justifyContent: 'center', padding: 12 }}>
        <Image style={{ width: 22, height: 24 }} resizeMode="contain" source={require('../../assets/clearCart.png')} />
      </TouchableOpacity>
    );
  };

  // Cập nhật số lượng
  const updateQuantity = (productId, newQuantity) => {
    store.dispatch(updateCartQuantity(productId, newQuantity));
  };


  // Tính tổng tiền hàng
  let totalprice = allCheck
    ? cartItems?.reduce((total, item) => {
      const productPrice = item?.productData?.price * parseFloat(item?.quantity);
      return total + productPrice;
    }, 0)
    : cartItems?.reduce((total, item, index) => {
      // console.log('listCheck[index]:>>', listCheck[index]);
      if (listCheck[index]) { // Include in total if the item's checkbox is checked
        const productPrice = item?.productData?.price * parseFloat(item?.quantity);
        // console.log(productPrice);
        return total + productPrice;
      } else {
        return total;
      }
    }, 0);

  // useEffect(() => {
  // console.log('allCheck:>>', allCheck);
  // console.log('listCheck:>>', listCheck);
  // console.log(listCheck?.length == true);
  // }, [allCheck, listCheck])

  return cartItems?.length === 0 ?
    <CardEmpty />
    :
    <SafeAreaView style={styles.container}>
      <Header
        iconLeft={require('../../assets/Arrow1.png')}
        text="Giỏ hàng"
        onPressLeft={() => {
          navigation.goBack();
        }}
      />

      <FlatList
        showsVerticalScrollIndicator={false}
        data={cartItems}
        style={{ marginTop: 35 }}
        renderItem={({ item, index }) => {
          const price = formatprice(item?.productData?.price);
          return (
            <Swipeable renderRightActions={() => clearCard(item?.productData?.product_id)}>
              <ProductCart
                onPressMinus={() => {
                  if (item?.quantity > 1) {
                    const updatedQuantity = item?.quantity - 1;
                    updateQuantity(item?.productData?.product_id, updatedQuantity);
                  }
                }}
                onPressPlus={() => {
                  const updatedQuantity = item?.quantity + 1;
                  updateQuantity(item?.productData?.product_id, updatedQuantity);
                }}
                sl={item?.quantity}
                onChecked={value =>
                  setListCheck(list =>
                    list.map((item, i) => (i === index ? value : item))
                  )
                }
                title={item?.productData?.product_name}
                price={price}
                image={item?.productData?.image ? item?.productData?.image : item?.productData?.img_1}
                allCheck={allCheck ? allCheck : listCheck[index]}
              />
            </Swipeable>
          );
        }}
      />

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Checkbox
            onChecked={onCheckboxAll}
            text={'Chọn tất cả'}
            forceChangeState={forceChange}
          />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 13, color: '#000000', marginLeft: 10 }}>
            Tổng giá bán
          </Text>
          {allCheck === true ? (
            <Text
              style={{
                fontSize: 16,
                color: '#000000',
                marginLeft: 10,
                fontWeight: '500',
              }}>
              {formatprice(totalprice)}
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 16,
                color: '#000000',
                marginLeft: 10,
                fontWeight: '500',
              }}>
              {formatprice(totalprice)}
            </Text>
          )
          }
        </View>
      </View>
      {listCheck.every(item => item == false) ? (
        <Button
          text="Tạo đơn"
        />
      ) : (
        <Button
          text="Tạo đơn"
          onPress={() => {
            let selectedItems = cartItems.filter((item, index) => listCheck[index]);
            console.log(selectedItems);
            store.dispatch(cleardeliveryAddress())
            navigation.navigate('CreateOrder', { cartItems: selectedItems, totalprice })
          }}
        />
      )
      }
    </SafeAreaView>
};

export default React.memo(Cart);
