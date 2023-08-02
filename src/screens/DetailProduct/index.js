import React, {memo, useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  Pressable,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Style_Detail from './style';
import Button from '../../component/Button';
import Header from '../../component/Header/index';
import Information from '../../component/Information';
import Line from '../../component/Line';
import {useNavigation} from '@react-navigation/native';
import {formatPrice, formatPoint} from '../../global';
// import Carousel from "react-native-snap-carousel";
import Carousel from 'react-native-reanimated-carousel';
import {useDispatch, useSelector} from 'react-redux';
import {addProduct2Cart} from '../../redux/actions/cartActions';

const RenderImage = ({item}) => {
  return <Image style={Style_Detail.imgProduct} source={{uri: item}} />;
};

const DetailProduct = ({route}) => {
  // declare variable
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {product, type} = route?.params || {}; // get product data from route and product type

  // cart data state
  const cartData = useSelector(state => state.cart.data);
  const [isExist, setIsExist] = useState(false); // state check if product is exist in cart

  // quantity of order
  const [qty, setQty] = useState(1);
  // set price or point
  const price =
    type === 'point'
      ? formatPoint(product?.price)
      : formatPrice(product?.price);
  const commission = formatPrice(product?.commission_vnd); // commission of product
  const imageData = []; // image data

  // get image data
  for (let i = 1; i < 7; i++) {
    let img = 'img_' + i;
    let imageLink = product[img];
    imageLink.length > 0 ? imageData.push(imageLink) : null;
  }

  // Tăng số lượng
  const increase = () => {
    setQty(qty + 1);
  };

  // Giảm số lượng
  const reduce = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  // function check if product is exist in cart and set quantity
  const filterProductInCart = () => {
    let filter = cartData.find(item => {
      if (item.pType === type && item.product.product_id === product.product_id)
        return true;
    });
    setIsExist(filter ? true : false);
    setQty(filter ? filter.quantity : qty);
  };

  // whenever cart data has change
  useEffect(() => {
    // check if product is exist in cart
    filterProductInCart();
  }, [cartData]);

  return (
    <SafeAreaView style={Style_Detail.container}>
      <Header
        onPressLeft={() => navigation.goBack()}
        text={'Chi tiết sản phẩm'}
        iconLeft={require('../../assets/Arrow1.png')}
        onPressRight={() => navigation.navigate('Cart')}
        iconRight={require('../../assets/Vector.png')}
        containerStyle={{paddingBottom: 10}}
        showCartBadge
      />
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{paddingVertical: 15}}
        showsVerticalScrollIndicator={false}>
        <View style={{alignItems: 'center'}}>
          <Carousel
            data={imageData}
            renderItem={RenderImage}
            height={400}
            width={400}
            autoPlay={false}
            loop={false}
            windowSize={2}
            pagingEnabled
          />
          <View style={Style_Detail.container_1}>
            <Pressable
              onPress={reduce}
              hitSlop={12}
              style={({pressed}) => (pressed ? {opacity: 0.8} : null)}>
              <Image
                style={Style_Detail.imgIconMinus}
                source={require('../../assets/imgDetail/minus.png')}
              />
            </Pressable>
            <Text style={Style_Detail.textquantity}>{qty}</Text>
            <Pressable
              onPress={increase}
              hitSlop={12}
              style={({pressed}) => (pressed ? {opacity: 0.8} : null)}>
              <Image
                style={Style_Detail.imgIconPlus}
                source={require('../../assets/imgDetail/plus.png')}
              />
            </Pressable>
          </View>
        </View>
        <View style={Style_Detail.container_2}>
          <Text style={Style_Detail.nameproduct}>{product.product_name}</Text>
          <Text style={Style_Detail.price_1}>{price}</Text>
          <Text style={Style_Detail.text_1}>Giá nhà cung cấp</Text>
        </View>
        <Line />
        <Text style={Style_Detail.title_1}>Thông tin sản phẩm</Text>
        <Information
          text_1={'Giá nhà cung cấp:'}
          text_3={'Hoa hồng:'}
          price_1={price}
          price_3={commission}
          style_p3={{
            color: 'green',
          }}
        />
        <View style={Style_Detail.container_3}>
          <Text style={Style_Detail.title_2}>Giới thiệu sản phẩm</Text>
          <Text style={Style_Detail.text_1}>{product.short_description}</Text>
        </View>
      </ScrollView>

      <View style={Style_Detail.container_7}>
        <TouchableOpacity
          onPress={() =>
            dispatch(
              addProduct2Cart({
                product: product,
                quantity: 1,
                pType: type,
              }),
            )
          }>
          <View style={Style_Detail.container_8}>
            <Image
              style={Style_Detail.imgCart}
              source={require('../../assets/imgDetail/Vector.png')}
            />
          </View>
        </TouchableOpacity>
        <View style={{flex: 1, paddingLeft: 15}}>
          <Button
            onPress={() => {
              !isExist
                ? dispatch(
                    addProduct2Cart({
                      product: product,
                      quantity: qty,
                      pType: type,
                    }),
                  )
                : null;
              navigation.navigate('Cart');
            }}
            text={'Chọn mua'}
            style={{marginTop: 0}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DetailProduct;
