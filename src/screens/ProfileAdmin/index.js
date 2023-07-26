import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  View,
} from 'react-native';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import styles from './styles';
import InfoCard from '../../component/InfoCard';
import CardProfile from '../../component/CardProfile';
import TranfersMoney from '../../component/TranfersMoney';
import NotLogin from '../NotLogin';
import {useDispatch, useSelector} from 'react-redux';
import {
  clientClearUserData,
  clientLoginEnd,
} from '../../redux/actions/userActions';
import {getData, multiRemoveData, removeData, storeData} from '../../storage';
import LoadingOverlay from '../../component/LoadingOverlay';
import {formatprice, BIOMETRIC} from '../../global';
import {LOCALSTORAGE} from '../../storage/direct';
import LoginSettingOverlay from '../../component/LoginSettingOverlay';
import {TabActions} from '@react-navigation/native';

// Data flow is: Local -> Redux -> Render on screen
const ProfileAdmin = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const login = useSelector(state => state.user.login.status);
  // state define show or hide login by biometric setting
  const [biometricOption, setBiometricOption] = useState(false);

  // login options dialog toggle
  const [loginOptions, setLoginOptions] = useState(false);
  const toggleLoginOptions = () => {
    setLoginOptions(!loginOptions);
  };

  // check device is support biometrics or not?
  const isBiometricSupport = async () => {
    // check biometric support available (has touchid, faceid or biometric)
    const {available, biometryType} = await BIOMETRIC.isSensorAvailable();
    await storeData(LOCALSTORAGE.biometric, {
      available: available,
      type: biometryType,
    });

    // if not available then remove data of biometric support before
    if (!available) {
      multiRemoveData([
        LOCALSTORAGE.biometric_login_data,
        LOCALSTORAGE.biometric_login_option,
      ]);
    }

    //
    setBiometricOption(available);
  };

  // only run when screen render initially
  useEffect(() => {
    // check biometric is available
    isBiometricSupport();
  }, []);

  return !login ? (
    <NotLogin />
  ) : (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <CardProfile
          style={{marginTop: 25, borderColor: '#005AA9'}}
          image={require('../../assets/Rectangle312.png')}
          text={user.fullname}
          id={user.user_id}
          onPress={() => navigation.navigate('Detail_User')}
        />

        <Text style={styles.title}>Quản lí ví</Text>

        <View style={[styles.wallet, {backgroundColor: '#0059A9'}]}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{width: 20, height: 20}}
              resizeMode="contain"
              source={require('../../assets/Rectangle326.png')}
            />
            <Text style={{fontSize: 16, color: '#FFFFFF', marginLeft: 10}}>
              Ví tiền
            </Text>
          </View>
          <Text style={{fontSize: 16, color: '#FFFFFF'}}>
            {formatprice(user.lWallet[0].amount)}
          </Text>
        </View>

        <View
          style={[
            styles.wallet,
            {backgroundColor: '#FCB813', zIndex: 1, marginTop: -22},
          ]}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{width: 20, height: 20}}
              resizeMode="contain"
              source={require('../../assets/Rectangle326.png')}
            />
            <Text style={{fontSize: 16, color: '#FFFFFF', marginLeft: 10}}>
              Ví điểm
            </Text>
          </View>
          <Text style={{fontSize: 16, color: '#FFFFFF'}}>
            {' '}
            {formatprice(user.lWallet[1].amount)}
          </Text>
        </View>

        <ImageBackground
          style={styles.rowTranfers}
          resizeMode="contain"
          source={require('../../assets/Rectangle303_1.png')}>
          <TranfersMoney
            image={require('../../assets/Rectangle303.png')}
            text="Quét mã"
          />
          <TranfersMoney
            image={require('../../assets/Rectangle304.png')}
            text="Nạp ví"
            onPress={() => navigation.navigate('Recharge')}
          />
          <TranfersMoney
            image={require('../../assets/Rectangle305.png')}
            text="Chuyển tiền"
            onPress={() => navigation.navigate('TransferMoney')}
          />
          <TranfersMoney
            image={require('../../assets/Rectangle306.png')}
            text="Rút tiền"
            onPress={() => navigation.navigate('WithDraw')}
          />
        </ImageBackground>

        <Text style={styles.title}>Bảng điều khiển</Text>

        <InfoCard
          image={require('../../assets/Rectangle294.png')}
          text="Chia sẻ app"
          onPress={() => navigation.navigate('SearchRecent')}
        />
        <InfoCard
          image={require('../../assets/Rectangle295.png')}
          text="Thiết lập bảo mật"
          onPress={() => navigation.navigate('CustomerManagement')}
        />
        <InfoCard
          image={require('../../assets/Rectangle300.png')}
          text="Tài khoản ngân hàng"
        />
        <InfoCard
          image={require('../../assets/Rectangle295.png')}
          text="Quản lý địa chỉ"
        />
        <InfoCard
          image={require('../../assets/Rectangle298.png')}
          text="Danh sách đội nhóm"
          onPress={() => navigation.navigate('TeamThree')}
        />
        <InfoCard
          image={require('../../assets/Rectangle299.png')}
          text="Báo cáo doanh số"
          onPress={() => navigation.navigate('TeamThree')}
        />
        <InfoCard
          image={require('../../assets/Rectangle299.png')}
          text="Báo cáo hoa hồng"
          onPress={() => navigation.navigate('TeamThree')}
        />
        {biometricOption ? (
          <InfoCard
            image={require('../../assets/Rectangle270.png')}
            text="Thiết lập đăng nhập"
            onPress={toggleLoginOptions}
          />
        ) : null}
        <LoginSettingOverlay
          visible={loginOptions}
          onBackdropPress={toggleLoginOptions}
          onConfirm={toggleLoginOptions}
          onCancel={toggleLoginOptions}
        />
        <InfoCard
          image={require('../../assets/Rectangle270.png')}
          text="Đăng xuất"
          onPress={() => {
            //clear data (both local and redux store)
            dispatch(clientClearUserData);
            removeData(LOCALSTORAGE.user);
            navigation.dispatch(TabActions.jumpTo('Home'));
          }}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

export default React.memo(ProfileAdmin);
