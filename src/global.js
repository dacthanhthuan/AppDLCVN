import { Dimensions } from 'react-native';

export const WINDOW_HEIGHT = Dimensions.get('screen').height;
export const WINDOW_WIDTH = Dimensions.get('screen').width;

const formatCurrency = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});

export const formatprice = (value) => {
  return formatCurrency.format(value).replace(/\./g, ',');
}
