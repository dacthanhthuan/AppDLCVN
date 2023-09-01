import {
  Alert,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {launchImageLibrary} from 'react-native-image-picker';
import RNQRGenerator from 'rn-qr-generator';
import styles from './styles';
import Header from '../../component/Header';
import {StackActions, useNavigation} from '@react-navigation/native';
import BarcodeMask from 'react-native-barcode-mask';
import {useEffect, useRef, useState} from 'react';
import {WINDOW_WIDTH, WINDOW_HEIGHT} from '../../global';
import {useDispatch, useSelector} from 'react-redux';
import {DetailMember} from '../../redux/actions/detailMemberActions';
import LoadingOverlay from '../../component/LoadingOverlay';

const photos = require('../../assets/gallery.png');

export default function ScanQrScreen() {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const session_token = useSelector((state: any) => state.user.session_token);
  const detailMember = useSelector((state: any) => state.detailMember.data);
  const detailMemberLoading = useSelector(
    (state: any) => state.detailMember.loading,
  );
  const detailMemberMsg = useSelector(
    (state: any) => state.detailMember.message,
  );

  const cameraRef = useRef<RNCamera | any>(null);
  const onReadQrTimer = useRef<number | any>(null);
  const [scanArea, setScanAera] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [canScanQR, setCanScanQR] = useState(true);
  const qrContent = useRef<any>(null);

  // handle read qr
  const handleOnReadQr = (data: any) => {
    // debounce when this function is invoked many times.
    clearTimeout(onReadQrTimer.current);
    // pause camera
    cameraRef.current.pausePreview();

    onReadQrTimer.current = setTimeout(() => {
      setCanScanQR(false);
      handleResultQR(data.data);
      clearTimeout(onReadQrTimer.current);
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
      // pause camera
      cameraRef.current.pausePreview();

      const {assets}: any = await launchImageLibrary({
        mediaType: 'photo',
      });

      const {values} = await RNQRGenerator.detect({uri: assets[0].uri});

      if (values.length > 0) {
        // unactived scan feature
        setCanScanQR(false);
        handleResultQR(values[0]);
      }
    } catch (error) {}
  };

  // handle result qr is readed
  const handleResultQR = (result: string) => {
    if (result.startsWith('{') && result.endsWith('}')) {
      // trasnform string to json object
      qrContent.current = JSON.parse(result);

      switch (qrContent.current.type) {
        case 'transfer': {
          dispatch(
            DetailMember.start({
              token: session_token,
              keyword: qrContent.current.value.mobile,
              type: 'exactly',
            }),
          );

          break;
        }

        default: {
          Alert.alert(
            'Quét QR không thành công',
            'Mã QR của bạn không hợp lệ, vui lòng thử lại',
          );
          cameraRef.current.resumePreview();
          // can scan qr after 300ms
          const timer = setTimeout(() => {
            setCanScanQR(true);
            clearTimeout(timer);
          }, 300);
          break;
        }
      }
    } else {
      // display alert when qr is invalid
      Alert.alert(
        'Quét QR không thành công',
        'Mã QR của bạn không hợp lệ, vui lòng thử lại',
      );
      cameraRef.current.resumePreview();
      // can scan qr after 300ms
      const timer = setTimeout(() => {
        setCanScanQR(true);
        clearTimeout(timer);
      }, 300);
    }
  };

  // side effect: when loaded detail member data
  useEffect(() => {
    if (!detailMemberLoading && !canScanQR) {
      // actived scan feature
      setCanScanQR(true);
      // resume camera after pause
      cameraRef.current.resumePreview();

      if (!detailMemberMsg) {
        // pop current screen
        navigation.dispatch(StackActions.pop());

        // navigate to transfer screen
        navigation.navigate('TransferMoney', {
          wallet_id: qrContent.current.value.wallet_id,
          transferee: detailMember, // người nhận
        });
      } else {
        Alert.alert('Lỗi', detailMemberMsg);
      }
    }
  }, [detailMemberLoading]);

  return (
    <SafeAreaView style={styles.container}>
      {detailMemberLoading ? <LoadingOverlay /> : null}
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
        barCodeTypes={canScanQR ? [RNCamera.Constants.BarCodeType.qr] : []}
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
          backgroundColor="rgba(1,1,1,1)"
        />

        <View style={styles.titleView}>
          <Text style={styles.title}>
            Di chuyển Camera tới nơi có mã QR để quét
          </Text>
        </View>

        <View style={styles.actionView}>
          <TouchableOpacity style={styles.button} onPress={handleChooseImage}>
            <Image source={photos} style={styles.image} />
            <Text style={styles.buttonTitle}>Chọn mã QR từ thư viện</Text>
          </TouchableOpacity>
        </View>
      </RNCamera>
    </SafeAreaView>
  );
}
