import {FlatList, StyleSheet} from 'react-native';
import ImageButton from './ImageButton';
import {WINDOW_WIDTH, WINDOW_HEIGHT} from '../../global';
import {memo} from 'react';

const TopProductItem = ({item}) => {
  return (
    <FlatList
      style={styles.topProduct}
      initialNumToRender={3}
      data={item}
      renderItem={({item, index}) => (
        <ImageButton
          imagesource={item.source}
          text={`TOP\n${item.title}`}
          containerStyle={[
            index === 1 ? styles.productTopCont : styles.productCont,
            index === 0
              ? {backgroundColor: '#A81811'}
              : index === 1
              ? {backgroundColor: '#09355C'}
              : {backgroundColor: '#F56318'},
          ]}
          imageStyle={
            index === 1 ? styles.productTopImage : styles.productImage
          }
          textStlye={styles.productText}
        />
      )}
    />
  );
};

export default memo(TopProductItem);

const styles = StyleSheet.create({
  topProduct: {
    flexDirection: 'row',
    height: WINDOW_HEIGHT * 0.12,
    marginHorizontal: '2%',
    marginTop: '1%',
    marginBottom: '4%',
    alignContent: 'space-between',
  },

  productCont: {
    width: (WINDOW_WIDTH * 0.88) / 3,
    height: '100%',
    justifyContent: 'center',
    marginHorizontal: WINDOW_WIDTH * 0.01,
    borderRadius: 5,
  },

  productTopCont: {
    width: (WINDOW_WIDTH * 0.88) / 3,
    height: '100%',
    justifyContent: 'center',
    marginHorizontal: WINDOW_WIDTH * 0.02,
    borderRadius: 5,
    transform: [{scale: 1.1}],
  },

  productImage: {
    width: '35%',
    height: '40%',
    alignSelf: 'center',
    marginBottom: 5,
  },

  productTopImage: {
    width: '40%',
    height: '40%',
    alignSelf: 'center',
    marginBottom: 5,
  },

  productText: {
    color: 'white',
    fontSize: 12,
    alignSelf: 'center',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: '400',
  },
});
