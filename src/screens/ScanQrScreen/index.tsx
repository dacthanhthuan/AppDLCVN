import {
  Alert,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {launchImageLibrary} from 'react-native-image-picker';
import RNQRGenerator from 'rn-qr-generator';
import styles from './styles';
import Header from '../../component/Header';
import {useNavigation} from '@react-navigation/native';
import BarcodeMask from 'react-native-barcode-mask';
import {useCallback, useRef, useState} from 'react';
import {WINDOW_WIDTH, WINDOW_HEIGHT, transformFileName} from '../../global';
import Animated, {SlideInDown, SlideOutDown} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
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

const qr = require('../../assets/qrcode.png');
const photos = require('../../assets/gallery.png');
const logo = require('../../assets/imgLoginAndRegister/Logo.png');
const download = require('../../assets/download.png');
const close = require('../../assets/Rectangle328.png');
const share = require('../../assets/share.png');

export default function ScanQrScreen() {
  const navigation = useNavigation();

  const user = useSelector((state: any) => state.user);

  const cameraRef = useRef<RNCamera | any>(null);
  const onReadQrTimer = useRef<number | any>(null);
  const [scanArea, setScanAera] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [showMyQr, setShowMyQr] = useState(false);
  const qrViewRef = useRef<View | any>(null);
  const qrViewLayout = useRef({
    width: 0,
    height: 0,
  });
  const [qrBase64, setQrBase64] = useState<string | any>(null);

  // generate qr code
  const makeQR = useCallback(() => {
    RNQRGenerator.generate({
      value: user.mobile,
      correctionLevel: 'H',
      base64: true,
      width: 200,
      height: 200,
      backgroundColor: '#005aa93f',
      padding: {top: 10, right: 10, left: 10, bottom: 10},
    })
      .then(res => {
        const {base64} = res;

        setQrBase64(base64);
      })
      .catch(err => {});
  }, []);

  // handle read qr
  const handleOnReadQr = (data: any) => {
    clearTimeout(onReadQrTimer.current);
    cameraRef.current.pausePreview();

    onReadQrTimer.current = setTimeout(() => {
      Alert.alert('Read QR', 'QR content: ' + data.data);
    }, 300);
  };

  const handleScanAera = (e: any) => {
    // giới hạn khu vực quét qr (theo hướng màn hình nằm ngang, nút home ở bên phải)
    // x sẽ thành y và ngược lại, width sẽ thành height và ngược lại
    const x = (e.nativeEvent.layout.y + 65) / WINDOW_HEIGHT;
    const y = e.nativeEvent.layout.x / WINDOW_WIDTH;
    const width = e.nativeEvent.layout.height / WINDOW_HEIGHT;
    const height = e.nativeEvent.layout.width / WINDOW_WIDTH;

    setScanAera({
      x,
      y,
      width,
      height,
    });
  };

  // handle choose image to scan qr
  const handleChooseImage = async () => {
    try {
      const {assets}: any = await launchImageLibrary({
        mediaType: 'photo',
      });

      const {values} = await RNQRGenerator.detect({uri: assets[0].uri});

      if (values.length > 0) {
        Alert.alert('Read QR', 'QR content: ' + values);
      }
    } catch (error) {}
  };

  // handle show my QR
  const handleShowMyQr = () => {
    makeQR();
    setShowMyQr(true);
  };

  // handle hide my QR
  const handlehideMyQr = () => {
    setShowMyQr(false);
  };

  // handle save qr to image
  const handleSaveQR = async () => {
    try {
      const permisson = await checkStoragePermission();

      if (permisson) {
        const imageData = await captureRef(qrViewRef, {
          format: 'png',
          result: 'base64',
          width: qrViewLayout.current.width,
          height: qrViewLayout.current.height,
        });

        const filename =
          '/dlc_qr_' + transformFileName(user.fullname) + new Date().getTime();

        const path = Dirs.DocumentDir + filename + '.jpg';

        await FileSystem.appendFile(path, imageData, 'base64');

        await FileSystem.cpExternal(path, filename, 'images');

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

    switch (storagePermission![PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE]) {
      case RESULTS.UNAVAILABLE:
        console.log(
          'This feature is not available (on this device / in this context)',
        );
        ToastAndroid.show(
          'Chức năng hiện không khả dụng trên thiết vị này',
          ToastAndroid.LONG,
        );

        break;
      case RESULTS.DENIED:
        console.log(
          'The permission has not been requested / is denied but requestable',
        );

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
        console.log('The permission is limited: some actions are possible');

        break;
      case RESULTS.GRANTED:
        console.log('The permission is granted');

        return true;
      case RESULTS.BLOCKED:
        console.log('The permission is denied and not requestable anymore');

        break;

      default: {
        return true;
      }
    }
  };

  // handle share qr
  const handleShareQr = async () => {
    try {
      const imageData = await captureRef(qrViewRef, {
        format: 'png',
        result: 'base64',
        width: qrViewLayout.current.width,
        height: qrViewLayout.current.height,
      });

      const filename = '/dlc_qr_' + transformFileName(user.fullname) + '.png';

      const url = `data:image/png;base64,${imageData}`;

      await Share.open({
        title: 'Mã QR của tôi',
        filename: filename,
        url: url,
        message: 'Mã QR của tôi',
      });
    } catch (error) {}
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        text="Quét mã QR"
        iconLeft={require('../../assets/Arrow1.png')}
        onPressLeft={() => navigation.goBack()}
        containerStyle={{padding: 15}}
        iconRight={undefined}
        onPressRight={undefined}
        showCartBadge={undefined}
      />
      <RNCamera
        ref={cameraRef}
        captureAudio={false}
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
        onBarCodeRead={handleOnReadQr}
        barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
        // giới hạn khu vực quét qr (theo hướng màn hình nằm ngang, nút home ở bên phải)
        rectOfInterest={scanArea}
        // android only: chỉ định width và height để giới hạn khu vực quét qr.
        cameraViewDimensions={{width: WINDOW_WIDTH, height: WINDOW_HEIGHT}}>
        <BarcodeMask
          edgeWidth={40}
          edgeHeight={40}
          edgeBorderWidth={5}
          edgeColor="#005aa9"
          animatedLineColor="red"
          animatedLineHeight={3}
          lineAnimationDuration={1000}
          width={280}
          height={250}
          onLayoutMeasured={handleScanAera}
        />

        <View style={styles.titleView}>
          <Text style={styles.title}>
            Di chuyển Camera tới nơi có mã QR để quét
          </Text>
        </View>

        <View style={styles.actionView}>
          <TouchableOpacity style={styles.button} onPress={handleShowMyQr}>
            <Image source={qr} style={styles.image} />
            <Text style={styles.buttonTitle}>Mã QR của bạn</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleChooseImage}>
            <Image source={photos} style={styles.image} />
            <Text style={styles.buttonTitle}>Chọn mã QR từ thư viện</Text>
          </TouchableOpacity>
        </View>
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
                onLayout={({nativeEvent}: any) => {
                  qrViewLayout.current = {
                    width: nativeEvent.layout.width,
                    height: nativeEvent.layout.height,
                  };
                }}>
                <Image source={logo} style={styles.logo} resizeMode="contain" />

                {/* <Image
                  source={{uri: user.QRCode}}
                  style={styles.myQR}
                  resizeMode="contain"
                  resizeMethod="resize"
                /> */}

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
      </RNCamera>
    </SafeAreaView>
  );
}
