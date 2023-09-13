import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  list: {
    flex: 1,
    marginVertical: 10,
    maxHeight: 50,
  },

  contentList: {},

  itemButton: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    backgroundColor: '#f2f2f2',
  },

  selectedItemButton: {
    backgroundColor: '#005aa9',
  },

  itemLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: 'black',
  },

  selectedItemLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default styles;
