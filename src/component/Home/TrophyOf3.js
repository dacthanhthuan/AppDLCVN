import {StyleSheet} from 'react-native';
import Carousel from '../AnimatedCarousel';
import ImageButton from './ImageButton';
import {WINDOW_WIDTH, WINDOW_HEIGHT} from '../../global';
import {memo, useState, useCallback} from 'react';
import {interpolate} from 'react-native-reanimated';

const TopProductItem = ({item}) => {
  const animationStyle = useCallback(value => {
    'worklet';
    const scale = interpolate(value, [-1, 0, 1], [1, 1.15, 1]);
    const translateX = interpolate(
      value,
      [-1, 0, 1],
      [-WINDOW_WIDTH / 3, 0, WINDOW_WIDTH / 3],
    );

    return {
      transform: [{scale}, {translateX}],
    };
  }, []);

  return (
    <Carousel
      style={styles.topProduct}
      data={item}
      renderItem={({item}) => {
        return (
          <ImageButton
            imagesource={item.source}
            text={`TOP\n${item.title}`}
            containerStyle={[
              styles.productCont,
              {backgroundColor: item.backgroundColor},
            ]}
            imageStyle={styles.productImage}
            textStlye={styles.productText}
          />
        );
      }}
      width={WINDOW_WIDTH / 3}
      height={WINDOW_HEIGHT * 0.12}
      autoPlay={true}
      autoPlayInterval={3000}
      scrollAnimationDuration={600}
      customAnimation={animationStyle}
    />
  );
};

export default memo(TopProductItem);

const styles = StyleSheet.create({
  topProduct: {
    height: WINDOW_HEIGHT * 0.14,
    marginTop: '1%',
    marginBottom: '2%',
    alignItems: 'center',
    justifyContent: 'center',
    width: WINDOW_WIDTH,
  },

  productCont: {
    width: (WINDOW_WIDTH * 0.88) / 3,
    height: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 5,
  },

  productImage: {
    width: '35%',
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
