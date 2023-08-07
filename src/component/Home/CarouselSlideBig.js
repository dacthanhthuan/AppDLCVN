import Carousel from '../AnimatedCarousel';
import {memo, useContext} from 'react';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../../MyGlobal';
import {ScrollContext} from '../../screens/Home';
import SlideBig from './SlideBig';

const CarouselSlideSmall = ({data}) => {
  const isScroll = useContext(ScrollContext);

  return (
    <Carousel
      data={data}
      renderItem={({item}) => (
        <SlideBig slide={{uri: item.banner} || item.source} />
      )}
      width={WINDOW_WIDTH}
      height={WINDOW_HEIGHT * 0.38}
      windowSize={2}
      loop={true}
      autoPlay={!isScroll}
      autoPlayInterval={3000}
      scrollAnimationDuration={600}
      // style={{backgroundColor: '#005AA9'}}
    />
  );
};

export default memo(CarouselSlideSmall, (pre, next) => {
  return JSON.stringify(pre.data) === JSON.stringify(next.data);
});
