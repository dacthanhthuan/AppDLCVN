import Carousel from '../AnimatedCarousel';
import {StyleSheet, View} from 'react-native';
import Product from './Product';
import {useEffect, useState} from 'react';
import {WINDOW_WIDTH, WINDOW_HEIGHT} from '../../global';

export default CarouselProduct = ({data}) => {
  const [dataSpilit, setDataSpilit] = useState([]);

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
      autoPlay={true}
      loop={true}
      autoPlayInterval={2500}
      scrollAnimationDuration={600}
      showPagination={true}
      style={styles.container}
    />
  );
};

const DoubleProduct = ({data}) => {
  return (
    <View style={styles.doubleContainer}>
      {data.map((item, index) => {
        return <Product key={index} item={item} />;
      })}
    </View>
  );
};

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
