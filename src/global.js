import {Dimensions} from 'react-native';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';

export const WINDOW_HEIGHT = Dimensions.get('screen').height;
export const WINDOW_WIDTH = Dimensions.get('screen').width;

const formatCurrency = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});

export const formatprice = value => {
  if (typeof value == 'string') value = parseInt(value);
  return formatCurrency.format(value).replace(/\./g, ',');
};

export function mobileCheck(value) {
  if (!isNaN(value)) {
    if (value.length < 10) {
      return 'Số điện thoại phải từ 10 chữ số';
    } else {
      return null;
    }
  } else {
    return 'Số điện thoại không hợp lệ';
  }
}

export function passwordCheck(value) {
  if (value.length < 5) {
    return 'Mật khẩu phải từ 5 ký tự trở lên';
  } else return null;
}

export function mailCheck(value) {
  const regexExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;

  if (regexExp.test(value)) {
    return null;
  } else {
    return 'Địa chỉ email không hợp lệ';
  }
}

export const BIOMETRIC = new ReactNativeBiometrics();

export const showmoreImage = require('./assets/Rectangle270.png');
