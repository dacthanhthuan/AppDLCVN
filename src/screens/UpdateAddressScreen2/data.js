import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const button = [
  {
    title: 'Tỉnh/Thành phố',
    value: 'provinces',
  },
  {
    title: 'Quận/Huyện',
    value: 'districts',
  },
  {
    title: 'Phường/Xã',
    value: 'wards',
  },
];

const FORM_DATA_PROVINCE = ({ toKen }) => {
  const data = new FormData();
  data.append("token", toKen)
  return data
}

const FORM_DATA_DISTRICT = ({ toKen, cityId }) => {
  const data = new FormData();
  data.append("token", toKen)
  data.append("city_id", cityId)
  return data
}

const FORM_DATA_WARD = ({ toKen, districtId }) => {
  const data = new FormData();
  data.append("token", toKen)
  data.append("district_id", districtId)
  return data
}

export const fetchProvince = async ({ toKen }) => {
  // Get Domain && APIKEY dưới Local
  const mainDomain = await AsyncStorage.getItem('domain');
  const apiKey = await AsyncStorage.getItem('apiKey');
  return await axios.post(`${mainDomain}/location/city?apikey=${apiKey}`, FORM_DATA_PROVINCE({ toKen }), {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data'
    }
  }).
    then(res => {
      return res.data.data
    });
};

export const fetchDistrict = async ({ toKen, cityId }) => {
  // Get Domain && APIKEY dưới Local
  const mainDomain = await AsyncStorage.getItem('domain');
  const apiKey = await AsyncStorage.getItem('apiKey');
  return await axios.post(
    `${mainDomain}/location/district?apikey=${apiKey}`, FORM_DATA_DISTRICT({ toKen, cityId }), {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data'
    }
  }
  ).then(res => {
    return res.data.data
  });
};

export const fetchWard = async ({ toKen, districtId }) => {
  // Get Domain && APIKEY dưới Local
  const mainDomain = await AsyncStorage.getItem('domain');
  const apiKey = await AsyncStorage.getItem('apiKey');
  return await axios.post(`${mainDomain}/location/ward?apikey=${apiKey}`, FORM_DATA_WARD({ toKen, districtId }), {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data'
    }
  }
  ).then(res => {
    return res.data.data
  });
};