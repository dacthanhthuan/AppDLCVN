import Carousel from '../Carousel';
import SlideLargest from './SlideLargest';
import {memo} from 'react';

const CarouselSlide = ({data}) => {
  return (
    <Carousel
      data={data}
      hidePagination={true}
      _renderItem={({item}) => (
        <SlideLargest
          slide={item.source}
          backgroundColor={item.backgroundColor}
        />
      )}
      itemPerPage={1}
      autoPlay={true}
      autoPlayDelay={2500}
    />
  );
};

export default memo(CarouselSlide, (pre, next) => {
  return JSON.stringify(pre.data) === JSON.stringify(next.data);
});
