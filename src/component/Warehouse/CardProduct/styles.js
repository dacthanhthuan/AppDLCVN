import {StyleSheet} from 'react-native';
import {WINDOW_WIDTH, WINDOW_HEIGHT} from '../../../MyGlobal';

const styles = StyleSheet.create({
  container: {
    width: (WINDOW_WIDTH * 0.94) / 2,
    height: WINDOW_HEIGHT * 0.32,
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
  },

  stroke_text: {
    textDecorationLine: 'line-through',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default styles;
