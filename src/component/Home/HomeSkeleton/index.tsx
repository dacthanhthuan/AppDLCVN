import {Skeleton, LinearProgress} from '@rneui/themed';
import {ScrollView, ActivityIndicator, View, Image} from 'react-native';
import style from './style';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../../../MyGlobal';
const logo = require('../../../assets/Home/Rectangle2.png');

export default function HomeSkeleton() {
  return (
    <ScrollView style={style.container} showsVerticalScrollIndicator={false}>
      <View>
        <Skeleton
          // slide skeleton
          style={style.slideSkeleton}
          width={WINDOW_WIDTH * 0.94}
          height={WINDOW_HEIGHT * 0.2}
          animation="wave"
        />
        <Image source={logo} style={style.slideSkeletonImage} />
        <LinearProgress
          style={style.slideSkeletonProgress}
          color="rgba(0, 90, 169, 0.6)"
        />
      </View>

      <View style={style.categoryContainer}>
        {new Array(4).fill('category').map((item, index) => {
          return (
            <View key={item + index}>
              <Skeleton
                // category item skeleton
                style={style.categoryItem}
                animation="wave"
              />
              <Image source={logo} style={style.categorySkeletonImage} />
              <LinearProgress
                style={style.categorySkeletonProgress}
                color="rgba(0, 90, 169, 0.6)"
              />
            </View>
          );
        })}
      </View>

      <View style={style.productContainer}>
        {new Array(2).fill('product').map((item, index) => {
          return (
            <View key={item + index}>
              <Skeleton
                // category item skeleton
                style={style.productItem}
                animation="wave"
              />
              <Image source={logo} style={style.productSkeletonImage} />
              <LinearProgress
                style={style.productSkeletonProgres}
                color="rgba(0, 90, 169, 0.6)"
              />
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
