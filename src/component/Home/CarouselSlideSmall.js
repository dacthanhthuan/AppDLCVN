import Carousel from '../AnimatedCarousel';
import { memo, useContext } from 'react';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../global';
import { ScrollContext } from '../../screens/Home';
import SlideLargestSmall from './SlideLargestSmall';

const CarouselSlideSmall = ({ data }) => {
  const isScroll = useContext(ScrollContext);

  return (
    <Carousel
      data={data}
      renderItem={({ item }) =>
        < SlideLargestSmall slide={{ uri: item?.banner }} />
      }
      width={WINDOW_WIDTH}
      height={WINDOW_HEIGHT * 0.23}
      windowSize={3}
      loop={true}
      autoPlay={!isScroll}
      autoPlayInterval={3000}
      scrollAnimationDuration={600}
    // style={{ backgroundColor: '#005AA9' }}
    />
  );
};

export default memo(CarouselSlideSmall, (pre, next) => {
  return JSON.stringify(pre.data) === JSON.stringify(next.data);
});
