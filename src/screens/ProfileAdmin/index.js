import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  View,
  Pressable,
  RefreshControl,
  Platform,
  ToastAndroid,
} from 'react-native';
import styles from './styles';
import InfoCard from '../../component/InfoCard';
import CardProfile from '../../component/CardProfile';
import TranfersMoney from '../../component/TranfersMoney';
import NotLogin from '../NotLogin';
import {useDispatch, useSelector} from 'react-redux';
import {
  clientClearUserData,
  clientGetDetailUserStart,
} from '../../redux/actions/userActions';
import {multiRemoveData, removeData, storeData} from '../../storage';
import LoadingOverlay from '../../component/LoadingOverlay';
import {formatPrice, BIOMETRIC, formatPoint, useIsReady} from '../../global';
import {LOCALSTORAGE} from '../../storage/direct';
import LoginSettingOverlay from '../../component/LoginSettingOverlay';
import {TabActions} from '@react-navigation/native';
import {removeAllCartProduct} from '../../redux/actions/cartActions';
import {addressBookClear} from '../../redux/actions/addressBookActions';
import {clearListOrder} from '../../redux/actions/orderActions';
import {
  NotificationActions,
  useNotificationDispatch,
} from '../../component/NotificationContext/context';
import {NotificationType} from '../../component/NotificationContext/types';
import {WalletReferralList} from '../../redux/actions/walletActions';
import {
  request,
  PERMISSIONS,
  check,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import {ReferralInfo} from '../../redux/actions/referralInfoActions';

// Data flow is: Local -> Redux -> Render on screen
const ProfileAdmin = ({navigation}) => {
  const isReady = useIsReady();

  const dispatch = useDispatch();
  const notification = useNotificationDispatch();

  const app = useSelector(state => state.app.data);
  const user = useSelector(state => state.user);
  const login = useSelector(state => state.user.login.status);
  const userLoading = useSelector(state => state.user.loading);

  // state define show or hide login by biometric setting
  const [biometricOption, setBiometricOption] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

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
    // reload user data if user login
    if (login) dispatch(clientGetDetailUserStart(user.session_token));
  }, []);

  // handle refreshing detail user data
  const handleRefreshing = () => {
    setRefreshing(true);

    // reload user detail data
    dispatch(clientGetDetailUserStart(user.session_token));
  };

  // when user data loading done
  useEffect(() => {
    if (!userLoading) {
      setRefreshing(false);
    }
  }, [userLoading]);

  // check permission before navigation to scan qr screen
  const handleBeforeNavScanQr = async () => {
    const cameraPermission =
      Platform.OS == 'android'
        ? await check(PERMISSIONS.ANDROID.CAMERA)
        : await check(PERMISSIONS.IOS.CAMERA);

    switch (cameraPermission) {
      case RESULTS.UNAVAILABLE:
        // console.log(
        //   'This feature is not available (on this device / in this context)',
        // );

        ToastAndroid.show(
          'Chức năng hiện không khả dụng trên thiết vị này',
          ToastAndroid.LONG,
        );

        break;
      case RESULTS.DENIED:
        // console.log(
        //   'The permission has not been requested / is denied but requestable',
        // );

        const permisson =
          Platform.OS == 'android'
            ? await request(PERMISSIONS.ANDROID.CAMERA)
            : await request(PERMISSIONS.IOS.CAMERA);

        if (permisson === RESULTS.GRANTED) {
          navigation.navigate('ScanQr');
        }

        if (permisson === RESULTS.BLOCKED) {
          ToastAndroid.show(
            'Quyền truy cập đã bị chặn, vui lòng mở lại trong cài đặt ứng dụng',
            ToastAndroid.LONG,
          );

          openSettings();
        }

        break;
      case RESULTS.LIMITED:
        // console.log('The permission is limited: some actions are possible');

        break;
      case RESULTS.GRANTED:
        // console.log('The permission is granted');

        navigation.navigate('ScanQr');

        break;
      case RESULTS.BLOCKED:
        // console.log('The permission is denied and not requestable anymore');

        break;
    }
  };

  // event handler: handle logout
  const handleLogout = () => {
    // display notification
    notification(
      NotificationActions.rise({
        data: {
          message: 'Bạn đã đăng xuất',
        },
        duration: 2500,
        type: NotificationType.NORMAL,
      }),
    );

    // clear user and cart data
    dispatch(clientClearUserData);
    dispatch(removeAllCartProduct);
    // clear address book data and order list
    dispatch(addressBookClear);
    dispatch(clearListOrder());
    dispatch(WalletReferralList.clear());
    dispatch(ReferralInfo.clear());

    // clear local
    removeData(LOCALSTORAGE.user);
    removeData(LOCALSTORAGE.cart);
    removeData(LOCALSTORAGE.order_list);
  };

  return !isReady ? (
    <LoadingOverlay />
  ) : !login ? (
    <NotLogin />
  ) : (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          colors={['white']}
          progressBackgroundColor={'#005AA9'}
          onRefresh={handleRefreshing}
        />
      }>
      <SafeAreaView style={styles.container}>
        <CardProfile
          style={{marginTop: 25, borderColor: '#005AA9'}}
          image={require('../../assets/Rectangle312.png')}
          text={user.fullname}
          id={user.user_id}
          onPress={() => navigation.navigate('Detail_User')}
        />
        <Text style={styles.title}>Quản lí ví</Text>
        <Pressable
          style={({pressed}) => [
            styles.wallet,
            {backgroundColor: '#0059A9'},
            pressed ? {backgroundColor: '#006dcc'} : null,
          ]}
          onPress={() => {
            navigation.navigate('WalletScreen', {
              wallet: user.lWallet[0],
              index: 0,
            });
          }}>
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
            {formatPrice(user.lWallet[0].amount)}
          </Text>
        </Pressable>
        <Pressable
          style={({pressed}) => [
            styles.wallet,
            {backgroundColor: '#FCB813', zIndex: 1, marginTop: -22},
            pressed ? {backgroundColor: '#c98e03'} : null,
          ]}
          onPress={() => {
            navigation.navigate('WalletScreen', {
              wallet: user.lWallet[1],
              index: 1,
            });
          }}>
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
            {formatPoint(user.lWallet[1].amount)}
          </Text>
        </Pressable>
        <ImageBackground
          style={styles.rowTranfers}
          resizeMode="contain"
          source={require('../../assets/Rectangle303_1.png')}>
          <TranfersMoney
            image={require('../../assets/Rectangle303.png')}
            text="Quét mã"
            onPress={handleBeforeNavScanQr}
          />
          <TranfersMoney
            image={require('../../assets/Rectangle304.png')}
            text="Nạp ví"
            onPress={() => navigation.navigate('Recharge')}
          />
          <TranfersMoney
            image={require('../../assets/Rectangle305.png')}
            text="Chuyển tiền"
            onPress={() =>
              navigation.navigate('TransferMoney', {
                wallet_id: user.lWallet[0].wallet_id,
              })
            }
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
          onPress={() => {
            navigation.navigate('ShareApp');
          }}
        />
        <InfoCard
          image={require('../../assets/Rectangle295.png')}
          text="Thiết lập bảo mật"
          onPress={() => {}}
        />
        <InfoCard
          image={require('../../assets/Rectangle300.png')}
          text="Tài khoản ngân hàng"
          onPress={() => navigation.navigate('BankAccount')}
        />
        <InfoCard
          image={require('../../assets/Rectangle295.png')}
          text="Quản lý địa chỉ"
          onPress={() => navigation.navigate('CustomerInformation')}
        />
        <InfoCard
          image={require('../../assets/Rectangle298.png')}
          text="Danh sách đội nhóm"
          onPress={() => navigation.navigate('ReferralTeam', {data: {}})}
        />
        <InfoCard
          image={require('../../assets/Rectangle299.png')}
          text="Báo cáo"
          onPress={() => navigation.navigate('TeamThree')}
        />
        {app?.member_title_id_ceo.includes(user.member_title_id) && (
          <InfoCard
            image={require('../../assets/Rectangle299.png')}
            text="Báo cáo CEO"
            onPress={() => navigation.navigate('ReportCEO')}
          />
        )}
        {biometricOption ? (
          <InfoCard
            image={require('../../assets/padlock.png')}
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
          image={require('../../assets/changeaccount.png')}
          text="Đổi tài khoản"
          onPress={() => {
            handleLogout();
            navigation.navigate('Login');
          }}
        />
        <InfoCard
          image={require('../../assets/log-out.png')}
          text="Đăng xuất"
          onPress={() => {
            handleLogout();
            navigation.dispatch(TabActions.jumpTo('Home'));
          }}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

export default React.memo(ProfileAdmin);
