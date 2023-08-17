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
  addressBookListAllStart,
  addressBookNewStart,
} from '../../redux/actions/addressBookActions';
import {mobileCheck} from '../../global';
import {clientGetDetailUserStart} from '../../redux/actions/userActions';
import {
  NotificationActions,
  useNotificationDispatch,
} from '../../component/NotificationContext/context';
import {NotificationType} from '../../component/NotificationContext/types';

const AddAddress = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const notification = useNotificationDispatch();

  const dispatch = useDispatch();
  const session_token = useSelector(state => state.user.session_token); // user token
  const location = route.params?.address || undefined; // location from update address 2 screen
  const data = route.params?.data || {}; // location from update address 2 screen
  const newState = useSelector(state => state.addressBook.newState);
  const listLoading = useSelector(state => state.addressBook.listLoading);

  // declare state
  const [check, setCheck] = useState('Công ty');
  const [fullname, setFullname] = useState(data?.fullname || '');
  const [mobile, setMobile] = useState(data?.mobile || '');
  const [address, setAddress] = useState(data?.address || '');
  const [ispressed, setIsPressed] = useState(false);
  const [error, setError] = useState('');

  const onAddPress = () => {
    const mobileError = mobileCheck(mobile);
    if (fullname.length == 0) setError('Vui lòng nhập Họ và tên');
    else if (mobileError) setError(mobileError);
    else if (address.length == 0 || !location)
      setError('Vui lòng nhập địa chỉ giao hàng');
    else {
      const city_id = location.city.id;
      const district_id = location.district.id;
      const ward_id = location.ward.id;
      dispatch(
        addressBookNewStart({
          token: session_token,
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

  useEffect(() => {
    if (!newState && ispressed) {
      dispatch(addressBookListAllStart(session_token));
    }
  }, [newState]);

  useEffect(() => {
    if (!listLoading && ispressed) {
      // display notificaton
      notification(
        NotificationActions.rise({
          data: {
            message: 'Thêm địa chỉ thành công',
          },
          duration: 3000,
          type: NotificationType.NORMAL,
        }),
      );

      // reload user data after change
      dispatch(clientGetDetailUserStart(session_token));
      navigation.dispatch(StackActions.pop());
    }
  }, [listLoading]);

  const handleTypeAddressPress = type => {
    setCheck(type);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{flex: 1}}>
        <Header
          iconLeft={require('../../assets/Arrow1.png')}
          text="Thêm địa chỉ"
          onPressLeft={() => {
            navigation.goBack();
          }}
        />

        <Text style={styles.title}>Thông tin liên hệ</Text>

        <InputAddress title="Họ và Tên" onChangeText={setFullname} />
        <InputAddress
          title="Số điện thoại"
          keyboardType="number-pad"
          onChangeText={setMobile}
        />

        <Text style={styles.titleAfter}>Địa chỉ giao hàng</Text>

        <View style={{marginLeft: 25}}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('UpdateAddress2', {
                root_screen: 'AddAddress',
                data: {
                  fullname: fullname,
                  address: address,
                  mobile: mobile,
                },
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
                location ? {color: 'black'} : {color: 'grey'},
                {fontSize: 16, paddingVertical: 7},
              ]}
              numberOfLines={2}>
              {location
                ? `${location.city.name}, ${location.district.name}, ${location.ward.name}`
                : 'Tỉnh/Thành phố, Quận/Huyện, Phường/Xã'}
            </Text>
            <Image source={require('../../assets/vectorRight.png')} />
          </TouchableOpacity>
          <View style={styles.line}></View>
          <TextInput
            style={{fontSize: 15}}
            placeholderTextColor="grey"
            placeholder="Số nhà, tên đường"
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
            text="Thêm"
            style={{width: '90%', marginTop: 50}}
            onPress={onAddPress}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(AddAddress);
