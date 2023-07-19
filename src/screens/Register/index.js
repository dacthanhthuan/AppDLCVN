import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {StackActions, useNavigation} from '@react-navigation/native';
import Style_Register from './style';
import Text_Input from '../../component/TextInput';
import Button from '../../component/Button';
import Header from '../../component/Header';
import LoadingOverlay from '../../component/LoadingOverlay';
import {
  clientClearUserData,
  clientRegisterStart,
} from '../../redux/actions/userActions';

const Register = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  //Declare state
  const [initialRendered, setInitialRendered] = useState(true); //Initial rendered state
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [referral, setReferral] = useState('0933791016');
  const [error, setError] = useState('');
  const register = useSelector(state => state.user.register.status);
  const message = useSelector(state => state.user.register.message);
  const loading = useSelector(state => state.user.loading);

  //Clear latest data when come-in this screen
  useLayoutEffect(() => {
    dispatch(clientClearUserData);
    setInitialRendered(false);
  }, []);

  //Check register state and error form server
  useEffect(() => {
    //If not loading data from server and not initial rendered
    if (!loading && !initialRendered) {
      if (register) navigation.dispatch(StackActions.pop(2)); //pop 2 screen to back profile screen
      if (message) setError(message);
    }
  }, [register, message, loading]);

  //Handle InputText field
  const handlerSingin = () => {
    if (fullname.length <= 0) setError('Vui lòng nhập họ và tên');
    else if (email.length <= 0) setError('Vui lòng nhập địa chỉ email');
    else if (mobile.length <= 0) setError('Vui lòng nhập số điện thoại');
    else if (password.length <= 0) setError('Vui lòng nhập mật khẩu');
    else if (password !== confirm)
      setError('Mật khẩu nhập lại không chính xác');
    else {
      if (!message) setError(null);
      dispatch(
        clientRegisterStart(fullname, email, mobile, password, referral),
      );
    }
  };

  return (
    <SafeAreaView style={Style_Register.container}>
      <LoadingOverlay visible={loading} />
      <Header
        onPressLeft={() => navigation.goBack()}
        iconLeft={require('../../assets/imgSupplier/Arrow_1.png')}
      />
      <Image
        style={Style_Register.imgLogo}
        source={require('../../assets/imgLoginAndRegister/Logo.png')}
      />
      <KeyboardAvoidingView
        style={Style_Register.container_1}
        behavior="height"
        keyboardVerticalOffset={50}>
        <ScrollView>
          <Text style={Style_Register.textRegister}>Tạo tài khoản mới</Text>
          <View>
            <Text_Input placeholder="Họ và tên" onChangetext={setFullname} />
            <Text_Input placeholder="Email" onChangetext={setEmail} />
            <Text_Input placeholder="Số điện thoại" onChangetext={setMobile} />
            <Text_Input placeholder="Mật khẩu" onChangetext={setPassword} />
            <Text_Input
              placeholder="Nhập lại mật khẩu"
              onChangetext={setConfirm}
            />
            <Text_Input
              placeholder="Mã giới thiệu"
              onChangetext={setReferral}
              value={referral}
            />
            {error ? (
              <Text style={Style_Register.textError}>{error}</Text>
            ) : null}
          </View>
          <Button
            onPress={() => {
              handlerSingin();
            }}
            text={'Đăng kí'}
          />
          <View style={{alignItems: 'center'}}>
            <View style={Style_Register.container_4}>
              <Text style={Style_Register.textNotuser}>
                Bạn đã có tài khoản?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={Style_Register.textLogin}>Đăng nhập</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;
