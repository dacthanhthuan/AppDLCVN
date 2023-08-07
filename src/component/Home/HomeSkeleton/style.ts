import {StyleSheet} from 'react-native';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../../../MyGlobal';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },

  slideSkeleton: {
    alignSelf: 'center',
    marginVertical: WINDOW_HEIGHT * 0.01,
    borderRadius: 15,
    width: WINDOW_WIDTH * 0.94,
    height: WINDOW_HEIGHT * 0.2,
  },

  slideSkeletonImage: {
    position: 'absolute',
    width: (WINDOW_WIDTH * 0.94) / 2,
    height: (WINDOW_HEIGHT * 0.2) / 2,
    alignSelf: 'center',
    top: (WINDOW_HEIGHT * 0.2) / 4,
  },

  slideSkeletonProgress: {
    position: 'absolute',
    alignSelf: 'center',
    top: (WINDOW_HEIGHT * 0.2) / 1.25,
    width: WINDOW_WIDTH * 0.8,
    borderRadius: 3,
    height: 6,
  },

  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: WINDOW_WIDTH * 0.94,
    alignSelf: 'center',
    marginVertical: WINDOW_HEIGHT * 0.01,
  },

  categoryItem: {
    borderRadius: 10,
    marginHorizontal: WINDOW_WIDTH * 0.01,
    height: WINDOW_HEIGHT * 0.11,
    width: (WINDOW_WIDTH * 0.88) / 4,
  },

  categorySkeletonImage: {
    position: 'absolute',
    alignSelf: 'center',
    width: (WINDOW_WIDTH * 0.88) / 8,
    height: (WINDOW_HEIGHT * 0.11) / 2.5,
    top: (WINDOW_HEIGHT * 0.11) / 4,
  },

  categorySkeletonProgress: {
    position: 'absolute',
    alignSelf: 'center',
    top: (WINDOW_HEIGHT * 0.11) / 1.4,
    width: (WINDOW_WIDTH * 0.88) / 6,
    borderRadius: 2,
    height: 4,
  },

  productContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: WINDOW_HEIGHT * 0.01,
    width: WINDOW_WIDTH * 0.96,
  },

  productItem: {
    borderRadius: 15,
    marginHorizontal: WINDOW_WIDTH * 0.01,
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

export default style;
