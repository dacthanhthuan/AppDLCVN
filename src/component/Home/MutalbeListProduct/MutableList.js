// import Carousel from '../../Carousel';
import Carousel from '../../AnimatedCarousel';
import {StyleSheet, View} from 'react-native';
import {WINDOW_WIDTH} from '../../../MyGlobal';
import {useState, useEffect, memo, useContext} from 'react';
import ButtonGroup from './ButtonGroup';
import VerticalProduct from './VerticalProduct';
import {ScrollContext} from '../../../screens/Home';

const MutableList = ({item, checked}) => {
  const [data, setData] = useState([]);
  const [select, setSelect] = useState();

  useEffect(() => {
    item.forEach((e, i) => {
      e.value === select ? setData(item[i].data) : null;
    });
  }, [select]);

  return (
    <View>
      <ButtonGroup
        button={item}
        checked={checked}
        onSelect={item => setSelect(item.value)}
      />
      <MutableCarousel data={data} select={select} />
    </View>
  );
};

const MutableCarousel = memo(
  ({data, select}) => {
    const [dataSpilit, setDataSpilit] = useState([]);
    const isScroll = useContext(ScrollContext);

    useEffect(() => {
      setDataSpilit([]);
      for (let i = 0; i < data.length; i += 3) {
        setDataSpilit(value => [...value, data.slice(i, i + 3)]);
      }
    }, [select, data]);

    return (
      <Carousel
        style={styles.container}
        data={dataSpilit}
        renderItem={({item}) => <GroupProductVertical data={item} />}
        autoPlay={!isScroll}
        width={WINDOW_WIDTH}
        height={400}
        autoPlayInterval={2000}
        loop={true}
        showPagination={true}
        extraData={select}
        windowSize={5}
      />
    );
  },
  (pre, next) => JSON.stringify(pre) === JSON.stringify(next),
);

const GroupProductVertical = memo(
  ({data}) => {
    return (
      <View style={styles.groupContainer}>
        {data?.map((item, index) => {
          return <VerticalProduct data={item} key={index} />;
        })}
      </View>
    );
  },
  (pre, next) => JSON.stringify(pre) === JSON.stringify(next),
);

export default memo(
  MutableList,
  (pre, next) => JSON.stringify(pre) === JSON.stringify(next),
);

const styles = StyleSheet.create({
  container: {
    marginVertical: '1%',
  },

  groupContainer: {
    alignSelf: 'center',
    width: WINDOW_WIDTH * 0.96,
  },
});
