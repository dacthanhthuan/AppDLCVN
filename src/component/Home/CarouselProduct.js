import Carousel from '../AnimatedCarousel';
import {StyleSheet, View} from 'react-native';
import Product from './Product';
import {useEffect, useState, memo, useContext} from 'react';
import {WINDOW_WIDTH, WINDOW_HEIGHT} from '../../global';
import {ScrollContext} from '../../screens/Home';

const CarouselProduct = ({data}) => {
  const [dataSpilit, setDataSpilit] = useState([]);
  const isScroll = useContext(ScrollContext);

  useEffect(() => {
    setDataSpilit([]);
    for (let i = 0; i < data.length; i += 2) {
      setDataSpilit(value => [...value, data.slice(i, i + 2)]);
    }
  }, [data]);

  return (
    <Carousel
      data={dataSpilit}
      renderItem={({item}) => <DoubleProduct data={item} />}
      width={WINDOW_WIDTH}
      height={WINDOW_HEIGHT * 0.35}
      autoPlay={!isScroll}
      loop={true}
      autoPlayInterval={2500}
      scrollAnimationDuration={600}
      showPagination={true}
      style={styles.container}
      windowSize={3}
    />
  );
};

const DoubleProduct = memo(
  ({data}) => {
    return (
      <View style={styles.doubleContainer}>
        {data.map((item, index) => {
          return <Product key={index} item={item} />;
        })}
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
  },
});
