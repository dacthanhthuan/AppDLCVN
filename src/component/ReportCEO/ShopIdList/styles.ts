import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  list: {
    maxHeight: 40,
    marginVertical: 10,
  },

  contentList: {
    gap: 10,
    paddingHorizontal: 15,
  },

  item: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 180,
  },

  itemSelected: {
    backgroundColor: '#f2f2f2',
  },

  itemLabel: {
    fontSize: 16,
    color: 'black',
    fontWeight: '400',
  },
});

export default styles;
