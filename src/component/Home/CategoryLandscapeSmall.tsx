import ImageButton from './ImageButton';
import {StyleSheet, FlatList} from 'react-native';
import {WINDOW_HEIGHT, WINDOW_WIDTH, showmoreImage} from '../../global';
import {memo} from 'react';
import {useNavigation} from '@react-navigation/native';

type CategoryLandscapeSmallProps = {
  item: any[];
  isShowmore: boolean;
};

const CategoryLandscapeSmall = ({
  item,
  isShowmore = false,
}: CategoryLandscapeSmallProps) => {
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
      renderItem={({item}) => {
        return (
          <ImageButton
            // onPress={() => navigation.navigate(getScreen(item.title))}
            imagesource={item.source || {uri: item.icon}}
            text={item.title || item.name}
            containerStyle={styles.categoryCont}
            imageStyle={styles.categoryImage}
            textStlye={styles.categoryText}
            onPress={undefined}
            resizeMode={undefined}
          />
        );
      }}
    />
  );
};

export default memo(
  CategoryLandscapeSmall,
  (pre, next) => JSON.stringify(pre) === JSON.stringify(next),
);

const styles = StyleSheet.create({
  flatlist: {
    marginHorizontal: WINDOW_WIDTH * 0.02,
    maxHeight: WINDOW_HEIGHT * 0.06,
    // marginBottom: '3%',
    // marginTop: '2%',
  },

  categoryCont: {
    flexDirection: 'row',
    height: WINDOW_HEIGHT * 0.05,
    marginHorizontal: WINDOW_WIDTH * 0.01,
    justifyContent: 'space-around',
    backgroundColor: '#F6F6F6',
    borderRadius: 6,
  },

  categoryImage: {
    height: '80%',
    width: WINDOW_HEIGHT * 0.06,
    alignSelf: 'center',
    flex: 1,
  },

  categoryText: {
    color: 'black',
    fontSize: 14,
    alignSelf: 'center',
    flex: 3,
    paddingHorizontal: 10,
    maxWidth: 150,
  },
});
