import {Skeleton} from '@rneui/themed';
import {ScrollView, RefreshControl, View} from 'react-native';
import style from './style';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../../../global';

export default function HomeSkeleton() {
  return (
    <ScrollView style={style.container} showsVerticalScrollIndicator={false}>
      <Skeleton
        // slide skeleton
        style={style.slideSkeleton}
        width={WINDOW_WIDTH * 0.94}
        height={WINDOW_HEIGHT * 0.2}
        animation="wave"
      />

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
        {new Array(2).fill('product').map((item, index) => {
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
