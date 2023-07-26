import {StyleSheet} from 'react-native';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../../../global';

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
    justifyContent: 'space-around',
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
    marginVertical: WINDOW_HEIGHT * 0.01,
    width: WINDOW_WIDTH * 0.96,
  },

  productItem: {
    borderRadius: 15,
    marginHorizontal: WINDOW_WIDTH * 0.01,
  },
});

export default style;
