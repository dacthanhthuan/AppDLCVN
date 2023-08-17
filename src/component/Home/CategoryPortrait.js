import {FlatList, StyleSheet} from 'react-native';
import ImageButton from './ImageButton';
import {WINDOW_HEIGHT, WINDOW_WIDTH, showmoreImage} from '../../global';
import {memo} from 'react';

const CategoryPortrait = ({item, isShowmore = false}) => {
  const data = isShowmore
    ? [
        ...item,
        {
          name: 'Xem thêm...',
          source: showmoreImage,
        },
      ]
    : item;

  return (
    <FlatList
      style={styles.container}
      data={data}
      initialNumToRender={3}
      renderItem={({item, index}) =>
        isShowmore && index === data.length - 1 ? (
          <ImageButton
            containerStyle={styles.showmoreContainer}
            imagesource={item.source}
            imageStyle={styles.showmoreImage}
            resizeMode={'stretch'}
            text={item.name}
            textStlye={styles.showmoreText}
          />
        ) : (
          <ImageButton
            containerStyle={styles.imageCont}
            imagesource={item.source || {uri: item.icon}}
            imageStyle={styles.image}
            resizeMode={'stretch'}
          />
        )
      }
    />
  );
};

export default memo(
  CategoryPortrait,
  (pre, next) => JSON.stringify(pre.item) === JSON.stringify(next.item),
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  imageCont: {
    width: (WINDOW_WIDTH * 0.92) / 2,
    alignSelf: 'center',
    height: WINDOW_HEIGHT * 0.2,
    marginHorizontal: WINDOW_WIDTH * 0.01,
    marginVertical: WINDOW_WIDTH * 0.01,
    backgroundColor: '#f6f6f6',
    borderRadius: 10,
  },

  image: {
    width: '100%',
    height: '100%',
  },

  showmoreImage: {
    width: '50%',
    height: '50%',
  },

  showmoreContainer: {
    width: (WINDOW_WIDTH * 0.92) / 2,
    height: WINDOW_HEIGHT * 0.2,
    marginHorizontal: WINDOW_WIDTH * 0.01,
    marginVertical: WINDOW_WIDTH * 0.01,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#f6f6f6',
  },

  showmoreText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
});
