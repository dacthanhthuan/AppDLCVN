import {useEffect, useState} from 'react';
import styles from './styles';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
  RefreshControl,
} from 'react-native';
import Animated, {
  Easing,
  SlideInUp,
  SlideOutUp,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  useSupplierProductsContext,
  useSupplierProductsDispatch,
  clrSupplierProductList,
  hideSupplierProductsList,
} from './context';
import {useDispatch, useSelector} from 'react-redux';
import SlideSmall from '../Home/SlideSmall';
import Product from '../Home/Product';
import {
  SupplierProductListActions,
  clearSupplierProductList,
} from '../../redux/actions/supplierActions';
import LottieView from 'lottie-react-native';
import assets from '../../assets';
import {useNavigation} from '@react-navigation/native';
import LoadmoreIndicator from '../Home/LoadmoreIndicator';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CartBadge from '../Cart/CartBadge';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function SupplierProductsList({visible}) {
  const navigation = useNavigation();

  const [appear, setAppear] = useState(visible);
  // supplier products list is determined is shown or hided
  useEffect(() => {
    setAppear(visible);
  }, [visible]);

  const dispatch = useDispatch();
  const productsDispatch = useSupplierProductsDispatch();
  const productsContext = useSupplierProductsContext();

  const colorValue = useSharedValue(0); // animate color value
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loadmore, setLoadmore] = useState(false);

  const session_token = useSelector(state => state.user.session_token);

  const products = useSelector(state => state.supplier.product);
  const productsLoading = useSelector(state => state.supplier.productLoading);
  const nextPage = useSelector(state => state.supplier.product_next_page);
  const totalRecord = useSelector(state => state.supplier.product_total_record);
  const currentRecord = useSelector(
    state => state.supplier.product_current_record,
  );

  const banner = JSON.parse(
    productsContext?.supplier?.banner
      ? productsContext?.supplier?.banner
      : '{}',
  );

  // whenever visible change, set data to display
  useEffect(() => {
    if (visible) {
      setData(products);

      if (!productsLoading) {
        setRefreshing(false);
        setLoadmore(false);
      }
    }
  }, [products, visible]);

  // feature refreshing
  useEffect(() => {
    if (refreshing) {
      dispatch(SupplierProductListActions.clear());
      dispatch(
        SupplierProductListActions.start({
          token: session_token ? session_token : '',
          supplier_id: productsContext.supplier.id,
          keyword: '',
          page: '1',
        }),
      );
      setLoadmore(false);
    }
  }, [refreshing]);

  // checking loadmore condition
  function couldLoadmore() {
    return currentRecord < totalRecord;
  }

  // feature loadmore
  function handleLoadmore() {
    if (!productsLoading && loadmore) {
      dispatch(
        SupplierProductListActions.start({
          token: session_token ? session_token : '',
          supplier_id: productsContext.supplier.id,
          keyword: '',
          page: nextPage,
        }),
      );
    }
  }

  //
  // handle out side press
  const outsidePress = () => {
    // change outside color
    colorValue.value = 0;
    // hide supplier products
    hideSupplierProducts();
    // hide bottom tab bar
    navigation.setOptions({tabBarStyle: undefined});
    setLoadmore(false);
    setRefreshing(false);
  };

  // hide supplier product list and clear products data
  const hideSupplierProducts = () => {
    productsDispatch(hideSupplierProductsList());
    dispatch(clearSupplierProductList());
  };

  // clear supplier products context
  const clearSupplierProductsContext = () => {
    productsDispatch(clrSupplierProductList());
  };

  // outside animation
  const pressableAnimatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      colorValue.value,
      [0, 1],
      ['rgba(0,0,0,0)', 'rgba(255, 255, 255, 0.5)'],
    );

    const opacity = colorValue.value;

    return {
      backgroundColor,
      opacity,
    };
  });

  return appear ? (
    <Animated.View
      style={styles.container}
      entering={SlideInUp.easing(Easing.out(Easing.exp))
        .duration(600)
        .delay(50)
        .withCallback(finish => {
          if (finish) {
            colorValue.value = withTiming(1, {duration: 200});
          }
        })}
      exiting={SlideOutUp.easing(Easing.in(Easing.exp))
        .duration(600)
        .delay(50)
        .withCallback(finish => {
          if (finish) runOnJS(clearSupplierProductsContext)();
        })}>
      {/* 
      products list view */}
      <View style={styles.view}>
        {/*
         header view */}
        <View style={styles.header}>
          {/* 
          header title */}
          <Text style={styles.supplierTitle}>
            Nhà cung cấp:{' '}
            <Text style={styles.supplierName}>
              {productsContext?.supplier?.name}
            </Text>
          </Text>

          {/* 
          cart button */}
          <TouchableOpacity
            style={styles.cartContainer}
            onPress={() => {
              navigation.navigate('Cart');
            }}>
            <Image
              source={require('../../assets/Vector.png')}
              style={styles.cart}
              resizeMode="contain"
            />
            <CartBadge isWallet style={styles.cartBadge} />
          </TouchableOpacity>
        </View>

        {/* 
        slide banner supplier */}
        <SlideSmall
          slide={
            banner[0]
              ? {
                  uri: banner[0],
                }
              : require('../../assets/noimage.png')
          }
          backgroundColor=""
        />

        {/* 
        Products list */}
        <Text style={styles.productListTitle}>Danh sách sản phẩm</Text>
        <FlatList
          data={data}
          renderItem={({item}) => <Product item={item} />}
          removeClippedSubviews
          initialNumToRender={4}
          style={styles.flatlist}
          contentContainerStyle={styles.contentFlatlist}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          //
          // display when list is empty
          ListEmptyComponent={
            productsLoading && !refreshing ? (
              <ActivityIndicator size="large" color="#005aa9" />
            ) : !refreshing ? (
              <>
                <Text style={styles.notfoundText}>Không tìm thấy sản phẩm</Text>
                <LottieView
                  autoPlay
                  loop
                  speed={1.5}
                  source={assets.LottieAnimation.not_found}
                  style={{width: 250, height: 250, alignSelf: 'center'}}
                />
              </>
            ) : null
          }
          //
          // refreshing control
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              colors={['white']}
              progressBackgroundColor={'#005AA9'}
              onRefresh={() => setRefreshing(true)}
            />
          }
          //
          // handle loadmore
          onEndReached={() => {
            if (couldLoadmore()) {
              setLoadmore(true);
              handleLoadmore();
            }
          }}
        />

        {/* 
        loadmore indicator */}
        {loadmore && <LoadmoreIndicator />}
      </View>

      {/* 
      outside and cloes button */}
      <AnimatedPressable
        style={[styles.outside, pressableAnimatedStyle]}
        onPress={outsidePress}>
        <Image
          source={require('../../assets/Rectangle268.png')}
          style={styles.closeButton}
        />
      </AnimatedPressable>
    </Animated.View>
  ) : null;
}
