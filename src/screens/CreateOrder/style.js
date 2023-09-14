import {StyleSheet} from 'react-native';
import {WINDOW_WIDTH} from '../../global';

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

  name: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
  text_2: {
    fontSize: 14,
    fontWeight: '500',
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
    fontWeight: 'bold',
  },

  productOrderTitle: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '400',
  },

  stroke_line: {
    fontSize: 12,
    textDecorationLine: 'line-through',
  },

  price: {
    fontSize: 16,
    color: '#005aa9',
    fontWeight: '500',
    flexWrap: 'wrap',
  },

  priceView: {
    flexDirection: 'row',
    gap: 20,
  },

  decrementBadge: {
    backgroundColor: '#df1234',
    fontSize: 14,
    color: 'white',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default Style_CreateOrder;
