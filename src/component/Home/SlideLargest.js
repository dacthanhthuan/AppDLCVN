import ImageButton from './ImageButton';
import {StyleSheet, View} from 'react-native';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../../global';
import {memo} from 'react';

const SlideLargest = ({slide, backgroundColor}) => {
  return (
    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
      <ImageButton
        containerStyle={styles.slider}
        imagesource={slide}
        imageStyle={styles.slideImage}
        resizeMode={'stretch'}
      />
    </View>
  );
};

export default memo(
  SlideLargest,
  (pre, next) => JSON.stringify(pre) === JSON.stringify(next),
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    width: WINDOW_WIDTH,
  },

  slider: {
    width: WINDOW_WIDTH * 0.94,
    alignSelf: 'center',
    height: WINDOW_HEIGHT * 0.2,
    marginVertical: WINDOW_HEIGHT * 0.01,
  },

  slideImage: {
    width: '100%',
    height: '100%',
  },
});
