import {useFocusEffect} from '@react-navigation/native';
import {Dimensions} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import {useCallback, useState} from 'react';

export const WINDOW_HEIGHT = Dimensions.get('screen').height;
export const WINDOW_WIDTH = Dimensions.get('screen').width;

export const formatCurrency = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});

export const formatDecimal = new Intl.NumberFormat('vi-VN', {
  style: 'decimal',
  currency: 'VND',
});

export const formatPrice = value => {
  if (typeof value == 'string') value = parseInt(value);
  return formatCurrency.format(value).replace(/\./g, '.');
};

export const formatPoint = value => {
  if (typeof value == 'string') value = parseInt(value);
  return formatDecimal.format(value) + ' Point';
};

export const nomarlizeVietNamese = str => {
  // Chuyển hết sang chữ thường
  str = str.toLowerCase();

  // xóa dấu
  str = str
    .normalize('NFD') // chuyển chuỗi sang unicode tổ hợp
    .replace(/[\u0300-\u036f]/g, ''); // xóa các ký tự dấu sau khi tách tổ hợp

  // Thay ký tự đ,Đ
  str = str.replace(/[đĐ]/g, 'd');

  // Xóa ký tự đặc biệt
  str = str.replace(/([^0-9a-z-\s])/g, '');

  // Xóa khoảng trắng thay bằng ký tự -
  str = str.replace(/(\s+)/g, '-');

  // Xóa ký tự - liên tiếp
  str = str.replace(/-+/g, '-');

  // xóa phần dư - ở đầu & cuối
  str = str.replace(/^-+|-+$/g, '');

  // return
  return str;
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

export function modifyData(item) {
  const modifyData = [];

  item.forEach(respone => {
    const theme = respone?.data?.theme || [];
    const productList = respone?.data?.l || [];
    const popup = respone?.data.popup;
    const page = respone?.data.page;

    if (page == 1) {
      theme.forEach(item => {
        const themeLayout = item?.layout;

        let slide = {
          type: '',
          title: '',
          data: [],
        };
        let category1 = {
          type: '',
          title: '',
          data: [],
        };
        let category2 = {
          type: '',
          title: '',
          data: [],
        };
        let product1 = {
          type: '',
          title: '',
          data: [],
        };
        let product2 = {
          type: '',
          title: '',
          data: [],
        };

        // check data exist
        if (item.slide_list.length > 0) {
          slide.data = item.slide_list;
          slide.type = 'slide';
        }

        if (item.category_1_list.length > 0) {
          category1.data = [item.category_1_list];
          category1.type = 'category';
        }

        if (item.category_2_list.length > 0) {
          category2.type = 'category';
          category2.data = [item.category_2_list];
        }

        if (item.product_1_list.length > 0) {
          product1.data = [item.product_1_list];
          product1.type = 'product';
        }

        if (item.product_2_list.length > 0) {
          product2.data = [item.product_2_list];
          product2.type = 'product';
        }

        // slide theme
        if (slide.data.length > 1) {
          slide.type += '/carousel';
          slide.data = [slide.data];
        }
        if (themeLayout.slide_size == 'big') {
          slide.type += '/big';
        } else {
          slide.type += '/small';
        }

        // cate theme
        if (themeLayout.cate == 'portrait') {
          category1.type += '/portrait';
          category2.type += '/portrait';
        } else {
          category1.type += '/landscape';
          category2.type += '/landscape';
          if (themeLayout.slide_cate == 'small') {
            category1.type += '/small';
            category2.type += '/small';
          } else {
            category1.type += '/big';
            category2.type += '/big';
          }
        }

        if (themeLayout.cate_show_more == 1) {
          category1.type += '/showmore';
          category2.type += '/showmore';
        }

        // product theme
        if (themeLayout.product == 'portrait') {
          product1.type += '/portrait';
          product2.type += '/portrait';
        } else {
          product1.type += '/landscape';
          product2.type += '/landscape';
        }

        if (themeLayout.product_show_more == 1) {
          product1.type += '/showmore';
          product2.type += '/showmore';
        }

        if (item.name_show == 1) {
          if (slide.data.length > 0) {
            slide.title = item.name;
          } else if (category1.data.length > 0) {
            category1.title = item.name;
          } else if (product1.data.length > 0) {
            product1.title = item.name;
          }
        }

        if (slide.data.length > 0) {
          modifyData.push(slide);
        }
        if (category1.data.length > 0) {
          modifyData.push(category1);
        }
        if (category2.data.length > 0) {
          modifyData.push(category2);
        }
        if (product1.data.length > 0) {
          modifyData.push(product1);
        }
        if (product2.data.length > 0) {
          modifyData.push(product2);
        }
      });
    }

    if (productList.length > 0) {
      if (page == 1) {
        modifyData.push({
          type: 'product/portrait',
          title: 'GỢI Ý HÔM NAY',
          data: [productList],
        });
      } else {
        modifyData.push({
          type: 'product/portrait',
          title: '',
          data: [productList],
        });
      }
    }

    if (popup != null && popup.length > 0) {
      modifyData.push({
        title: '',
        type: 'popup',
        data: [popup],
      });
    }
  });

  return modifyData;
}

export function useIsReady() {
  const [isReady, setIsReady] = useState(false);

  useCallback(
    useFocusEffect(() => {
      setTimeout(() => {
        setIsReady(true);
      }, 100);
    }),
    [],
  );

  return isReady;
}

export const secondToMs = value => {
  return parseInt(value) * 1000;
};

export const secondToGlobalDate = value => {
  const second = parseInt(value) * 1000;
  const date = new Date(second);
  return date;
};

export const showmoreImage = require('./assets/Rectangle270.png');
