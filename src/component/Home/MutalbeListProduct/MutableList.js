// import Carousel from '../../Carousel';
import Carousel from '../../AnimatedCarousel';
import {StyleSheet, View} from 'react-native';
import {WINDOW_WIDTH} from '../../../global';
import {useState, useEffect, memo} from 'react';
import ButtonGroup from './ButtonGroup';
import VerticalProduct from './VerticalProduct';

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

const MutableCarousel = ({data, select}) => {
  let [dataSpilit, setDataSpilit] = useState([]);

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
      autoPlay={true}
      width={WINDOW_WIDTH}
      height={400}
      autoPlayInterval={2000}
      loop={true}
      showPagination={true}
      extraData={select}
    />
  );
};

const GroupProductVertical = ({data}) => {
  return (
    <View style={styles.groupContainer}>
      {data?.map((item, index) => {
        return <VerticalProduct data={item} key={index} />;
      })}
    </View>
  );
};

export default memo(
  MutableList,
  (pre, next) => JSON.stringify(pre.item) === JSON.stringify(next.item),
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
