// import React, { useState } from "react";
// import { SafeAreaView, View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
// import styles from "./styles";
// import ProductCart from "../../component/ProductCart";
// import Checkbox from "../../component/Checkbox";
// import Button from "../../component/Button";
// import { Swipeable } from "react-native-gesture-handler";
// import Header from "../../component/Header";
// import { formatprice } from "../../global";
// import React, { useState, useEffect } from "react";
// import { SafeAreaView, View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
// import styles from "./styles";
// import ProductCart from "../../component/ProductCart";
// import Checkbox from "../../component/Checkbox/index";
// import Button from "../../component/Button";
// import { Swipeable } from "react-native-gesture-handler";
// import Header from "../../component/Header";

// const Cart = ({ navigation, route }) => {


//   const [agreed, setAgreed] = useState(false);

// const Cart = ({ navigation, route }) => {
//     const itemdata = route.params;
//     const price = formatprice(itemdata.itemdata.item.price);
//     const totalprice = formatprice(itemdata.itemdata.item.price * parseFloat(itemdata.quantity));
//     console.log(itemdata.quantity);
    
//     const [agreed, setAgreed] = useState(false);
//   const onCheckboxAll = () => {
//     setAgreed(value => !value);
//   };





//   return (
//     <SafeAreaView style={styles.container}>
//       <Header
//         iconLeft={require('../../assets/Arrow1.png')}
//         text='Giỏ hàng'
//         onPressLeft={() => { navigation.goBack() }}
//       />

//       <FlatList
//         data={productData}
//         style={{ marginTop: 35 }}
//         keyExtractor={item => String(item.id)}
//         renderItem={({ item }) => {
//           return (
//             <Swipeable renderRightActions={() => clearCard(item.id)}>
//               <ProductCart
//                 sl={quantity}
//                 title={item.title}
//                 price={item.price}
//                 image={item.image}
//                 checked={agreed}
//               />
//             </Swipeable>
//           );
//         }}
//       />

//       <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
//         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//           <Checkbox onPress={onCheckboxAll} checked={agreed} />
//           <Text style={{ fontSize: 14, color: '#000000', marginLeft: 10 }}>Chọn tất cả</Text>
//         </View>
//         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//           <Text style={{ fontSize: 14, color: '#000000', marginLeft: 10 }}>Tổng giá bán</Text>
//           <Text style={{ fontSize: 16, color: '#000000', marginLeft: 10, fontWeight: '500' }}>2,500,000 đ</Text>
//         </View>
//       </View>
//       <Button text='Tạo đơn' onPress={() => navigation.navigate('CreateOrder')} />


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

{/* const data = [
  {
    id: 1,
    title: 'Nước rửa chén sinh học True - Bio Natural Dishwashing Liquid',
    price: '206,000',
    image: require('../../assets/Rectangle87.png'),
  },
  {
    id: 2,
    title: 'DL12 Probiotic',
    price: '610,000',
    image: require('../../assets/Group135.png'),
  },
]; */}

const Cart = ({ navigation, route }) => {

  const { quantity, item } = route?.params || {};
  const price = formatprice(itemdata.itemdata.item.price);
  const totalprice = formatprice(itemdata.itemdata.item.price * parseFloat(itemdata.quantity));

  console.log("item", item);
  console.log("quantity", quantity);
  const [productData, setProductData] = useState(route?.params ? [item] : []);


  const [allCheck, setallCheck] = useState(false);
  const [forceChange, setForceChange] = useState(false);
  const [listCheck, setListCheck] = useState(
    new Array(productData.length).fill(false),
  );
  const [check, setCheck] = useState(-1);

  const onPressClearCard = (productId) => {
    const updatedProductData = productData.filter(item => item.id !== productId);
    setProductData(updatedProductData);
  };



  // Không có đơn hàng chuyển qua trang NoOrders
  useEffect(() => {
    if (productData.length === 0) {
      navigation.navigate('CardEmpty');
    }
  }, [productData, navigation]);

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

  const clearCard = (productId) => {
    return (
      <TouchableOpacity onPress={() => onPressClearCard(productId)} style={{ alignItems: 'center', justifyContent: 'center', padding: 12 }}>
        <Image style={{ width: 22, height: 24 }} resizeMode="contain" source={require('../../assets/clearCart.png')} />
      </TouchableOpacity>
    );
  };

  return (
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
        style={{ marginTop: 35 }}
        // keyExtractor={item => String(item.id)}
        renderItem={({ item, index }) => {
          return (
            <Swipeable renderRightActions={() => clearCard(item?.id)}>
              <ProductCart
                sl={quantity}
                onChecked={value =>
                  setListCheck(list =>
                    list.map((item, i) => {
                      if (i === index) return value;
                      else return item;
                    }),
                  )
                }
                title={item?.title}
                price={item?.price}
                image={item?.image}
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
          <Text
            style={{
              fontSize: 16,
              color: '#000000',
              marginLeft: 10,
              fontWeight: '500',
            }}>
            2,500,000 đ
          </Text>
        </View>
      </View>
      <Button
        text="Tạo đơn"
        onPress={() => navigation.navigate('CreateOrder')}
      />
    </SafeAreaView>
  );
};

export default React.memo(Cart);
