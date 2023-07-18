import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Style_Register from './style';
import {StackActions, useNavigation} from '@react-navigation/native';
import Text_Input from '../../component/TextInput';
import Button from '../../component/Button';
import Header from '../../component/Header';
import {useDispatch, useSelector} from 'react-redux';
import {clientRegisterStart} from '../../redux/actions/clientRegister';

const Register = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [referral, setReferral] = useState('0933791016');
  const login = useSelector(state => state.UserReducer.user.login);

  useEffect(() => {
    if (login) navigation.dispatch(StackActions.pop(2));
  }, [login]);

  return (
    <SafeAreaView style={Style_Register.container}>
      <Header
        onPressLeft={() => navigation.goBack()}
        iconLeft={require('../../assets/imgSupplier/Arrow_1.png')}
      />
      <Image
        style={Style_Register.imgLogo}
        source={require('../../assets/imgLoginAndRegister/Logo.png')}
      />
      <View style={Style_Register.container_1}>
        <Text style={Style_Register.textRegister}>Tạo tài khoản mới</Text>
        <View style={{marginBottom: 30}}>
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
            value={'0933791016'}
          />
        </View>
        <Button
          onPress={() =>
            dispatch(
              clientRegisterStart(fullname, email, mobile, password, referral),
            )
          }
          text={'Đăng kí'}
        />
        <View style={{alignItems: 'center'}}>
          <View style={Style_Register.container_4}>
            <Text style={Style_Register.textNotuser}>Bạn đã có tài khoản?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={Style_Register.textLogin}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Register;
