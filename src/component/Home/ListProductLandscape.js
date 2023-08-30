import { memo } from 'react';
import Product from './Product';
import { FlatList, StyleSheet } from 'react-native';
import ButtonProductMore from '../ButtonProductMore';

const ListProductLandscape = ({ data, isMore }) => {
  // console.log(data);
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal
      style={styles.container}
      data={data}
      renderItem={({ item, index }) =>
        <Product style={index === data.length - 1 ? { marginRight: 16 } : null} item={item} />
      }
      removeClippedSubviews={true}
      ListFooterComponent={isMore ? <ButtonProductMore /> : null}
    />
  );
};

export default memo(ListProductLandscape, (pre, next) => {
  return JSON.stringify(pre.data) === JSON.stringify(next.data);
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
    // marginRight: 4
  },
});
