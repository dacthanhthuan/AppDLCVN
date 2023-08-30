import React, { useState, useEffect } from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  Pressable,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Style_Detail from './style';
import Button from '../../component/Button';
import Header from '../../component/Header/index';
import Information from '../../component/Information';
import { useNavigation } from '@react-navigation/native';
import { WINDOW_WIDTH, formatpoint } from '../../global';
// import Carousel from "react-native-snap-carousel";
import Carousel from 'react-native-reanimated-carousel';
import { useSelector } from 'react-redux';
import store from '../../redux/store';
import { addToCartPoint, updateCartQuantityPoint } from '../../redux/actions';
import { RenderHTML } from 'react-native-render-html';
import { localSaveProductCartPoint } from '../../Local/AsyncStorage';

const DetailProductPoint = ({ route }) => {

  const { item } = route?.params || {};
  const { data, cartItemsPoint } = useSelector((state) => state.postReducers)

  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(1);
  const point = item?.price;
  const description = item?.description;
  const commission = item?.price * item?.decrement / 100;

  // Tính tổng số lượng
  const totalIsQuantity = cartItemsPoint.reduce((total, item) => {
    return total + item?.quantity;
  }, 0)

  // Lọc ra các sản phẩm trong giỏ hàng khớp id với id ở trang chi tiết
  const matchedProducts = cartItemsPoint.filter(cartItem => cartItem.productData?.product_id === item.product_id);

  // Nếu khớp sẽ lấy ra quantity của sản phẩm đó trong giỏ hàng
  const matchedQuantities = matchedProducts.map(matchedProduct => matchedProduct.quantity);


  // Tăng số lượng
  const increase = () => {
    store.dispatch(addToCartPoint(item, quantity));
  };

  // Lưu sản phẩm trong giỏ hàng khi mà giỏ hàng thay đổi
  useEffect(() => {
    localSaveProductCartPoint(cartItemsPoint)
  }, [cartItemsPoint])

  // Giảm số lượng
  const reduce = () => {
    if (matchedQuantities > 1) {
      const updatedQuantity = matchedQuantities - 1;
      store.dispatch(updateCartQuantityPoint(item?.product_id, updatedQuantity))
    }
  };

  const imageUrls = [item?.image, item?.img_1, item?.img_2, item?.img_3, item?.img_4, item?.img_5, item?.img_6].filter(url => url !== "" && url !== undefined);

  const addProduct = () => {
    if (data?.length === 0) {
      navigation.navigate('Login');

    } else {
      store.dispatch(addToCartPoint(item, quantity));
      navigation.navigate('CartPoint');
    }
  };


  // Render HTML
  const renderersProps = {
    img: {
      enableExperimentalPercentWidth: true
    }
  };

  const iframeModel = {
    contentModel: 'block', // You might need to adjust this based on the content of the iframe.
    isVoid: false, // Depending on your iframe use case, you might set this to true.
  };

  return (
    <SafeAreaView style={Style_Detail.container}>
      <Header
        onPressLeft={() => navigation.goBack()}
        text={'Chi tiết sản phẩm (Điểm)'}
        iconLeft={require('../../assets/Arrow1.png')}
        onPressRight={() => {
          navigation.navigate('CartPoint');
        }}
        iconRight={require('../../assets/Home/Vector.png')}
        containerStyle={{ paddingBottom: 10 }}
        dataCart={totalIsQuantity}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <View style={{ alignItems: 'center', marginTop: 15 }}>
              <Carousel
                data={imageUrls}
                renderItem={({ item }) => {
                  return (
                    <Image style={Style_Detail.imgProduct} source={{ uri: item }} />
                  )
                }}
                height={200}
                width={200}
                autoPlay={true}
                autoPlayInterval={2000}
                loop={imageUrls.length > 1}
                mode='parallax'
              />
              <View style={Style_Detail.container_1}>
                <Pressable
                  onPress={reduce}
                  hitSlop={12}
                  style={({ pressed }) => (pressed ? { opacity: 0.8 } : null)}>
                  <Image
                    style={Style_Detail.imgIconMinus}
                    source={require('../../assets/imgDetail/minus.png')}
                  />
                </Pressable>
                <Text style={Style_Detail.textquantity}>{matchedQuantities?.length > 0 ? matchedQuantities : quantity}</Text>
                <Pressable
                  onPress={increase}
                  hitSlop={12}
                  style={({ pressed }) => (pressed ? { opacity: 0.8 } : null)}>
                  <Image
                    style={Style_Detail.imgIconPlus}
                    source={require('../../assets/imgDetail/plus.png')}
                  />
                </Pressable>
              </View>
            </View>
            <View style={Style_Detail.container_2}>
              <Text style={Style_Detail.nameproduct}>{item?.product_name}</Text>
              <Text style={Style_Detail.price_1}>{formatpoint(point)}</Text>
              <Text style={Style_Detail.text_1}>Giá nhà cung cấp</Text>
            </View>

            <Information
              title={'Thông tin sản phẩm'}
              textOne='Giá nhà cung cấp'
              textTwo='Giá bán lẻ'
              textThree='Giá hoa hồng'
              valueOne={formatpoint(point)}
              valueTwo={formatpoint(point)}
              valueThree={formatpoint(commission)}
            />

            <View style={Style_Detail.container_3}>
              <Text style={Style_Detail.title_2}>Giới thiệu sản phẩm</Text>
              <RenderHTML
                contentWidth={WINDOW_WIDTH}
                source={{ html: description }}
                enableExperimentalMarginCollapsing={true}
                renderersProps={renderersProps}
                customHTMLElementModels={{ iframe: iframeModel }}
                ignoredDomTags={['iframe']} />
            </View>
          </View>
        }
      />
      <View style={Style_Detail.container_7}>
        <TouchableOpacity onPress={() => {
          store.dispatch(addToCartPoint(item, quantity));
        }}>
          <View style={Style_Detail.container_8}>
            <Image
              style={Style_Detail.imgCart}
              source={require('../../assets/imgDetail/Vector.png')}
            />
          </View>
        </TouchableOpacity>
        <View style={{ flex: 1, paddingLeft: 15 }}>
          <Button
            onPress={() => addProduct()}
            text={'Chọn mua'}
            style={{ marginTop: 0 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};


export default DetailProductPoint;
