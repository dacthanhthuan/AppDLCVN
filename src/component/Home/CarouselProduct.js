import Carousel from '../Carousel';
import {StyleSheet} from 'react-native';
import Product from './Product';
import {WINDOW_WIDTH} from '../../global';

export default CarouselProduct = ({data, itemPerPage}) => {
  return (
    <Carousel
      data={data}
      _renderItem={({item}) => <Product item={item} />}
      itemPerPage={itemPerPage}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH * 0.94,
    marginVertical: '1%',
    alignSelf: 'center',
  },
});
