import React, {useCallback, useEffect} from 'react';
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
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {addressBookListAllStart} from '../../redux/actions/addressBookActions';
import {locationListCityStart} from '../../redux/actions/locationActions';
import LoadingOverlay from '../../component/LoadingOverlay';

const CustomerInformation = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const session_token = useSelector(state => state.user.session_token);
  const addressBook = useSelector(state => state.addressBook.data);
  const listLoading = useSelector(state => state.addressBook.listLoading);

  // initial dispatch to get list address
  useEffect(() => {
    if (addressBook.length == 0) {
      dispatch(addressBookListAllStart(session_token));
    }
  }, []);

  const RenderItem = useCallback(
    ({item}) => {
      return (
        <Pressable>
          <CardContact
            name={item.fullname}
            phone={item.mobile}
            onPress={() => navigation.navigate('UpdateAddress1', {data: item})}
          />
          <CardAddress
            numberAddress={item.address}
            address={`${item.ward}, ${item.district}, ${item.city}`}
            onPress={() => navigation.navigate('UpdateAddress2')}
            isDefault={item.is_default == 1}
          />
        </Pressable>
      );
    },
    [addressBook],
  );

  return listLoading ? (
    <LoadingOverlay />
  ) : (
    <SafeAreaView style={styles.container}>
      <Header
        iconLeft={require('../../assets/Arrow1.png')}
        text="Thông tin khách hàng"
        onPressLeft={() => {
          navigation.goBack();
        }}
      />

      <FlatList
        data={addressBook}
        showsVerticalScrollIndicator={false}
        renderItem={RenderItem}
        initialNumToRender={3}
        ListFooterComponent={
          <TouchableOpacity
            onPress={() => navigation.navigate('AddAddress')}
            style={styles.addAdress}>
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
