import React, {memo, useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  Pressable,
  View,
  ScrollView,
} from 'react-native';
import styles from './style';
import Button from '../../component/Button';
import Header from '../../component/Header/index';
import Information from '../../component/Information';
import Line from '../../component/Line';
import {useNavigation} from '@react-navigation/native';
import {
  formatPrice,
  formatPoint,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
  useIsReady,
} from '../../MyGlobal';
// import Carousel from "react-native-snap-carousel";
import Carousel from 'react-native-reanimated-carousel';
import {useDispatch, useSelector} from 'react-redux';
import {
  addProduct2Cart,
  changeProductQuantity,
  rmProductFromCart,
} from '../../redux/actions/cartActions';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
  interpolate,
  interpolateColor,
  withRepeat,
  runOnJS,
  useDerivedValue,
} from 'react-native-reanimated';
import {AnimatedImgButton} from '../../component/Home/ImageButton';
import assets from '../../assets';
import LottieView from 'lottie-react-native';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import LoadingOverlay from '../../component/LoadingOverlay';
import TextViewRow from '../../component/TextViewRow';
const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const RenderImage = ({item}) => {
  return <Image style={styles.imgProduct} source={{uri: item}} />;
};

const DetailProduct = ({route}) => {
  // declare variable
  const isReady = useIsReady();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {product, type} = route?.params || {}; // get product data from route and product type

  // cart data state
  const cartData =
    type == 'money'
      ? useSelector(state => state.cart.wallet)
      : useSelector(state => state.cart.point);
  const [isExist, setIsExist] = useState(false); // state check if product is exist in cart

  // quantity of order
  const [qty, setQty] = useState(1);
  // set price or point
  const price =
    type === 'point'
      ? formatPoint(product?.price)
      : formatPrice(product?.price);
  // decrement and decrement price
  const decrement = product.decrement != 0 ? product.decrement : undefined;
  const priceDecrement = formatPrice(
    parseInt(product?.price) * ((100 - parseInt(decrement)) / 100),
  );
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
    if (!isExist) {
      addToCart(1);
    } else {
      changeInCart(qty + 1);
    }
  };

  // Giảm số lượng
  const reduce = () => {
    if (isExist) {
      if (qty - 1 > 0) {
        setQty(qty - 1);
        changeInCart(qty - 1);
      } else {
        removeInCart();
      }
    }
  };

  // function check if product is exist in cart and set quantity
  const filterProductInCart = () => {
    let filter = cartData.find(item => {
      if (item.pType === type && item.product.product_id === product.product_id)
        return true;
    });
    setIsExist(filter ? true : false);
    setQty(filter ? filter.quantity : 1);
  };

  // whenever cart data has change
  useEffect(() => {
    // check if product is exist in cart
    filterProductInCart();
  }, [cartData]);

  // *-------Animation---------
  // declare shared value
  const zRotateValue = useSharedValue(0); // rotate value
  const pressedValue = useSharedValue(0); // pressed value
  const fireworkProgress = useSharedValue(0); //firework animation progress

  // function add product to cart
  const addToCart = quantity => {
    dispatch(
      addProduct2Cart({
        product: product,
        quantity: quantity,
        pType: type,
      }),
    );
  };

  // function change product quantity
  const changeInCart = quantity => {
    dispatch(
      changeProductQuantity({
        productId: product.product_id,
        quantity: quantity,
        pType: type,
      }),
    );
  };

  const removeInCart = () => {
    dispatch(
      rmProductFromCart({
        productId: product.product_id,
        pType: type,
        quantity: -1,
      }),
    );
  };

  // define gesture for cart button
  const cartTapGesutre = Gesture.Tap()
    .maxDuration(1200) // this make tap gesture has 600ms before long press is active
    // onStart function is invoked when gesture is active
    .onStart(() => {
      // start animation pressed when tap gesture is active
      pressedValue.value = withSequence(
        withTiming(1, {duration: 300}),
        withTiming(0, {duration: 150}),
      );

      zRotateValue.value = withSequence(
        withTiming(-10, {duration: 150}),
        withTiming(10, {duration: 150}),
        withTiming(0, {duration: 150}),
      );

      fireworkProgress.value = withSequence(
        withTiming(0.7, {duration: 4000}),
        withTiming(0, {duration: 0}),
      );

      // dispatch redux store
      runOnJS(addToCart)(1);
    });

  const cartLongPressGresture = Gesture.LongPress()
    // onBegin function is invoked when user's finger has touched screen
    .onBegin(() => {
      // start animation
      pressedValue.value = withTiming(1, {duration: 1000});
      zRotateValue.value = withTiming(-10, {duration: 1000});
    })
    .onStart(() => {
      // dispatch redux store 10 products
      runOnJS(addToCart)(10);
      // end animation
      pressedValue.value = withTiming(0, {duration: 300});

      zRotateValue.value = withSequence(
        withTiming(10, {duration: 300}),
        withTiming(0, {duration: 150}),
      );

      fireworkProgress.value = withSequence(
        withTiming(0.0025, {duration: 0}),
        withTiming(0.7, {duration: 4000}),
        withTiming(0, {duration: 0}),
      );
    });

  // composing above gestures into one gesture
  const cartGesture = Gesture.Exclusive(cartTapGesutre, cartLongPressGresture);

  // create animation for cart button
  const cartAnimatedStyle = useAnimatedStyle(() => {
    // on pressed animation
    const backgroundColor = interpolateColor(
      pressedValue.value,
      [0, 1],
      ['rgba(255,255,255,1)', 'rgba(255,200,50,0.7)'],
    );
    const borderWidth = interpolate(pressedValue.value, [0, 1], [1, 2.5]);
    const scale = interpolate(pressedValue.value, [0, 1], [1, 1.2]);

    return {
      backgroundColor,
      borderWidth,
      transform: [{scale}],
    };
  });

  // create animation for cart image
  const cartImageAnimatedStyle = useAnimatedStyle(() => {
    const rotateZ = `${zRotateValue.value}deg`;
    const scale = interpolate(pressedValue.value, [0, 1], [1, 1.5]);

    return {
      transform: [{rotateZ}, {scale}],
    };
  });

  // create animation for firework lottie view
  const fireworkAnimatedStyle = useAnimatedStyle(() => {
    const width = fireworkProgress.value > 0 ? WINDOW_WIDTH : 0;
    const height = fireworkProgress.value > 0 ? WINDOW_HEIGHT : 0;

    return {
      width,
      height,
    };
  });

  return !isReady ? (
    <LoadingOverlay />
  ) : (
    <SafeAreaView style={styles.container}>
      <Header
        onPressLeft={() => navigation.goBack()}
        text={'Chi tiết sản phẩm'}
        iconLeft={require('../../assets/Arrow1.png')}
        onPressRight={() => {
          if (type == 'money') navigation.navigate('Cart');
          else navigation.navigate('PointCart');
        }}
        iconRight={require('../../assets/Vector.png')}
        containerStyle={{paddingBottom: 10}}
        showCartBadge
        isWallet={type == 'money' ? true : false}
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
          <View style={styles.container_1}>
            <Pressable
              onPress={reduce}
              hitSlop={20}
              style={({pressed}) => (pressed ? {opacity: 0.8} : null)}>
              <Image
                style={styles.imgIconMinus}
                source={require('../../assets/imgDetail/minus.png')}
              />
            </Pressable>
            <Text style={styles.textquantity}>{qty}</Text>
            <Pressable
              onPress={increase}
              hitSlop={20}
              style={({pressed}) => (pressed ? {opacity: 0.8} : null)}>
              <Image
                style={styles.imgIconPlus}
                source={require('../../assets/imgDetail/plus.png')}
              />
            </Pressable>
          </View>
        </View>
        <View style={styles.container_2}>
          <Text style={styles.nameproduct}>{product.product_name}</Text>
          <Text style={[styles.price_1, decrement ? styles.stroke_line : null]}>
            {price}
          </Text>
          {decrement ? (
            <Text style={styles.decrementPrice}>{priceDecrement}</Text>
          ) : null}
          <Text style={styles.text_1}>Giá nhà cung cấp</Text>
        </View>
        <Line />
        <Text style={styles.title_1}>Thông tin sản phẩm</Text>
        <TextViewRow
          title={'Giá nhà cung cấp:'}
          price={price}
          priceStyle={decrement ? {textDecorationLine: 'line-through'} : null}
        />
        {decrement ? (
          <>
            <TextViewRow
              title={'Sale:'}
              price={'-' + decrement + '%'}
              priceStyle={{color: 'red', fontSize: 15, fontWeight: '500'}}
            />
            <TextViewRow
              title={'Giá đã giảm:'}
              price={priceDecrement}
              priceStyle={{color: 'red', fontWeight: '500'}}
            />
          </>
        ) : null}
        <TextViewRow title="Hoa hồng" point={commission} />
        <View style={styles.container_3}>
          <Text style={styles.title_2}>Giới thiệu sản phẩm</Text>
          <Text style={styles.text_1}>{product.short_description}</Text>
        </View>
      </ScrollView>

      <AnimatedLottieView
        source={assets.LottieAnimation.firework}
        style={[styles.fireworkLottieView, fireworkAnimatedStyle]}
        resizeMode="cover"
        progress={fireworkProgress}
      />

      <View style={styles.container_7}>
        <GestureDetector gesture={cartGesture}>
          <Animated.View style={[styles.container_8, cartAnimatedStyle]}>
            <Animated.Image
              style={[styles.imgCart, cartImageAnimatedStyle]}
              source={require('../../assets/imgDetail/Vector.png')}
            />
          </Animated.View>
        </GestureDetector>

        <View style={{flex: 1, paddingLeft: 15}}>
          <Button
            onPress={() => {
              !isExist ? addToCart(1) : null;
              if (type == 'money') navigation.navigate('Cart');
              else navigation.navigate('PointCart');
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
