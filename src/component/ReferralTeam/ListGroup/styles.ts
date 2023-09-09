import {StyleSheet} from 'react-native';
import {WINDOW_WIDTH} from '../../../global';

const styles = StyleSheet.create({
  list: {
    backgroundColor: 'white',
    flex: 1,
    maxHeight: 100,
  },

  contentList: {
    paddingTop: 15,
    paddingHorizontal: 10,
    gap: 5,
  },

  item: {
    flex: 1,
    width: WINDOW_WIDTH * 0.25,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
  },

  itemPressed: {
    backgroundColor: '#005aa930',
  },

  itemSelected: {
    borderWidth: 2.5,
    borderColor: '#005aa980',
    backgroundColor: '#f2f2f2',
  },

  itemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#005aa9',
    maxWidth: '90%',
  },

  itemTitleSelected: {
    color: '#005aa9',
  },

  itemBody: {
    fontSize: 15,
    fontWeight: '400',
    maxWidth: '95%',
    textAlign: 'center',
    color: 'grey',
  },

  itemBodySelected: {
    color: 'black',
    fontWeight: '500',
  },
});

export default styles;
