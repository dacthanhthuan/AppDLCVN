import {useState, useEffect} from 'react';
import {View, Text, ToastAndroid} from 'react-native';
import Header from '../../component/Header';
import styles from './styles';
import CheckBoxGroup from '../../component/UpdateAddress2/CustomCheckBoxGroup';
import {fetchData, button} from './data';
import {useDispatch, useSelector} from 'react-redux';
import {locationListCityStart} from '../../redux/actions/locationActions';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  AddressCheckBoxProvider,
  useAddressCheckBox,
} from '../../component/UpdateAddress2/AddressCheckBox/context';
import CustomAddressList from '../../component/UpdateAddress2/CustomAddressList';
import Button from '../../component/Button';

const left = require('../../assets/UpdateAddress/Arrow1.png');

const UpdateAddress2Main = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const {root_screen, data} = route.params;

  const [title, setTitle] = useState('Tỉnh/Thành phố');
  const addressCheckbox = useAddressCheckBox();

  const session_token = useSelector(state => state.user.session_token);
  const location = useSelector(state => state.location);

  useEffect(() => {
    if (location.city.length == 0) {
      dispatch(locationListCityStart(session_token));
    }
  }, []);

  const onConfirmChange = () => {
    if (
      (addressCheckbox.city.id &&
        addressCheckbox.district.id &&
        addressCheckbox.ward.id) ||
      addressCheckbox.district.id == '769'
    ) {
      navigation.navigate(root_screen, {
        address: {
          city: addressCheckbox.city,
          district: addressCheckbox.district,
          ward: addressCheckbox.ward,
        },
        data: data,
      });
    } else {
      ToastAndroid.show('Vui lòng chọn địa chỉ', ToastAndroid.LONG);
    }
  };

  useEffect(() => {
    switch (addressCheckbox.buttonSelect) {
      case 'city':
        setTitle('Tỉnh/Thành phố');
        break;
      case 'district':
        setTitle('Quận/Huyện');
        break;
      case 'ward':
        setTitle('Phường/Xã');
        break;
    }
  }, [addressCheckbox.buttonSelect]);

  return (
    <View style={styles.container}>
      <Header
        containerStyle={styles.header}
        text={'Sửa địa chỉ'}
        iconLeft={left}
        onPressLeft={() => navigation.goBack()}
      />

      <Text style={styles.title}>Chọn khu vực</Text>
      <CheckBoxGroup />
      <Text style={styles.title}>{title}</Text>
      <CustomAddressList />
      <Button text={'Xác nhận'} onPress={onConfirmChange} />
    </View>
  );
};

function UpdateAddress2() {
  return (
    <AddressCheckBoxProvider>
      <UpdateAddress2Main />
    </AddressCheckBoxProvider>
  );
}

export default UpdateAddress2;
