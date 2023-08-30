import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Image,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Style_Login from './style';
import { useNavigation } from '@react-navigation/native';
import Text_Input from '../../component/TextInput';
import Button from '../../component/Button';
import Header from '../../component/Header';
import store from '../../redux/store';
import { clearproductHome, fetchUsers } from '../../redux/actions';
import { useSelector } from 'react-redux';
import * as Keychain from 'react-native-keychain';
import { localData, localUsername, localIsLoggedIn, SAVE_DATA, SAVE_USERNAME, getItem } from '../../../src/Local/AsyncStorage';

const Login = () => {

  const navigation = useNavigation();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginAttempted, setIsLoginAttempted] = useState(false);


  // Phần hiển thị check vân tay
  const options = {
    authenticationPrompt: {
      title: 'Xác nhận vân tay cho DLCONE',
      cancel: 'Hủy',
    },
    accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
    service: 'MAP'
  }

  useEffect(() => {
    // Log keywork input Username and Password
    console.log('keyworkUserName :>> ', username);
    console.log('keyworkPassword :>> ', password);
  }, [username, password])

  // Lấy data và error từ redux
  const { data, isLoggedIn, error } = useSelector((state) => state.postReducers);

  useEffect(() => {
    // Khi true
    if (isLoginAttempted) {
      // console.log(data?.message);
      if (data?.message === 'success') {
        handleLoginSuccess();
      } else {
        handleLoginFailed();
      }
    }
  }, [data, error]);

  // Khi nhấn vào nút đăng nhập
  const handleLogin = () => {
    if (username && password) {
      // Gửi username và password tới action fetchUsers.
      store.dispatch(fetchUsers(username, password));
      setIsLoginAttempted(true)
    } else {
      Alert.alert('Thông báo', 'Các trường không được để trống');
    }
  }

  const defaultLogin = async () => {
    await localUsername(username)
    await localData(data)
    await localIsLoggedIn(isLoggedIn)
    store.dispatch(clearproductHome())
    navigation.navigate('MainTab')
    console.log('Login Success!');
  }

  // Đăng nhập thành công
  const handleLoginSuccess = async () => {
    try {

      const usernameAsyncStorage = await getItem(SAVE_USERNAME)
      console.log('usernameAsyncStorage', usernameAsyncStorage);
      if (usernameAsyncStorage && username) {
        // Khi đăng nhập thành công bằng tài khoản khác
        if (usernameAsyncStorage !== username) {
          // Xóa dữ liệu trong khi Keychain
          await Keychain.resetGenericPassword(options)
          await localUsername(username);
        } else {
          // Lưu data vào AsyncStorage'
          defaultLogin()
        }
      }
      // Lưu data vào AsyncStorage'
      defaultLogin()
    } catch (error) {
      console.log('Error saving data to AsyncStorage:', error);
    }
  }

  // Đăng nhập thất bại
  const handleLoginFailed = () => {
    Alert.alert('Login Failed!', error);
  }

  // Đăng nhập bằng vân tay 
  const TouchID = async () => {
    try {
      const credentials = await Keychain.getGenericPassword(options);
      console.log('credentials', credentials);
      if (credentials) {
        // Xác thực thành công, tiến hành đăng nhập hoặc chuyển tới màn hình sau khi đăng nhập thành công
        store.dispatch(fetchUsers(credentials?.username, credentials?.password));
        setIsLoginAttempted(true)
        console.log('Đăng nhập bằng vân tay thành công');
      } else {
        // Không có thông tin đăng nhập đã lưu, xử lý logic tương ứng
        Alert.alert('Thông báo', 'Tài khoản của bạn chưa được kích hoạt vân tay hoặc FaceId. Vui lòng đăng nhập và kích hoạt để sử dụng');
      }
    } catch (error) {
      console.log('Lỗi khi xác thực vân tay:', error);
    }
  }

  // Kiểm tra thông tin user có còn ko sau khi đăng xuất
  const getData = async () => {
    try {
      const getData = await getItem(SAVE_DATA)
      console.log('getData :>> ', getData);
    } catch (error) {
      console.log(error);
    }
  }

  // Xóa dữ liệu vân tay
  const deletePassword = async () => {
    try {
      await Keychain.resetGenericPassword(options)
      console.log('Đã xóa thông tin trong Keychain');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView style={Style_Login.container}>
      <Header
        onPressLeft={() => navigation.goBack()}
        iconLeft={require('../../assets/imgSupplier/Arrow_1.png')}
      />
      <Image
        style={Style_Login.imgLogo}
        source={require('../../assets/imgLoginAndRegister/Logo.png')}
      />
      <View style={Style_Login.container_1}>
        <Text style={Style_Login.textLogin}>Đăng nhập tài khoản</Text>
        <View style={{ marginBottom: 30 }}>
          <Text_Input
            value={username}
            placeholder="Số điện thoại"
            onChangeText={(text) => { setUserName(text) }} />
          <Text_Input
            password={true}
            value={password}
            placeholder="Mật khẩu"
            onChangeText={(text) => { setPassword(text) }} />
        </View>

        <View style={{
          flexDirection: 'row', alignItems: 'center'
        }}>
          <Button
            style={{ flex: 1, marginRight: 10 }}
            onPress={() => { handleLogin() }}
            text={'Đăng nhập'}
          />
          <TouchableOpacity onPress={() => { TouchID() }}>
            <Image style={Style_Login.icon} resizeMode='contain' source={require('../../assets/Home/fingerprint.png')} />
          </TouchableOpacity>
        </View>

        <View style={Style_Login.container_3}>
          <TouchableOpacity onPress={() => { getData() }}>
            <Text style={Style_Login.textForgotpass}>Quên mật khẩu?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { deletePassword() }}>
            <Text style={Style_Login.textForgotpass}>Xóa vân tay</Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center' }}>
          <View style={Style_Login.container_4}>
            <Text style={Style_Login.textNotuser}>Bạn chưa có tài khoản ? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={Style_Login.textRegister}>Đăng ký</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView >
  );
};
export default Login;
