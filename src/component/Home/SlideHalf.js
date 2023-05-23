import {FlatList, StyleSheet} from 'react-native';
import ImageButton from './ImageButton';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../../global';
import {memo} from 'react';

const SlideHalf = ({item}) => {
  return (
    <FlatList
      style={styles.container}
      data={item}
      initialNumToRender={3}
      renderItem={({item}) => (
        <ImageButton
          containerStyle={styles.imageCont}
          imagesource={item.source}
          imageStyle={styles.image}
          resizeMode={'stretch'}
        />
      )}
    />
  );
};

export default memo(SlideHalf);

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
  },

  image: {
    width: '100%',
    height: '100%',
  },
});
