import {memo} from 'react';
import Product from './Product';
import {FlatList, StyleSheet} from 'react-native';

const ListProduct = ({data}) => {
  return (
    <FlatList
      style={styles.container}
      data={data}
      renderItem={({item}) => <Product item={item} />}
      removeClippedSubviews={true}
      windowSize={11}
    />
  );
};

export default memo(ListProduct, (pre, next) => {
  return JSON.stringify(pre.data) === JSON.stringify(next.data);
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
