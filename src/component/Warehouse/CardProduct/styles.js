import {StyleSheet} from 'react-native';
import {WINDOW_WIDTH, WINDOW_HEIGHT} from '../../../global';

const styles = StyleSheet.create({
  container: {
    width: (WINDOW_WIDTH * 0.94) / 2,
    height: 280,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  containerView: {
    width: '94%',
    height: '96%',
    borderRadius: 7,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    // shadowOffset: {
    //     width: 0,
    //     height: 2,
    // },
    // shadowOpacity: 0.3,
    // shadowRadius: 4.65,
    //Andorid
    elevation: 3,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  image: {
    width: 130,
    height: 110,
    alignSelf: 'center',
  },
  title: {
    fontSize: 16,
    color: '#005AA9',
    marginTop: 22,
    paddingLeft: 12,
    width: '100%',
  },
  id: {
    fontSize: 13,
    color: '#C2C2C2',
    marginTop: 7,
    paddingLeft: 12,
  },
  price: {
    fontSize: 16,
    color: '#09355C',
    marginTop: 7,
    fontWeight: '500',
    paddingLeft: 12,
  },

  decrementBadge: {
    width: 35,
    height: 35,
    backgroundColor: 'red',
    color: 'white',
    borderRadius: 20,
    position: 'absolute',
    right: 5,
    top: 5,
    textAlign: 'center',
    verticalAlign: 'middle',
    zIndex: 1,
    fontSize: 13,
  },

  renderDecrement: {
    color: 'red',
    fontWeight: '500',
    fontSize: 16,
    fontWeight: '500',
    paddingLeft: 12,
    textDecorationLine: 'line-through',
  },

  addToCartContainer: {
    width: 35,
    height: 35,
    position: 'absolute',
    bottom: 2,
    right: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  addToCart: {
    fontSize: 20,
    color: 'white',
    backgroundColor: '#09355C',
    width: '80%',
    height: '80%',
    textAlign: 'center',
    verticalAlign: 'middle',
    borderRadius: 20,
  },

  renderPrice: {
    fontSize: 14,
    color: '#09355C',
    fontWeight: '500',
  },

  renderCommission: {
    fontSize: 13,
    color: '#1A5D1A',
    fontWeight: '500',
  },

  renderProfit: {
    fontSize: 13,
    color: '#141E46',
    fontWeight: '500',
  },

  renderProductId: {
    marginLeft: 10,
    fontSize: 13,
    color: '#8B8787',
  },
});

export default styles;
