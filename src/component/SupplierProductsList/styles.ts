import {StyleSheet} from 'react-native';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../../global';

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    position: 'absolute',
    bottom: 0,
  },

  outside: {
    flex: 1,
  },

  view: {
    width: '100%',
    height: '85%',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },

  supplierName: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
    paddingTop: 10,
    paddingHorizontal: 10,
  },

  supplierTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
    paddingTop: 10,
    paddingHorizontal: 10,
  },

  productListTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
    paddingHorizontal: 10,
    paddingVertical: 5,
    textTransform: 'uppercase',
  },

  flatlist: {
    width: '94%',
    alignSelf: 'center',
  },

  contentFlatlist: {
    paddingBottom: 20,
  },

  notfoundText: {
    fontWeight: '400',
    fontSize: 15,
    color: 'black',
  },
});

export default styles;
