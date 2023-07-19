import React, {useEffect, useState} from 'react';
import {SafeAreaView, Image, View, Text, TouchableOpacity} from 'react-native';
import {StackActions, useNavigation} from '@react-navigation/native';
import Style_Login from './style';
import Text_Input from '../../component/TextInput';
import Button from '../../component/Button';
import Header from '../../component/Header';
import {useDispatch, useSelector} from 'react-redux';
import {
  clientLoginStart,
  clientClearUserData,
} from '../../redux/actions/userActions';
import LoadingOverlay from '../../component/LoadingOverlay';

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  //Declare state
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const login = useSelector(state => state.user?.login.status);
  const message = useSelector(state => state.user?.login.message);
  const loading = useSelector(state => state.user?.loading);

  //Clear latest data when come-in this screen
  useEffect(() => {
    dispatch(clientClearUserData);
  }, []);

  //If login success then pop this creen to back profile screen
  useEffect(() => {
    if (login) {
      navigation.dispatch(StackActions.pop());
    }
  }, [login]);

  return (
    <SafeAreaView style={Style_Login.container}>
      <LoadingOverlay visible={loading} />
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
        <View style={{marginBottom: 30}}>
          <Text_Input
            placeholder="Số điện thoại"
            onChangetext={text => setMobile(text)}
          />
          <Text_Input
            placeholder="Mật khẩu"
            onChangetext={text => setPassword(text)}
          />
          {!login ? <Text style={Style_Login.textError}>{message}</Text> : null}
        </View>
        <Button
          onPress={() => {
            dispatch(clientLoginStart(mobile, password));
          }}
          text={'Đăng nhập'}
        />
        <View style={Style_Login.container_3}>
          <TouchableOpacity>
            <Text style={Style_Login.textForgotpass}>Quên mật khẩu?</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={Style_Login.container_4}>
        <Text style={Style_Login.textNotuser}>Bạn chưa có tài khoản?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={Style_Login.textRegister}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default Login;
