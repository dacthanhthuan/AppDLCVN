import React from 'react';
import Product from './Product';
import { FlatList, StyleSheet } from 'react-native';
import ButtonProductMore from '../ButtonProductMore';

const ListProductPotrait = ({ data, isMore }) => {
  return (
    <FlatList
      style={styles.container}
      data={data}
      renderItem={({ item, index }) =>
        <Product
          style={index % 2 === 0
            ? { marginLeft: 2 }
            : { marginLeft: 2 }} item={item} />}
      removeClippedSubviews={true}
      ListFooterComponentStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}
      ListFooterComponent={isMore ? <ButtonProductMore /> : null}
    />
  );
};

export default React.memo(ListProductPotrait, (pre, next) => {
  return JSON.stringify(pre.data) === JSON.stringify(next.data);
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
  },
});
