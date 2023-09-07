import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: '#00000015',
    marginVertical: 10,
  },

  listContent: {
    paddingVertical: 10,
    gap: 10,
  },

  emptyListText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#005aa9',
    alignSelf: 'center',
  },

  item: {
    flexDirection: 'row',
    flex: 1,
    height: 100,
    width: '96%',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
  },

  itemAvatar: {
    width: 60,
    height: 60,
    marginLeft: 15,
  },

  itemTextView: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginLeft: 15,
    gap: 5,
  },

  itemBoldText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },

  itemNormalText: {
    fontSize: 16,
    fontWeight: '400',
  },

  itemSpentText: {
    fontWeight: '500',
    fontSize: 16,
    color: 'limegreen',
  },

  itemGroupTag: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#005aa9',
    paddingHorizontal: 30,
    paddingVertical: 5,
    color: 'white',
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    fontSize: 14,
  },

  itemRightIcon: {
    position: 'absolute',
    right: 20,
    top: 55,
  },
});

export default styles;
