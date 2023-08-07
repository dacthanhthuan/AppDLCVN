import Carousel from '../AnimatedCarousel';
import {StyleSheet, View} from 'react-native';
import Product from './Product';
import {useEffect, useState, memo, useContext} from 'react';
import {WINDOW_WIDTH, WINDOW_HEIGHT, showmoreImage} from '../../MyGlobal';
import {ScrollContext} from '../../screens/Home';
import ProductShowmore from './ProductShowmore';
const img = showmoreImage;

const CarouselProduct = ({data, isShowmore = false}) => {
  const [dataSpilit, setDataSpilit] = useState([]);
  const isScroll = useContext(ScrollContext);
  const mData = isShowmore ? [...data, {}] : data;

  useEffect(() => {
    setDataSpilit([]);
    for (let i = 0; i < mData.length; i += 2) {
      setDataSpilit(value => [...value, mData.slice(i, i + 2)]);
    }
  }, [data]);

  const isOdd = number => {
    return number % 2 !== 0;
  };

  return (
    <Carousel
      data={dataSpilit}
      renderItem={({item, index}) =>
        isShowmore && isOdd(mData.length) && index === dataSpilit.length - 1 ? (
          <ProductShowmore name="Xem thêm..." imageSource={img} />
        ) : isShowmore &&
          !isOdd(mData.length) &&
          index === dataSpilit.length - 1 ? (
          <DoubleProduct data={item} lastIsShowmore={true} />
        ) : (
          <DoubleProduct data={item} />
        )
      }
      width={WINDOW_WIDTH}
      height={WINDOW_HEIGHT * 0.35}
      autoPlay={false}
      loop={false}
      autoPlayInterval={2500}
      scrollAnimationDuration={600}
      showPagination={true}
      style={styles.container}
      windowSize={2}
    />
  );
};

const DoubleProduct = memo(
  ({data, lastIsShowmore = false}) => {
    return (
      <View style={styles.doubleContainer}>
        {data.map((item, index) =>
          lastIsShowmore && index === data.length - 1 ? (
            <ProductShowmore key={index} name="Xem thêm..." imageSource={img} />
          ) : (
            <Product key={index} item={item} />
          ),
        )}
      </View>
    );
  },
  (pre, next) => JSON.stringify(pre) === JSON.stringify(next),
);

export default memo(
  CarouselProduct,
  (pre, next) => JSON.stringify(pre.data) === JSON.stringify(next.data),
);

const styles = StyleSheet.create({
  container: {
    marginVertical: '1%',
  },

  doubleContainer: {
    flexDirection: 'row',
    width: WINDOW_WIDTH * 0.94,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
