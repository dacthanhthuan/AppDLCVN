import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import styles from './styles';
import ProductCart from '../../component/ProductCart';
import Checkbox from '../../component/Checkbox';
import Button from '../../component/Button';
import { Swipeable } from 'react-native-gesture-handler';
import Header from '../../component/Header';
import { useSelector } from 'react-redux';
import store from '../../redux/store';
import { cleardeliveryAddress, removeFromCartPoint, updateCartQuantityPoint } from '../../redux/actions';
import CardEmpty from '../CardEmpty';
import { localSaveProductCartPoint } from '../../Local/AsyncStorage';
import { formatpoint } from '../../global';

const CartPoint = ({ navigation }) => {

  // Retrieve the cart products from the Redux store
  const { cartItemsPoint, data } = useSelector(state => state.postReducers);

  const pointWallet = data?.data?.lWallet[1]?.amount;

  const [allCheck, setallCheck] = useState(false);
  const [forceChange, setForceChange] = useState(false);
  // Giá trị ban đầu tất cả sản phẩm == false
  const [listCheck, setListCheck] = useState(
    new Array(cartItemsPoint?.length).fill(false),
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
    if (cartItemsPoint?.length > 0) {
      localSaveProductCartPoint(cartItemsPoint)
    }
  }, [cartItemsPoint])

  // Xóa sản phẩm
  const onPressClearCard = (productId) => {
    store.dispatch(removeFromCartPoint(productId));

    // Cập nhật dữ liệu trong local storage sau khi đã xóa sản phẩm khỏi Redux state
    const updatedCartItems = cartItemsPoint.filter(
      item => item?.productData?.product_id !== productId
    );
    localSaveProductCartPoint(updatedCartItems);
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
    store?.dispatch(updateCartQuantityPoint(productId, newQuantity));
  };

  // Tính tổng số điểm hàng
  const totalPoint = allCheck ? cartItemsPoint?.reduce((total, item) => {
    const productPoint = item?.productData?.price * parseFloat(item?.quantity);
    return total + productPoint;
  }, 0)
    : cartItemsPoint?.reduce((total, item, index) => {
      console.log('listCheck[index]:>>', listCheck[index]);
      if (listCheck[index]) { // Include in total if the item's checkbox is checked
        const productPoint = item?.productData?.price * parseFloat(item?.quantity);
        console.log(productPoint);
        return total + productPoint;
      } else {
        return total;
      }
    }, 0);

  return cartItemsPoint?.length === 0 ?
    <CardEmpty />
    :
    <SafeAreaView style={styles.container}>
      <Header
        iconLeft={require('../../assets/Arrow1.png')}
        text="Giỏ hàng điểm"
        onPressLeft={() => {
          navigation.goBack();
        }}
      />

      <FlatList
        showsVerticalScrollIndicator={false}
        data={cartItemsPoint}
        style={{ marginTop: 35 }}
        renderItem={({ item, index }) => {
          const point = formatpoint(item?.productData?.price);
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
                    list?.map((item, i) => {
                      if (i === index) return value;
                      else return item;
                    }),
                  )
                }
                title={item?.productData?.product_name}
                price={point}
                image={item?.productData?.image ? item?.productData?.image : item?.productData?.img_1}
                allCheck={allCheck ? allCheck : listCheck[index]}
              />
            </Swipeable>
          );
        }}
      />

      <View style={{ alignItems: 'flex-end', width: '100%' }}>
        <Text style={{ color: '#000000' }}>Số Point hiện tại của bạn: {formatpoint(pointWallet)}</Text>
      </View>
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
              {formatpoint(totalPoint)}
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 16,
                color: '#000000',
                marginLeft: 10,
                fontWeight: '500',
              }}>
              {formatpoint(totalPoint)}
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
            if (pointWallet < totalPoint) {
              Alert.alert('Thông báo', 'Số dư điểm không đủ')
            } else {
              store.dispatch(cleardeliveryAddress())
              navigation.navigate('CreateOrderPoint', { cartItemsPoint, totalPoint })
            }
          }}
        />
      )
      }
    </SafeAreaView>

};

export default React.memo(CartPoint);
