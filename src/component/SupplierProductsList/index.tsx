import {useEffect, useState} from 'react';
import styles from './styles';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  Text,
  View,
} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {
  useSupplierProductsContext,
  useSupplierProductsDispatch,
  clrSupplierProductList,
} from './context';
import {useDispatch, useSelector} from 'react-redux';
import SlideSmall from '../Home/SlideSmall';
import Product from '../Home/Product';
import {clearSupplierProductList} from '../../redux/actions/supplierActions';
import LottieView from 'lottie-react-native';
import assets from '../../assets';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type SupplierProductsListProps = {
  visible: boolean;
};

export default function SupplierProductsList({
  visible,
}: SupplierProductsListProps) {
  const [appear, setAppear] = useState(visible);
  // display supplier products list
  useEffect(() => {
    setAppear(visible);
  }, [visible]);

  const dispatch = useDispatch();
  const supplierProductsListDispatch = useSupplierProductsDispatch();
  const supplierProductsContext = useSupplierProductsContext();

  const colorValue = useSharedValue(0); // animate color value
  const [data, setData] = useState([]);

  const supplierProducts = useSelector((state: any) => state.supplier.product);
  const supplierProductListLoading = useSelector(
    (state: any) => state.supplier.productLoading,
  );
  const banner = JSON.parse(
    supplierProductsContext?.supplier?.banner
      ? supplierProductsContext?.supplier?.banner
      : '{}',
  );

  useEffect(() => {
    if (visible) {
      setData(supplierProducts);
    }
  }, [supplierProducts, visible]);

  // handle out side press
  const outsidePress = () => {
    // change outside color
    colorValue.value = withTiming(0, {duration: 0}, finish => {});
    hideSupplierProducts();
  };

  const hideSupplierProducts = () => {
    supplierProductsListDispatch(clrSupplierProductList());
    dispatch(clearSupplierProductList());
  };

  // outside animation
  const pressableAnimatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      colorValue.value,
      [0, 1],
      ['rgba(0,0,0,0)', 'rgba(1,1,1,0.5)'],
    );

    return {
      backgroundColor,
    };
  });

  return appear ? (
    <Modal
      animationType="slide"
      transparent
      onRequestClose={outsidePress}
      onShow={() => {
        // show background color after 100ms when modal is shown
        colorValue.value = withDelay(100, withTiming(1, {duration: 300}));
      }}>
      <AnimatedPressable
        style={[styles.outside, pressableAnimatedStyle]}
        onPress={outsidePress}
      />
      <View style={styles.view}>
        <Text style={styles.supplierTitle}>
          Nhà cung cấp:{' '}
          <Text style={styles.supplierName}>
            {supplierProductsContext?.supplier?.name}
          </Text>
        </Text>
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
          ListEmptyComponent={
            supplierProductListLoading ? (
              <ActivityIndicator size="large" color="#005aa9" />
            ) : (
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
            )
          }
        />
      </View>
    </Modal>
  ) : null;
}
