import {Skeleton} from '@rneui/themed';
import {ScrollView, View} from 'react-native';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../../global';
import {StyleSheet} from 'react-native';

export default function WarehouseSkeleton() {
  return (
    <ScrollView style={style.container} showsVerticalScrollIndicator={false}>
      <View style={style.categoryContainer}>
        {new Array(4).fill('category').map((item, index) => {
          return (
            <Skeleton
              // category item skeleton
              style={style.categoryItem}
              height={WINDOW_HEIGHT * 0.11}
              width={(WINDOW_WIDTH * 0.88) / 4}
              animation="wave"
              key={item + index}
            />
          );
        })}
      </View>

      <View style={style.productContainer}>
        {new Array(4).fill('product').map((item, index) => {
          return (
            <Skeleton
              // category item skeleton
              style={style.productItem}
              height={WINDOW_HEIGHT * 0.35}
              width={(WINDOW_WIDTH * 0.9) / 2}
              animation="wave"
              key={item + index}
            />
          );
        })}
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },

  slideSkeleton: {
    alignSelf: 'center',
    marginVertical: WINDOW_HEIGHT * 0.01,
    borderRadius: 15,
  },

  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: WINDOW_WIDTH * 0.94,
    alignSelf: 'center',
    marginVertical: WINDOW_HEIGHT * 0.01,
  },

  categoryItem: {
    borderRadius: 10,
    marginHorizontal: WINDOW_WIDTH * 0.01,
  },

  productContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    flexWrap: 'wrap',
    marginVertical: WINDOW_HEIGHT * 0.01,
    width: WINDOW_WIDTH * 0.96,
  },

  productItem: {
    borderRadius: 15,
    marginHorizontal: WINDOW_WIDTH * 0.01,
    marginVertical: WINDOW_WIDTH * 0.01,
  },
});
