import React, {useCallback, useEffect, useState} from 'react';
import styles from './styles';
import {
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Pressable,
} from 'react-native';
import Header from '../../component/Header';
import CardContact from '../../component/CardContact';
import CardAddress from '../../component/CardAddress';
import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addressBookListAllStart,
  addressBookSetDefaultStart,
} from '../../redux/actions/addressBookActions';
import LoadingOverlay from '../../component/LoadingOverlay';
import {clientGetDetailUserStart} from '../../redux/actions/userActions';
import {
  NotificationActions,
  useNotificationDispatch,
} from '../../component/NotificationContext/context';
import {NotificationType} from '../../component/NotificationContext/types';

const CustomerInformation = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  // get go_back params (if navigate from CreateOrder screen)
  const go_back = route.params?.goback || undefined;
  const {
    products,
    totalPoint,
    totalPrices,
    totalDecrementPrices,
    totalDecrementPoint,
    type,
  } = route.params || {};

  const session_token = useSelector(state => state.user.session_token);
  const addressBook = useSelector(state => state.addressBook.data);
  const listLoading = useSelector(state => state.addressBook.listLoading);

  // initial dispatch to get list address
  useEffect(() => {
    if (addressBook.length == 0) {
      dispatch(addressBookListAllStart(session_token));
    }
  }, []);

  // render item
  const RenderItem = useCallback(({item}) => {
    return (
      <Pressable
        onPress={() => {
          if (go_back) {
            navigation.navigate('CreateOrder', {
              choose_address: item,
              products,
              totalPoint,
              totalPrices,
              totalDecrementPrices,
              totalDecrementPoint,
              type,
            });
          }
        }}>
        <CardContact
          name={item.fullname}
          phone={item.mobile}
          onPress={() => navigation.navigate('UpdateAddress1', {data: item})}
        />
        <CardAddress
          numberAddress={item.address}
          address={`${item.ward}, ${item.district}, ${item.city}`}
          // onPress={() => navigation.navigate('UpdateAddress2')}
          isDefault={item.is_default == 1}
        />
      </Pressable>
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {listLoading ? <LoadingOverlay /> : null}
      <Header
        iconLeft={require('../../assets/Arrow1.png')}
        text="Thông tin khách hàng"
        onPressLeft={() => {
          navigation.goBack();
        }}
        containerStyle={{padding: 16}}
      />

      <FlatList
        data={addressBook}
        showsVerticalScrollIndicator={false}
        renderItem={RenderItem}
        contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 16}}
        initialNumToRender={3}
        ListFooterComponent={
          <TouchableOpacity
            onPress={() => navigation.navigate('AddAddress')}
            style={styles.addAdress}
            hitSlop={5}>
            <Image
              source={require('../../assets/Rectangle268.png')}
              style={{width: 25, height: 25}}
              resizeMode="contain"
            />
            <Text style={styles.textBlue}>Thêm địa chỉ mới</Text>
          </TouchableOpacity>
        }
      />
    </SafeAreaView>
  );
};

export default React.memo(CustomerInformation);
