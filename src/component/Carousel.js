import {FlatList, View, StyleSheet} from 'react-native';
import {useState, useRef, useCallback, useEffect} from 'react';
import {memo} from 'react';
import {WINDOW_WIDTH} from '../global';

const Carousel = ({
  data,
  _renderItem,
  style,
  itemPerPage,
  extraData,
  hidePagination,
  autoPlay,
  autoPlayDelay,
  autoPlayInvertDirection,
}) => {
  const pageCount =
    data?.length % itemPerPage === 0
      ? data.length / itemPerPage
      : Math.ceil(data.length / itemPerPage);

  const [onScrolling, setOnScrolling] = useState(false);

  const PageDot = useCallback(
    ({index}) => {
      const page = Array(pageCount).fill(0);
      return (
        <View style={styles.pageDotCont}>
          {page.map((_, i) => {
            return (
              <View
                key={i}
                style={[
                  styles.pageDot,
                  index == i ? styles.pageDotActive : styles.pageDotInactive,
                ]}
              />
            );
          })}
        </View>
      );
    },
    [data.length],
  );

  const [index, setIndex] = useState(0);
  const indexRef = useRef(index);
  const flatListRef = useRef();
  indexRef.current = index;

  const onScroll = useCallback(event => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);

    const distance = Math.abs(roundIndex - index);

    // Prevent one pixel triggering setIndex in the middle
    // of the transition. With this we have to scroll a bit
    // more to trigger the index change.
    const isNoMansLand = 0.4 < distance;

    if (roundIndex !== indexRef.current && !isNoMansLand) {
      setIndex(roundIndex);
    }
  }, []);

  useEffect(() => {
    data.length > 0
      ? flatListRef.current.scrollToIndex({index: 0, animated: false})
      : null;
  }, [extraData]);

  useEffect(() => {
    const isLastIndexEnd = autoPlayInvertDirection
      ? index === 0
      : index === pageCount - 1;

    let autoPlayTimer;

    if (autoPlay && !onScrolling) {
      autoPlayTimer = setTimeout(
        () => {
          if (pageCount < 1) {
            // avoid nextIndex being set to NaN
            return;
          }

          const nextIncrement = autoPlayInvertDirection ? -1 : +1;

          let nextIndex = (nextIncrement + index) % pageCount;

          if (autoPlayInvertDirection && nextIndex < 0)
            nextIndex = pageCount - 1;

          // Disable end loop animation if in last index
          const animate = !isLastIndexEnd;

          flatListRef.current.scrollToIndex({
            index: nextIndex * itemPerPage,
            animated: animate,
          });
        },
        autoPlayDelay ? autoPlayDelay : 1000,
      );
    }

    return () => {
      clearTimeout(autoPlayTimer);
    };
  }, [
    autoPlay,
    index,
    autoPlayInvertDirection,
    autoPlayDelay,
    pageCount,
    onScrolling,
  ]);

  const flatListOptimizationProps = {
    initialNumToRender: 1,
    maxToRenderPerBatch: 3,
    removeClippedSubviews: true,
    scrollEventThrottle: 12,
    windowSize: 2,
    keyExtractor: useCallback((s, i) => String(i), []),
  };

  return (
    <>
      <FlatList
        ref={flatListRef}
        horizontal
        style={[styles.carousel, style]}
        data={data}
        renderItem={_renderItem}
        onScroll={onScroll}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        extraData={extraData}
        onScrollToIndexFailed={i => {
          return;
        }}
        onScrollBeginDrag={() => setOnScrolling(true)}
        onScrollEndDrag={() => setOnScrolling(false)}
        {...flatListOptimizationProps}
      />
      {!hidePagination ? <PageDot index={index} /> : null}
    </>
  );
};

export default memo(Carousel, (pre, next) => {
  return JSON.stringify(pre) === JSON.stringify(next);
});

const styles = StyleSheet.create({
  carousel: {
    width: WINDOW_WIDTH,
  },

  pageDotCont: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: '2%',
  },

  pageDot: {
    width: 8,
    height: 8,
    borderRadius: 180,
    marginHorizontal: 3,
  },

  pageDotActive: {
    backgroundColor: '#005AA9',
  },

  pageDotInactive: {
    backgroundColor: '#D9D9D9',
  },
});
