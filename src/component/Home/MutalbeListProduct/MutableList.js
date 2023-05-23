import Carousel from '../../Carousel';
import {StyleSheet, Image, View, Text, Pressable} from 'react-native';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../../../global';
import {useState, useEffect} from 'react';
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
        onSelect={value => setSelect(value)}
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
      _renderItem={({item}) => <GroupProductVertical data={item} />}
      itemPerPage={1}
      extraData={select}
    />
  );
};

const GroupProductVertical = ({data}) => {
  return (
    <View>
      {data?.map((item, index) => {
        return <VerticalProduct data={item} key={index} />;
      })}
    </View>
  );
};

export default MutableList;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: WINDOW_WIDTH * 0.96,
    marginVertical: '1%',
  },
});
