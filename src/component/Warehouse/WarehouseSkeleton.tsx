import {LinearProgress, Skeleton} from '@rneui/themed';
import {Image, ScrollView, View} from 'react-native';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../../global';
import {StyleSheet} from 'react-native';
const logo = require('../../assets/Home/Rectangle2.png');

export default function WarehouseSkeleton() {
  return (
    <ScrollView style={style.container} showsVerticalScrollIndicator={false}>
      <View style={style.productContainer}>
        {new Array(4).fill('product').map((item, index) => {
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

const style = StyleSheet.create({
  container: {
    flex: 1,
  },

  productContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: WINDOW_HEIGHT * 0.01,
    width: WINDOW_WIDTH * 0.96,
  },

  productItem: {
    borderRadius: 15,
    marginHorizontal: WINDOW_WIDTH * 0.01,
    marginVertical: WINDOW_WIDTH * 0.01,
    height: WINDOW_HEIGHT * 0.35,
    width: (WINDOW_WIDTH * 0.9) / 2,
  },
  productSkeletonImage: {
    position: 'absolute',
    alignSelf: 'center',
    width: (WINDOW_WIDTH * 0.9) / 3.5,
    height: (WINDOW_HEIGHT * 0.35) / 4,
    top: (WINDOW_HEIGHT * 0.35) / 4 + (WINDOW_HEIGHT * 0.35) / 8,
  },

  productSkeletonProgres: {
    position: 'absolute',
    alignSelf: 'center',
    top: (WINDOW_HEIGHT * 0.35) / 1.5,
    width: ((WINDOW_WIDTH * 0.9) / 2) * 0.8,
    borderRadius: 3,
    height: 6,
  },
});
