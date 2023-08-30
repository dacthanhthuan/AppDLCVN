import React, { useState } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    SafeAreaView,
    Image,
    Alert
} from 'react-native';
import QRCodeScanner from '../react-native-qrcode-scanner/index';
import { RNCamera } from 'react-native-camera';
import Header from '../../component/Header';
import styles from './styles';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../global';
import BarcodeMask from 'react-native-barcode-mask';
import { launchImageLibrary } from 'react-native-image-picker';

const CodeScan = ({ navigation }) => {

    const [selectedImage, setSelectedImage] = useState('')
    const [selectedFlash, setSelectedFlash] = useState(true)

    const ImagePicker = () => {

        let options = {
            mediaType: 'photo',

        }

        launchImageLibrary(options, response => {
            if (response?.assets?.length > 0) {
                setSelectedImage(response.assets[0].uri);
                console.log(selectedImage);
            } else {
                setSelectedImage('');
            }
        })
    }

    console.log('selectedImage:>>', selectedImage);

    return (
        <SafeAreaView style={styles.container}>

            <Header
                onPressLeft={() => navigation.goBack()}
                iconLeft={require('../../assets/imgSupplier/Arrow_1.png')}
                text="Quét QR"
                containerStyle={{ zIndex: 2, padding: 16 }}
                iconRight={selectedFlash ? require('../../assets/flash.png') : require('../../assets/flashOff.png')}
                onPressRight={() => { setSelectedFlash(!selectedFlash) }}
            />
            <View style={{ zIndex: 1, width: '80%', marginTop: 32 }}>
                <Text style={{ color: '#FFFFFF', fontSize: 16, textAlign: 'center' }}>
                    Di chuyển Camera đến mã QR để quét
                </Text>
            </View>

            <QRCodeScanner
                permissionDialogTitle='Thông báo'
                permissionDialogMessage='Chức năng cấp quyền sử dụng Camera'
                buttonPositive='Đồng ý'
                containerStyle={{ height: WINDOW_HEIGHT, position: 'absolute', backgroundColor: '#00000099' }}
                showMarker={true}
                reactivate={true}
                fadeIn={false}
                cameraType='back'
                reactivateTimeout={3000}
                cameraStyle={{ height: WINDOW_HEIGHT }}
                topViewStyle={{ height: 0, flex: 0 }}
                bottomViewStyle={{ height: 0, flex: 0 }}
                customMarker={
                    <View>
                        <BarcodeMask
                            width={WINDOW_WIDTH * 0.7}
                            height={WINDOW_HEIGHT * 0.6 * (9 / 16)}
                            backgroundColor='#00000099'
                            outerMaskOpacity={0.6}
                            showAnimatedLine={true}
                            animatedLineColor='#00FF00'
                            edgeColor={"#FFFFFF"}
                            edgeWidth={30}
                            edgeHeight={30}
                            edgeRadius={7}
                            edgeBorderWidth={10}
                            useNativeDriver={true}
                        />
                        {selectedImage ? <Image style={{ width: WINDOW_WIDTH * 0.7, height: WINDOW_HEIGHT * 0.6 * (9 / 16) }} resizeMode='contain' source={{ uri: selectedImage }} /> : null}
                    </View>
                }
                onRead={({ data }) => {
                    Alert.alert('Thông báo', data)
                }}
                flashMode={selectedFlash ? RNCamera.Constants.FlashMode.off : RNCamera.Constants.FlashMode.torch}
            >
            </QRCodeScanner>

            <View style={{ width: '100%', marginTop: WINDOW_HEIGHT * 0.6, }}>
                <TouchableOpacity onPress={() => ImagePicker()} style={styles.buttonTouchable}>
                    <Image style={styles.icon} source={require('../../assets/picture.png')} />
                    <Text style={styles.text}>Chọn QR từ thư viện</Text>
                </TouchableOpacity>

            </View>

        </SafeAreaView >
    );

};

export default React.memo(CodeScan);
