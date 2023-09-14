import {StyleSheet} from 'react-native';
import {WINDOW_HEIGHT} from '../../../global';

const styles = StyleSheet.create({
  view: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: WINDOW_HEIGHT,
    backgroundColor: '#00000030',
  },

  outside: {
    flex: 1,
  },

  contentView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    gap: 10,
    paddingBottom: 20,
  },

  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  headerText: {
    color: 'black',
    fontSize: 17,
    fontWeight: 'bold',
    maxWidth: '90%',
  },

  deleteText: {
    color: '#FF1700',
    fontSize: 18,
    fontWeight: '500',
  },

  closeImage: {
    width: 30,
    height: 30,
  },

  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    padding: 2,
    borderRadius: 30,
    backgroundColor: '#00000035',
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },

  applyButton: {
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: '500',
  },

  quantityChange: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '50%',
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'lightgrey',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },

  quantityChangeText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },

  input: {
    fontSize: 16,
    fontWeight: '500',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',
    width: '50%',
    paddingHorizontal: 10,
    textAlign: 'right',
    paddingVertical: 5,
  },

  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
  },

  warning: {
    flexDirection: 'row',
    alignSelf: 'center',
  },

  warningImage: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
  },

  warningText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#909090',
  },
});

export default styles;
