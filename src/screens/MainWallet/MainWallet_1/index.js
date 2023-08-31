import React, {useEffect, useCallback, useState, useRef} from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
  Platform,
  Pressable,
  ToastAndroid,
} from 'react-native';
import styles from './style';
import Header from '../../../component/Header';
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  SlideInDown,
  SlideOutDown,
  withTiming,
} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {formatDecimal, transformFileName} from '../../../global';
import {WalletBankList} from '../../../redux/actions/walletActions';
import {useRoute} from '@react-navigation/native';
import {captureRef} from 'react-native-view-shot';
import {
  PERMISSIONS,
  RESULTS,
  checkMultiple,
  openSettings,
  requestMultiple,
} from 'react-native-permissions';
import {Dirs, FileSystem} from 'react-native-file-access';
import Share from 'react-native-share';
import RNQRGenerator from 'rn-qr-generator';

const logo = require('../../../assets/imgLoginAndRegister/Logo.png');
const download = require('../../../assets/download.png');
const close = require('../../../assets/Rectangle328.png');
const share = require('../../../assets/share.png');

const WalletScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const route = useRoute();

  const {wallet, index} = route.params;

  const user = useSelector(state => state.user);
  const session_token = useSelector(state => state.user.session_token);
  const bankList = useSelector(state => state.wallet.bankList);

  // load bank list data
  const getBankWalletListApi = () => {
    try {
      dispatch(WalletBankList.start(session_token));
    } catch (error) {}
  };

  // get bank wallet list
  useEffect(() => {
    // if banklist is not loaded then
    if (bankList.length == 0) getBankWalletListApi();
  }, []);

  // QR
  const [showMyQr, setShowMyQr] = useState(false);
  const [qrBase64, setQrBase64] = useState(null);
  const qrViewRef = useRef(null);
  const qrViewLayout = useRef({
    width: 0,
    height: 0,
  });

  // generate qr code
  const makeQR = useCallback(() => {
    RNQRGenerator.generate({
      value: JSON.stringify({
        type: 'transfer',
        value: {
          mobile: user.mobile,
          wallet_id: wallet.wallet_id,
        },
      }),
      correctionLevel: 'H',
      base64: true,
      width: 200,
      height: 200,
      backgroundColor: '#005aa93f',
      padding: {top: 10, right: 10, left: 10, bottom: 10},
    })
      .then(res => {
        // set qr code base64 to display
        setQrBase64(res.base64);
      })
      .catch(err => {});
  }, [wallet]);

  // handle show my QR
  const handleShowMyQr = () => {
    makeQR();
    setShowMyQr(true);
  };

  // handle hide my QR
  const handlehideMyQr = () => {
    setShowMyQr(false);
  };

  // handle save qr to image folder
  const handleSaveQR = async () => {
    try {
      const permisson = await checkStoragePermission();

      if (permisson) {
        // capture qr view to base64
        const imageData = await captureRef(qrViewRef, {
          format: 'png',
          result: 'base64',
          width: qrViewLayout.current.width,
          height: qrViewLayout.current.height,
        });

        // make file name
        const filename =
          '/dlc_qr_' + transformFileName(user.fullname) + new Date().getTime();

        // make path to save qr image
        const path = Dirs.DocumentDir + filename + '.jpg';

        // save qr image to internal storage
        await FileSystem.appendFile(path, imageData, 'base64');

        // move qr image to external pictures folder
        await FileSystem.cpExternal(path, filename, 'images');

        // notification
        ToastAndroid.show(
          'Hình ảnh đã được lưu vào điện thoại',
          ToastAndroid.LONG,
        );
      }
    } catch (error) {}
  };

  // check storage permission
  const checkStoragePermission = async () => {
    const storagePermission =
      Platform.OS == 'android'
        ? await checkMultiple([
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
          ])
        : undefined;

    switch (storagePermission[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE]) {
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

        const permisson = await requestMultiple([
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        ]);

        if (
          permisson[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] ===
          RESULTS.GRANTED
        ) {
          return true;
        }

        if (
          permisson[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] ===
          RESULTS.BLOCKED
        ) {
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

        return true;
      case RESULTS.BLOCKED:
        // console.log('The permission is denied and not requestable anymore');

        break;

      default: {
        return true;
      }
    }
  };

  // handle share qr
  const handleShareQr = async () => {
    try {
      // capture qr view to base64
      const imageData = await captureRef(qrViewRef, {
        format: 'png',
        result: 'base64',
        width: qrViewLayout.current.width,
        height: qrViewLayout.current.height,
      });

      // make filename
      const filename = '/dlc_qr_' + transformFileName(user.fullname) + '.png';

      // make url to share
      const url = `data:image/png;base64,${imageData}`;

      // share
      await Share.open({
        title: 'Mã QR của tôi',
        filename: filename,
        url: url,
        message: 'Mã QR của tôi',
      });
    } catch (error) {}
  };

  // Animation
  const {width: width, height: height} = Dimensions.get('window');
  const translateY = useSharedValue(0);
  const Max_TRANSLATE_Y = -height + 50;
  const Min_TRANSLATE_Y = -height + 535;
  const context = useSharedValue({y: 0});
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = {y: translateY.value};
    })
    .onUpdate(event => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, Max_TRANSLATE_Y);
      translateY.value = Math.min(translateY.value, Min_TRANSLATE_Y);
    })
    .onEnd(() => {
      if (translateY.value > -height / 2) {
        translateY.value = withSpring(Min_TRANSLATE_Y, {damping: 50});
      } else if (translateY.value < -height / 2) {
        translateY.value = withSpring(Max_TRANSLATE_Y, {damping: 50});
      }
    });

  useEffect(() => {
    translateY.value = withSpring(-height / 3, {damping: 50});
  }, []);

  const BottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <Header
        onPressLeft={() => navigation.goBack()}
        iconLeft={require('../../../assets/imgSupplier/Arrow_1.png')}
        text={wallet.wallet_name}
      />
      <View style={{flexDirection: 'row'}}>
        <View style={{justifyContent: 'center'}}>
          <Text style={styles.text}>Số dư khả dụng</Text>
          <Text style={styles.textmoney}>
            {formatDecimal.format(wallet.amount) + ' ' + wallet.wallet_code}
          </Text>
        </View>
        <Image
          style={styles.imgWallet}
          source={require('../../../assets/imgMainwallet/Vector.png')}
        />
      </View>
      <Animated.View
        style={[{alignItems: 'center', marginTop: 300}, BottomSheetStyle]}>
        <View style={styles.bottomsheet}>
          <View style={styles.line}></View>
          <View style={{padding: 20}}>
            <Text style={styles.title}>Chức năng ví</Text>
            {index == 0 && (
              <>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Recharge')}
                  style={styles.view}>
                  <View style={styles.view_2}>
                    <View style={styles.borderIcon}>
                      <Image
                        style={styles.icon}
                        source={require('../../../assets/imgMainwallet/Rectangle_429.png')}
                      />
                    </View>
                    <Text style={styles.text_2}>Nạp tiền</Text>
                  </View>
                  <Image
                    style={styles.imgArrow}
                    source={require('../../../assets/imgMainwallet/Rectangle_424.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('WithDraw')}
                  style={styles.view}>
                  <View style={styles.view_2}>
                    <View style={styles.borderIcon}>
                      <Image
                        style={styles.icon}
                        source={require('../../../assets/imgMainwallet/Rectangle_430.png')}
                      />
                    </View>
                    <Text style={styles.text_2}>Rút tiền</Text>
                  </View>
                  <Image
                    style={styles.imgArrow}
                    source={require('../../../assets/imgMainwallet/Rectangle_424.png')}
                  />
                </TouchableOpacity>
              </>
            )}

            {wallet.is_transfer && (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('TransferMoney', {
                    wallet_id: wallet.wallet_id,
                  })
                }
                style={styles.view}>
                <View style={styles.view_2}>
                  <View style={styles.borderIcon}>
                    <Image
                      style={styles.icon}
                      source={require('../../../assets/imgMainwallet/Rectangle_431.png')}
                    />
                  </View>
                  <Text style={styles.text_2}>Chuyển tiền</Text>
                </View>
                <Image
                  style={styles.imgArrow}
                  source={require('../../../assets/imgMainwallet/Rectangle_424.png')}
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('WalletHistory', {
                  wallet_id: wallet.wallet_id,
                })
              }
              style={styles.view}>
              <View style={styles.view_2}>
                <View style={styles.borderIcon}>
                  <Image
                    style={styles.icon}
                    source={require('../../../assets/imgMainwallet/Rectangle_432.png')}
                  />
                </View>
                <Text style={styles.text_2}>Lịch sử</Text>
              </View>
              <Image
                style={styles.imgArrow}
                source={require('../../../assets/imgMainwallet/Rectangle_424.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleShowMyQr} style={styles.view}>
              <View style={styles.view_2}>
                <View style={styles.borderIcon}>
                  <Image
                    style={styles.icon}
                    source={require('../../../assets/imgMainwallet/qr_icon_in_transfer.png')}
                  />
                </View>
                <Text style={styles.text_2}>Mã QR</Text>
              </View>
              <Image
                style={styles.imgArrow}
                source={require('../../../assets/imgMainwallet/Rectangle_424.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
      {showMyQr ? (
        <Animated.View
          style={[styles.showMyQrView]}
          entering={SlideInDown.duration(400)}
          exiting={SlideOutDown.duration(400)}>
          <Pressable
            style={[styles.outSideQrViewButton]}
            onPress={handlehideMyQr}
          />

          <View style={styles.qrView}>
            <TouchableOpacity
              style={styles.myQrButtonClose}
              onPress={handlehideMyQr}>
              <Image source={close} />
            </TouchableOpacity>

            <View
              ref={qrViewRef}
              style={styles.myQrCaptureView}
              onLayout={({nativeEvent}) => {
                qrViewLayout.current = {
                  width: nativeEvent.layout.width,
                  height: nativeEvent.layout.height,
                };
              }}>
              <Image source={logo} style={styles.logo} resizeMode="contain" />

              <Image
                source={{uri: `data:image/png;base64,${qrBase64}`}}
                style={styles.myQR}
                resizeMode="contain"
                resizeMethod="resize"
              />

              <Text style={styles.myQrFullname}>{user.fullname}</Text>
            </View>

            <View style={styles.myQrButtonView}>
              <TouchableOpacity
                style={styles.myQrButton}
                onPress={handleSaveQR}>
                <Image source={download} style={styles.myQrButtonImage} />
                <Text style={styles.myQrButtonTitle}>Lưu vào thư viện</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.myQrButton}
                onPress={handleShareQr}>
                <Image source={share} style={styles.myQrButtonImage} />
                <Text style={styles.myQrButtonTitle}>Chia sẻ hình ảnh</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      ) : null}
    </SafeAreaView>
  );
};

export default WalletScreen;
