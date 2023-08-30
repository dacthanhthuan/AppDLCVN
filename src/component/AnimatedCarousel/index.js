import Carousel from 'react-native-reanimated-carousel';
import styles from './styles';
import { View, Pressable } from 'react-native';
import { useState, useCallback, useRef, useEffect } from 'react';

const AnimatedCarousel = ({
  data,
  renderItem,
  width,
  height,
  windowSize,
  loop,
  autoPlay,
  autoPlayInterval,
  scrollAnimationDuration,
  style,
  showPagination,
  extraData,
  defaultIndex,
  customAnimation,
}) => {
  const carouselRef = useRef();
  const [index, setIndex] = useState(0);

  const Pagination = useCallback(
    ({ index }) => {
      return (
        <View style={styles.pageDotCont}>
          {data.map((_, i) => {
            return (
              <Pressable
                key={i}
                style={({ pressed }) => [
                  styles.pageDot,
                  index == i ? styles.pageDotActive : styles.pageDotInactive,
                  pressed ? { backgroundColor: 'grey' } : null,
                ]}
                onPress={() => {
                  carouselRef.current.scrollTo({ index: i, animated: true });
                }}
                hitSlop={5}
              />
            );
          })}
        </View>
      );
    },
    [data?.length],
  );

  useEffect(() => {
    data?.length > 0
      ? carouselRef.current.scrollTo({ index: 0, animated: false })
      : null;
    setIndex(0);
  }, [extraData]);

  return (
    <>
      <Carousel
        ref={carouselRef}
        data={data}
        renderItem={renderItem}
        width={width}
        height={height}
        windowSize={windowSize}
        loop={loop}
        autoPlay={autoPlay}
        autoPlayInterval={autoPlayInterval}
        scrollAnimationDuration={scrollAnimationDuration}
        defaultIndex={defaultIndex}
        style={style}
        onSnapToItem={index => {
          setIndex(index);
        }}
        panGestureHandlerProps={{
          activeOffsetX: [-15, 15],
          onCancelled: e => {
            e._dispatchInstances.memoizedProps.onTouchEnd();
          },
        }}
        customAnimation={customAnimation}
      />
      {showPagination ? <Pagination index={index} /> : null}
    </>
  );
};

export default AnimatedCarousel;
