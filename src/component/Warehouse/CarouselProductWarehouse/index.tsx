import Carousel from '../../AnimatedCarousel';
import {View} from 'react-native';
import {useEffect, useState, memo, useContext} from 'react';
import {WINDOW_WIDTH, WINDOW_HEIGHT, showmoreImage} from '../../../global';
const img = showmoreImage;
import styles from './style';
import CardProduct from '../CardProduct';
import CardShowmore from '../CardShowmore';

const CarouselProduct = ({data, isShowmore = false}: any) => {
  const [dataSpilit, setDataSpilit] = useState<any>([]);
  const mData = isShowmore ? [...data, {}] : data;

  useEffect(() => {
    setDataSpilit([]);
    for (let i = 0; i < mData.length; i += 2) {
      setDataSpilit((value: any) => [...value, mData.slice(i, i + 2)]);
    }
  }, [data]);

  const isOdd = (number: number) => {
    return number % 2 !== 0;
  };

  return (
    <Carousel
      data={dataSpilit}
      renderItem={({item, index}: any) =>
        isShowmore && isOdd(mData.length) && index === dataSpilit.length - 1 ? (
          <ProductShowmore name="Xem thêm..." imageSource={img} />
        ) : isShowmore &&
          !isOdd(mData.length) &&
          index === dataSpilit.length - 1 ? (
          <DoubleProduct data={item} lastIsShowmore={true} />
        ) : (
          <DoubleProduct data={item} />
        )
      }
      width={WINDOW_WIDTH}
      height={WINDOW_HEIGHT * 0.35}
      autoPlay={true}
      loop={false}
      autoPlayInterval={2500}
      scrollAnimationDuration={600}
      showPagination={true}
      style={styles.container}
      windowSize={2}
      extraData={undefined}
      defaultIndex={undefined}
      customAnimation={undefined}
    />
  );
};

const DoubleProduct = memo(
  ({data, lastIsShowmore = false}: any) => {
    return (
      <View style={styles.doubleContainer}>
        {data.map((item: any, index: number) =>
          lastIsShowmore && index === data.length - 1 ? (
            <CardShowmore key={index} name="Xem thêm..." imageSource={img} />
          ) : (
            <CardProduct
              title={item.product_name}
              categori={item.product_id}
              price={formatPoint(item.price)}
              style={undefined}
              image={{uri: item.img_1}}
              onPress={undefined}
            />
          ),
        )}
      </View>
    );
  },
  (pre, next) => JSON.stringify(pre) === JSON.stringify(next),
);

export default memo(
  CarouselProduct,
  (pre, next) => JSON.stringify(pre.data) === JSON.stringify(next.data),
);
