import {StyleSheet} from 'react-native';

const Style_Information = StyleSheet.create({
  container_1: {
    width: '100%',
  },
  text_1: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '400',
  },
  price_1: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '400',
    textAlign: 'right',
  },
  container_2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },

  container_3: {
    justifyContent: 'space-between',
  },
  container_4: {
    justifyContent: 'space-between',
    height: 40,
    alignItems: 'flex-end',
  },

  price_3: {
    color: '#0FA027',
    fontSize: 14,
    fontWeight: '400',
  },
});

export default Style_Information;
