import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    borderRadius: 10,
    paddingVertical: 10,
  },

  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderColor: '#00000010',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },

  itemLabel: {
    fontSize: 17,
    fontWeight: '400',
    color: 'black',
  },

  itemDate: {
    fontSize: 17,
    fontWeight: '400',
    color: '#00000080',
  },

  itemInfo: {
    fontSize: 16,
    paddingHorizontal: 10,
    color: 'black',
    fontWeight: '400',
  },

  itemName: {
    fontWeight: '500',
  },

  itemTotalPrice: {
    color: 'red',
  },

  itemDiscount: {
    color: 'green',
  },
});

export default styles;
