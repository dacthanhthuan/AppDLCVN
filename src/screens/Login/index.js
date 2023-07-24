import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
  SafeAreaView,
  Image,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
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
import {BIOMETRIC, mobileCheck, passwordCheck} from '../../global';
import {getData, multiRemoveData} from '../../storage';
import {LOCALSTORAGE} from '../../storage/direct';

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  //Declare state
  const [mobile, setMobile] = useState('0123456789');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');
  const [initialRendered, setInitialRendered] = useState(true); //Initial rendered state
  const [biometricLogin, setBiometricLogin] = useState(false); // biometric login option
  const login = useSelector(state => state.user?.login.status);
  const message = useSelector(state => state.user?.login.message);
  const loading = useSelector(state => state.user?.loading);

  // check biometric login option
  useEffect(() => {
    try {
      getData(LOCALSTORAGE.biometric_login_option)
        .then(res => {
          if (res === 'true') {
            setBiometricLogin(true);
          }
        })
        .catch(err => {});
    } catch (error) {
      throw new Error(error);
    }
  }, []);

  // whenever button Login by biometric is pressed
  async function onBiometricLoginPress() {
    try {
      const {success} = await BIOMETRIC.simplePrompt({
        promptMessage: 'Đăng nhập bằng vân tay',
        cancelButtonText: 'Huỷ',
      });

      if (success) {
        // get data from local and login
        const {mobile, password} = await getData(
          LOCALSTORAGE.biometric_login_data,
        );
        dispatch(clientLoginStart(mobile, password));
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  //Clear latest data when come-in this screen
  useLayoutEffect(() => {
    dispatch(clientClearUserData);
    setInitialRendered(false);
  }, []);

  //If login success then pop this creen to back profile screen
  useEffect(() => {
    if (!loading && !initialRendered) {
      if (login) {
        checkAccount();
        navigation.dispatch(StackActions.pop());
      }
      if (message) setError(message);
    }
  }, [login, message, loading]);

  // check if login by another account
  const checkAccount = async () => {
    try {
      if (biometricLogin) {
        const biometricData = await getData(LOCALSTORAGE.biometric_login_data);

        // if user login by another account
        if (biometricData.mobile !== mobile) {
          // remove biometric login data and options
          await multiRemoveData([
            LOCALSTORAGE.biometric_login_data,
            LOCALSTORAGE.biometric_login_option,
          ]);
        }
      }
    } catch (error) {}
  };

  // handler sign in button
  function handlerSingin() {
    const phoneError = mobileCheck(mobile);
    const passwordError = passwordCheck(password);
    if (phoneError != null) {
      setError(phoneError);
    } else if (passwordError != null) {
      setError(passwordError);
    } else {
      if (!message) setError(null);
      dispatch(clientLoginStart(mobile, password));
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={Style_Login.container}>
        {loading ? <LoadingOverlay visible={loading} /> : null}
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
              secure
            />
            {error ? <Text style={Style_Login.textError}>{error}</Text> : null}
          </View>
          <Button onPress={handlerSingin} text={'Đăng nhập'} />
          <View style={Style_Login.container_3}>
            <TouchableOpacity hitSlop={10} onPress={onBiometricLoginPress}>
              {biometricLogin ? (
                <Text style={Style_Login.textBiometricLogin}>
                  Đăng nhập bằng vân tay
                </Text>
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity hitSlop={10}>
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
    </TouchableWithoutFeedback>
  );
};
export default Login;
