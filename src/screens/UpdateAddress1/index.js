import React, {useEffect, useState} from 'react';
import styles from './styles';
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Header from '../../component/Header';
import InputAddress from '../../component/InputAddress';
import Button from '../../component/Button';
import TypeAddress from '../../component/TypeAddress';
import {useDispatch, useSelector} from 'react-redux';
import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import {
  addressBookUpdateStart,
  addressBookListAllStart,
  addressBookSetDefaultStart,
} from '../../redux/actions/addressBookActions';
import {mobileCheck} from '../../MyGlobal';
import {clientGetDetailUserStart} from '../../redux/actions/userActions';

const UpdateAddress1 = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const session_token = useSelector(state => state.user.session_token); // user token
  const listLoading = useSelector(state => state.addressBook.listLoading);
  const updateState = useSelector(state => state.addressBook.updateState);
  const setDefaultState = useSelector(
    state => state.addressBook.setDefaultState,
  );
  const location = route.params?.address || undefined; // location if user change address
  const data = route.params?.data || {}; // data is passed from previous screen

  // declare state
  const [check, setCheck] = useState('Công ty');
  const [fullname, setFullname] = useState(data.fullname);
  const [mobile, setMobile] = useState(data.mobile);
  const [address, setAddress] = useState(data.address);
  const [ispressed, setIsPressed] = useState(false);
  const [error, setError] = useState('');

  const handleTypeAddressPress = type => {
    setCheck(type);
  };

  // handle update button is pressed
  const onUpdatePress = () => {
    const mobileError = mobileCheck(mobile);
    if (fullname.length == 0) setError('Vui lòng nhập Họ và tên');
    else if (mobileError) setError(mobileError);
    else if (address.length == 0 || (!data && !location))
      setError('Vui lòng nhập địa chỉ giao hàng');
    else {
      const city_id = location ? location.city.id : data.city_id;
      const district_id = location ? location.district.id : data.district_id;
      const ward_id = location ? location.ward.id : data.ward_id;
      const id = data.id;
      dispatch(
        addressBookUpdateStart({
          token: session_token,
          id: id,
          city_id: city_id,
          district_id: district_id,
          ward_id: ward_id,
          address: address,
          fullname: fullname,
          mobile: mobile,
        }),
      );
      setIsPressed(true);
    }
  };

  const onSetDefaultPress = () => {
    const id = data.id;
    dispatch(
      addressBookSetDefaultStart({
        token: session_token,
        id: id,
      }),
    );
    setIsPressed(true);
  };

  // after update, dispatch get list to reload data
  useEffect(() => {
    if (!updateState && ispressed) {
      dispatch(addressBookListAllStart(session_token));
    }
  }, [updateState]);

  // after set default,
  useEffect(() => {
    if (!setDefaultState && ispressed) {
      dispatch(addressBookListAllStart(session_token));
    }
  }, [setDefaultState]);

  // go back previous screen when list is
  useEffect(() => {
    if (!listLoading && ispressed) {
      // reload user data after change
      dispatch(clientGetDetailUserStart(session_token));
      navigation.dispatch(StackActions.pop());
    }
  }, [listLoading]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <Header
          iconLeft={require('../../assets/Arrow1.png')}
          text="Sửa địa chỉ"
          onPressLeft={() => {
            navigation.goBack();
          }}
        />

        <Text style={styles.title}>Thông tin liên hệ</Text>

        <InputAddress
          title="Họ và Tên"
          onChangeText={setFullname}
          value={fullname}
        />
        <InputAddress
          title="Số điện thoại"
          keyboardType="number-pad"
          onChangeText={setMobile}
          value={mobile}
        />

        <Text style={styles.titleAfter}>Địa chỉ giao hàng</Text>

        <View style={{marginLeft: 25}}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('UpdateAddress2', {
                root_screen: 'UpdateAddress1',
                data: data,
              })
            }
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 18,
            }}>
            <Text
              style={[
                location || data ? {color: 'black'} : {color: 'grey'},
                {fontSize: 16, paddingVertical: 7},
              ]}
              numberOfLines={2}>
              {location
                ? `${location.city.type + ' ' + location.city.name}, ${
                    location.district.name
                  }, ${location.ward.name}`
                : data
                ? `${data.city}, ${data.district}, ${data.ward}`
                : 'Tỉnh/Thành phố, Quận/Huyện, Phường/Xã'}
            </Text>
            <Image source={require('../../assets/vectorRight.png')} />
          </TouchableOpacity>
          <View style={styles.line}></View>
          <TextInput
            style={{fontSize: 15}}
            placeholderTextColor="grey"
            placeholder="Số nhà, tên đường"
            multiline
            value={address}
            onChangeText={setAddress}
          />
        </View>

        <Text style={styles.titleAfter}>Loại địa chỉ</Text>

        <View style={{flexDirection: 'row', marginTop: 15}}>
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

        {error.length > 0 ? <Text style={styles.error}>*{error}</Text> : null}

        <View style={{alignItems: 'center'}}>
          <Button
            text="Cập nhật"
            style={{width: '90%', marginTop: 50, height: 60}}
            onPress={onUpdatePress}
          />
          <Button
            text="Cập nhật & Đặt làm địa chỉ mặc định"
            style={{width: '90%', marginTop: 20, height: 60}}
            onPress={() => {
              onUpdatePress();
              onSetDefaultPress();
            }}
          />
          <Button
            text="Xoá khách hàng"
            style={{
              width: '90%',
              marginTop: 20,
              backgroundColor: 'white',
              borderColor: '#E20b0b',
              borderWidth: 2,
              height: 60,
            }}
            styleText={{color: '#E20b0b', fontWeight: '400'}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(UpdateAddress1);
