import Carousel from '../AnimatedCarousel';
import { memo, useContext } from 'react';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../global';
import { ScrollContext } from '../../screens/Home';
import SlideLargestBig from './SlideLargestBig';

const CarouselSlideBig = ({ data }) => {
  const isScroll = useContext(ScrollContext);

  return (
    <Carousel
      data={data}
      renderItem={({ item }) =>
        // console.log('item', item)
        < SlideLargestBig slide={item.source || { uri: item.banner }} />
      }
      width={WINDOW_WIDTH}
      height={WINDOW_HEIGHT * 0.38}
      windowSize={3}
      loop={true}
      autoPlay={!isScroll}
      autoPlayInterval={3000}
      scrollAnimationDuration={600}
    // style={{ backgroundColor: '#005AA9' }}
    />
  );
};

export default memo(CarouselSlideBig, (pre, next) => {
  return JSON.stringify(pre.data) === JSON.stringify(next.data);
});
