import {ImageSourcePropType, StyleSheet, View} from 'react-native';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../../MyGlobal';
import {memo} from 'react';
import ImageButton from './ImageButton';

type SlideSmallProps = {
  slide: ImageSourcePropType;
  backgroundColor: string;
};

function SlideSmall({slide, backgroundColor}: SlideSmallProps) {
  return (
    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
      <ImageButton
        containerStyle={styles.slider}
        imagesource={slide}
        imageStyle={styles.slideImage}
        resizeMode={'stretch'}
        textStlye={undefined}
        text={undefined}
        onPress={undefined}
      />
    </View>
  );
}

export default memo(
  SlideSmall,
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
    borderRadius: 10,
  },

  slideImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});
