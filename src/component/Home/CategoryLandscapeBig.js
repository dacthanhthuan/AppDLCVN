import ImageButton from './ImageButton';
import {StyleSheet, FlatList} from 'react-native';
import {WINDOW_HEIGHT, WINDOW_WIDTH, showmoreImage} from '../../global';
import {memo} from 'react';
import {useNavigation} from '@react-navigation/native';

const CategoryLandscapeBig = ({item, isShowmore = false}) => {
  const navigation = useNavigation();
  // const screens = [
  //   { title: 'TPCN', screen: 'ProtectHealth' },
  //   { title: 'Sữa', screen: 'FamilyCare' },
  //   { title: 'Dưỡng da', screen: 'FamilyCare' },
  //   { title: 'Chống nắng', screen: 'PersonalCare' }
  // ];
  // const getScreen = (title) => {
  //   const foundScreen = screens.find(screen => screen.title === title);
  //   return foundScreen ? foundScreen.screen : 'DefaultScreen';
  // };

  const data = isShowmore
    ? [
        ...item,
        {
          name: 'Xem thêm...',
          source: showmoreImage,
        },
      ]
    : item;

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      style={styles.flatlist}
      horizontal={true}
      initialNumToRender={4}
      data={data}
      renderItem={({item}) => (
        <ImageButton
          // onPress={() => navigation.navigate(getScreen(item.title))}
          imagesource={item.source || {uri: item.icon}}
          text={item.title || item.name}
          containerStyle={styles.categoryCont}
          imageStyle={styles.categoryImage}
          textStlye={styles.categoryText}
        />
      )}
    />
  );
};

export default memo(
  CategoryLandscapeBig,
  (pre, next) => JSON.stringify(pre) === JSON.stringify(next),
);

const styles = StyleSheet.create({
  flatlist: {
    marginHorizontal: WINDOW_WIDTH * 0.02,
    // marginBottom: '3%',
    // marginTop: '2%',
  },

  categoryCont: {
    width: (WINDOW_WIDTH * 0.88) / 4,
    height: WINDOW_HEIGHT * 0.11,
    marginHorizontal: WINDOW_WIDTH * 0.01,
    justifyContent: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: 3,
  },

  categoryImage: {
    width: '60%',
    height: '50%',
    alignSelf: 'center',
  },

  categoryText: {
    color: 'black',
    fontSize: 14,
    alignSelf: 'center',
  },
});
