import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Style_Login from './style';
import {StackActions, useNavigation} from '@react-navigation/native';
import Text_Input from '../../component/TextInput';
import Button from '../../component/Button';
import Header from '../../component/Header';
import {useDispatch, useSelector} from 'react-redux';
import {clientLoginStart} from '../../redux/actions/clientLogin';
import axios from 'axios';

const Login = () => {
  const dispatch = useDispatch();
  const login = useSelector(state => state.UserReducer.user.login);
  const navigation = useNavigation();
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (login) {
      navigation.dispatch(StackActions.pop());
    }
  }, [login]);

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
        <View style={{marginBottom: 30}}>
          <Text_Input
            placeholder="Số điện thoại"
            onChangetext={text => setMobile(text)}
          />
          <Text_Input
            placeholder="Mật khẩu"
            onChangetext={text => setPassword(text)}
          />
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
        <View style={{alignItems: 'center'}}>
          <View style={Style_Login.container_4}>
            <Text style={Style_Login.textNotuser}>Bạn chưa có tài khoản?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={Style_Login.textRegister}>Đăng ký</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Login;
