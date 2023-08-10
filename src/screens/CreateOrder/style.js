import {StyleSheet} from 'react-native';
import {WINDOW_WIDTH} from '../../MyGlobal';

const Style_CreateOrder = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    height: '100%',
  },
  icon: {
    width: 30,
    height: 30,
  },
  view_1: {
    flexDirection: 'row',
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  text_1: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    maxWidth: '60%',
  },
  text_2: {
    fontSize: 14,
    color: '#005AA9',
  },
  text_3: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '400',
  },
  view_2: {
    marginLeft: 10,
    height: 75,
    justifyContent: 'space-between',
    marginTop: 15,
  },
  text_4: {
    fontSize: 13,
    color: '#000000',
  },
  flatlist: {
    flexDirection: 'row',
    marginTop: 20,
    paddingHorizontal: 15,
  },
  view_3: {
    marginHorizontal: 10,
    width: WINDOW_WIDTH,
  },
  title_1: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 10,
  },

  productOrderTitle: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '400',
  },

  decrementBadge: {
    width: 30,
    height: 30,
    backgroundColor: 'red',
    color: 'white',
    borderRadius: 15,
    position: 'absolute',
    right: 0,
    top: 0,
    textAlign: 'center',
    verticalAlign: 'middle',
    zIndex: 1,
    fontSize: 13,
  },

  stroke_line: {
    fontSize: 12,
    textDecorationLine: 'line-through',
  },

  decrementPrice: {
    fontSize: 16,
    color: 'red',
    fontWeight: '500',
    flexWrap: 'wrap',
  },
});

export default Style_CreateOrder;
