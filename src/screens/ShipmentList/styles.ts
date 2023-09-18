import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  header: {
    padding: 15,
  },

  listContent: {
    gap: 10,
    marginHorizontal: 15,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#005aa930',
    borderRadius: 15,
  },

  itemImage: {
    width: 60,
    height: 60,
    marginRight: 10,
  },

  itemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },

  itemLabel: {
    fontSize: 14,
    color: 'black',
  },

  itemValue: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
  },

  itemPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: '#dd1234',
  },

  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default styles;
