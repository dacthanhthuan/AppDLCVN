import {StyleSheet} from 'react-native';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../../global';

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    position: 'absolute',
    top: 0,
  },

  view: {
    width: '100%',
    height: '80%',
    backgroundColor: 'rgba(255, 255, 150, 1)',
    paddingBottom: 15,
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
    paddingBottom: 10,
  },

  notfoundText: {
    fontWeight: '400',
    fontSize: 15,
    color: 'black',
  },

  outside: {
    height: '12%',
    opacity: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  closeButton: {
    transform: [{rotateZ: '45deg'}],
    width: 50,
    height: 50,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  cartContainer: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },

  cart: {
    width: 40,
    height: 40,
  },

  cartBadge: {
    position: 'absolute',
    bottom: 0,
    right: 10,
  },
});

export default styles;
