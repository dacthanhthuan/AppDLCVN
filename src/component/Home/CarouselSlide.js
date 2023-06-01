import Carousel from '../AnimatedCarousel';
import SlideLargest from './SlideLargest';
import {memo} from 'react';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../../global';

const CarouselSlide = ({data}) => {
  return (
    <Carousel
      data={data}
      renderItem={({item}) => <SlideLargest slide={item.source} />}
      width={WINDOW_WIDTH}
      height={WINDOW_HEIGHT * 0.23}
      windowSize={2}
      loop={true}
      autoPlay={true}
      autoPlayInterval={3000}
      scrollAnimationDuration={600}
      style={{backgroundColor: '#005AA9'}}
    />
  );
};

export default memo(CarouselSlide, (pre, next) => {
  return JSON.stringify(pre.data) === JSON.stringify(next.data);
});
