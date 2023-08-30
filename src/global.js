import { Dimensions } from 'react-native';

export const WINDOW_HEIGHT = Dimensions.get('screen').height;
export const WINDOW_WIDTH = Dimensions.get('screen').width;

const formatCurrency = new Intl.NumberFormat('vi-VN', {
});

const formatDecimal = new Intl.NumberFormat('vi-VN', {
  style: 'decimal',
  currency: 'VND',
});

export const formatprice = (value) => {
  return formatDecimal.format(value).replace(/\./g, ',') + 'đ';
}

export const formatPriceNotCurrency = (value) => {
  return formatCurrency.format(value).replace(/\./g, ',');
}

export const formatpoint = (value) => {
  if (typeof value == 'string') value = parseInt(value);
  return formatDecimal.format(value) + ' Point';
}

export const convertStatus = (status) => {
  switch (status) {
    case '0':
      return ['Đang xử lý']
    case '1':
      return ['Thành công']
    case '-1':
      return ['Đã hủy']
    case '-2':
      return ['Admin đã hủy']
  }
}

export const unitTimeStap = (created_at) => {
  // Chuyển đổi Unix timestamp sang đối tượng ngày tháng
  const date = new Date(created_at * 1000);

  const day = date.getDate();
  const month = date.getMonth() + 1; // Tháng bắt đầu từ 0, cần cộng thêm 1
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedMonth = month.toString().padStart(2, '0'); // Đảm bảo tháng có hai chữ số
  const formattedMinutes = minutes.toString().padStart(2, '0'); // Đảm bảo phút có hai chữ số

  const lastUpdate = `${day}/${formattedMonth}/${year} - ${hours}:${formattedMinutes}`;
  return lastUpdate;
}