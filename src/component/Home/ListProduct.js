import {memo} from 'react';
import Product from './Product';
import {FlatList, StyleSheet} from 'react-native';
import ProductShowmore from './ProductShowmore';
import {showmoreImage} from '../../global';

const ListProduct = ({data, isShowmore = false}) => {
  data = isShowmore ? [...data, {}] : data;
  const img = showmoreImage;

  return (
    <FlatList
      style={styles.flatlist}
      contentContainerStyle={styles.flatlistContent}
      numColumns={2}
      data={data}
      renderItem={({item, index}) =>
        isShowmore && index === data.length - 1 ? (
          <ProductShowmore name="Xem thêm..." imageSource={img} />
        ) : (
          <Product item={item} />
        )
      }
      removeClippedSubviews={true}
      windowSize={11}
    />
  );
};

export default memo(ListProduct, (pre, next) => {
  return JSON.stringify(pre.data) === JSON.stringify(next.data);
});

const styles = StyleSheet.create({
  flatlist: {
    flex: 1,
    alignSelf: 'center',
  },

  flatlistContent: {
    alignSelf: 'center',
  },
});
