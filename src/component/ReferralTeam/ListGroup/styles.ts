import {StyleSheet} from 'react-native';
import {WINDOW_WIDTH} from '../../../global';

const styles = StyleSheet.create({
  list: {
    backgroundColor: 'white',
    flex: 1,
    maxHeight: 80,
  },

  contentList: {
    paddingTop: 15,
  },

  item: {
    flex: 1,
    width: WINDOW_WIDTH * 0.25,
    alignItems: 'center',
  },

  itemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#005aa9',
    maxWidth: '90%',
  },

  itemBody: {
    fontSize: 15,
    fontWeight: '400',
    maxWidth: '95%',
    textAlign: 'center',
  },
});

export default styles;
