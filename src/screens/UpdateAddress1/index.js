import React, { useState } from 'react';
import styles from './styles';
import { SafeAreaView, Text, View, ScrollView, Alert } from 'react-native';
import Header from '../../component/Header';
import InputAddress from '../../component/InputAddress';
import TypeAddress from '../../component/TypeAddress';
import Button from '../../component/Button';
import DeliveryAddress from '../../component/DeliveryAddress';
import { fetchClientDetail, fetchSetDefaultAddress, fetchUpdateAddress } from '../AddAddress/http';
import { useSelector } from 'react-redux';
import { DELIVERY_ADDRESS, FETCH_USERS_SUCCESS } from '../../redux/actionTypes';
import { localData } from '../../Local/AsyncStorage';
import store from '../../redux/store';
import CheckBox from '@react-native-community/checkbox';
import { deliveryAddress } from '../../redux/actions';

const UpdateAddress1 = ({ navigation, route }) => {

  const { data } = useSelector((state) => state.postReducers)
  // Lấy item từ customerinformation và itemUpdate, itemId, itemIsDefault từ UpdataAddress 2
  const { item, itemUpdate, itemId, itemIsDefault, TOTAL_PRICE, DATA_MONEY, TOTAL_POINT, DATA_POINT, previouscreen, COMMISSION } = route?.params || {};
  console.log('UPDATE1:>>', COMMISSION);
  const [check, setCheck] = useState('Công ty');
  const [fullname, setFullName] = useState(item?.fullname);
  const [mobile, setMobile] = useState(item?.mobile);
  const [address, setAddress] = useState(item?.address);

  // console.log('itemUpdate:>>', itemUpdate);
  // console.log('UPDATE1:>>', item);

  // Dữ liệu nhận sau khi sửa Province, District, Ward
  let itemIdProvince = itemUpdate?.province?.id;
  let itemIdDistrict = itemUpdate?.district?.id;
  let itemIdWard = itemUpdate?.ward?.id;

  // Dữ liệu bên UpdateAddress2 truyển qua sau khi thay đổi
  let itemNameProvince = itemUpdate?.province?.name;
  let itemNameDistrict = itemUpdate?.district?.name;
  let itemNameWard = itemUpdate?.ward?.name;

  // Dữ liệu truyền vào để sửa thông tin địa chỉ 
  let session_token = data?.data?.session_token;
  let ID = itemId ? itemId : item?.id;
  let cityId = itemUpdate ? itemIdProvince : item?.city_id;
  let districtId = itemUpdate ? itemIdDistrict : item?.district_id;
  let wardId = itemUpdate ? itemIdWard : item?.ward_id;
  let isDefault = itemIsDefault ? itemIsDefault : item?.is_default;
  let [isSelected, setSelected] = useState(isDefault == 1 ? true : false);

  console.log(isDefault);
  console.log(isSelected);

  // console.log('session_token:>> ', session_token);
  // console.log('ID:>> ', ID);
  // console.log('cityId:>>', cityId);
  // console.log('districtId:>>', districtId);
  // console.log('wardId:>>', wardId);
  // console.log('address:>>', address);
  // console.log('mobile:>>', mobile);
  // console.log('fullname:>>', fullname);

  // Chọn Loại Địa Chỉ
  const handleTypeAddressPress = type => {
    setCheck(type);
  };

  let deliveryAddress = {
    'token': session_token,
    'id': ID,
    'cityId': cityId,
    'districtId': districtId,
    'wardId': wardId,
    'city': itemUpdate ? itemNameProvince : item?.city,
    'district': itemUpdate ? itemNameDistrict : item?.district,
    'ward': itemUpdate ? itemNameWard : item?.ward,
    'address': address,
    'mobile': mobile,
    'fullname': fullname,
  }

  console.log(deliveryAddress);

  const onPressUpdateAddress = async () => {
    if (address.trim() !== '' &&
      mobile.trim() !== '' &&
      fullname.trim() !== '') {
      try {
        const response = await fetchUpdateAddress({
          'toKen': session_token,
          'ID': ID,
          'cityId': cityId,
          'districtId': districtId,
          'wardId': wardId,
          'Address': address,
          'Mobile': mobile,
          'fullName': fullname
        });
        // Gọi API thành công, bạn có thể thực hiện các hành động khác ở đây
        console.log('Update address response:', response);
        store.dispatch({ type: DELIVERY_ADDRESS, payload: deliveryAddress });
        // GỌI API SET DEFAULT
        if (isDefault == 1 || isSelected == true) {
          const setDefaultResponse = await fetchSetDefaultAddress({
            'toKen': session_token,
            'ID': ID
          });
          console.log('setDefaultAddress response:', setDefaultResponse);

          // GỌI API CLIENT DETAIL
          const clientDetailResponse = await fetchClientDetail({
            'toKen': session_token
          });

          console.log('clientDetailResponse :>>', clientDetailResponse);

          // Lưu dữ liệu dưới Local
          await localData(clientDetailResponse);
          // gửi dữ liệu sau khi chọn địa chỉ mặc định lên Redux 
          store.dispatch({ type: FETCH_USERS_SUCCESS, payload: clientDetailResponse });
        }
        navigation.navigate('CustomerInformation', { TOTAL_PRICE, DATA_MONEY, TOTAL_POINT, DATA_POINT, previouscreen, COMMISSION });

      } catch (error) {
        // Xử lý lỗi nếu có
        console.log('Error update address:', error);
      }
    } else {
      Alert.alert('Thông báo', 'Vui lòng cập nhật đầy đủ thông tin địa chỉ');
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Header
        iconLeft={require('../../assets/Arrow1.png')}
        text="Sửa địa chỉ"
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <Text style={styles.title}>Thông tin liên hệ</Text>
      <InputAddress title="Họ và Tên" value={fullname} onChangeText={(text) => setFullName(text)} />
      <InputAddress title="Số điện thoại" keyboardType="number-pad" value={mobile} onChangeText={(text) => setMobile(text)} />
      <Text style={styles.titleAfter}>Địa chỉ giao hàng</Text>
      <DeliveryAddress
        city={itemUpdate ? itemNameProvince : item?.city}
        district={itemUpdate ? itemNameDistrict : item?.district}
        ward={itemUpdate ? itemNameWard : item?.ward}
        value={address}
        onChangeText={(text) => setAddress(text)}
        onPress={() => navigation.navigate('UpdateAddress2', { previousScreen: 'UpdateAddress1', itemId: item?.id, itemIsDefault: isDefault })}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ color: '#000000', fontSize: 16 }}>Đặt làm địa chỉ mặc định</Text>
        <CheckBox
          value={isSelected}
          onValueChange={setSelected}
        />
      </View>
      <Text style={styles.titleAfter}>Loại địa chỉ</Text>
      <View style={{ flexDirection: 'row', marginTop: 15 }}>
        <TypeAddress
          text="Công ty"
          check={check}
          onPress={handleTypeAddressPress}
        />
        <TypeAddress
          text="Nhà"
          check={check}
          onPress={handleTypeAddressPress}
        />
        <TypeAddress
          text="Khác"
          check={check}
          onPress={handleTypeAddressPress}
        />
      </View>
      <View style={{ alignItems: 'center', paddingVertical: 30 }}>
        <Button
          text="Cập nhật"
          style={{ width: '90%' }}
          onPress={onPressUpdateAddress}
        />
        <Button
          text="Xóa khách hàng"
          style={{
            width: '90%',
            backgroundColor: '#FFFFFF',
            borderColor: '#E20B0B',
            borderWidth: 1,
          }}
          styleText={{ color: '#E20B0B', fontWeight: '500' }}
          onPress={() => navigation.navigate('CustomerInformation')}
        />
      </View>
    </ScrollView>
  );
};

export default React.memo(UpdateAddress1);
