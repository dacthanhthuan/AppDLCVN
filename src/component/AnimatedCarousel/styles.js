import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
  pageDotCont: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: '2%',
  },

  pageDot: {
    width: 15,
    height: 15,
    borderRadius: 180,
    marginHorizontal: 5,
  },

  pageDotActive: {
    width: 8,
    height: 8,
    backgroundColor: '#005AA9',
  },

  pageDotInactive: {
    width: 8,
    height: 8,
    backgroundColor: '#D9D9D9',
  },
});
