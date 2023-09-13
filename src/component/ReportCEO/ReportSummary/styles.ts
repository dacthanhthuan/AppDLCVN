import {StyleSheet} from 'react-native';
import {WINDOW_WIDTH} from '../../../global';

const styles = StyleSheet.create({
  title: {
    marginVertical: 10,
    marginLeft: 15,
    fontSize: 17,
    color: 'black',
    fontWeight: 'bold',
  },

  list: {
    maxHeight: 200,
    marginBottom: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-evenly',
    marginHorizontal: WINDOW_WIDTH * 0.03,
  },

  item: {
    backgroundColor: '#005aa930',
    width: WINDOW_WIDTH * 0.45,
    height: 95,
    borderRadius: 10,
  },

  itemImage: {
    width: 30,
    height: 30,
    opacity: 0.3,
    position: 'absolute',
    right: 5,
    top: 20,
  },

  itemValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 20,
    color: 'black',
  },

  itemName: {
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
    marginLeft: 10,
    marginTop: 10,
  },

  loadingIndicator: {
    position: 'absolute',
    top: 80,
    alignSelf: 'center',
  },

  containerLoading: {
    opacity: 0.5,
  },
});

export default styles;
