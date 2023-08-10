import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },

  title: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '400',
  },

  priceView: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },

  price: {
    fontSize: 15,
    color: '#005aa9',
  },

  point: {
    fontSize: 15,
    color: 'green',
  },
  between: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '400',
    fontStyle: 'italic',
  },
});

export default styles;
