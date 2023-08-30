import React, { useState } from 'react';
import {
  Image,
  Text,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  View,
  TouchableOpacity,
  Modal,
  Alert,
  RefreshControl
} from 'react-native';
import styles from './styles';
import InfoCard from '../../component/InfoCard';
import CardProfile from '../../component/CardProfile';
import TranfersMoney from '../../component/TranfersMoney';
import NotLogin from '../NotLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import store from '../../redux/store';
import { clearCart, clearCartPoint, clearUsers, clearproductHome, fetchUsersSuc } from '../../redux/actions';
import ModalInput from '../../component/ModalInput';
import * as Keychain from 'react-native-keychain';
import axios from 'axios';
import ModalEnableFingerprint from '../../component/ModalEnableFingerprint';
import { SAVE_DATA, SAVE_ISLOGGEDIN, localData } from '../../Local/AsyncStorage';
import { formatpoint, formatprice } from '../../global';
import { fetchClientDetail } from '../AddAddress/http';

const ProfileAdmin = () => {

  const navigation = useNavigation()

  const [isFingerprint, setIsFingerprint] = useState(false)
  const [isPassword, setIsPassword] = useState('')
  const [isEnableFingerprint, setIsEnableFingerprint] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Options setGenericPassword
  const options = {
    authenticationPrompt: {
      title: 'Xác nhận vân tay cho DLCONE',
      cancel: 'Hủy',
    },
    accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
    service: 'MAP'
  };

  // Lấy isLoggedIn và data từ redux 
  const { data, isLoggedIn } = useSelector((state) => state.postReducers);
  const mobileData = data?.data?.mobile;

  const moneyWallet = data?.data?.lWallet[0]?.amount; // Ví VND
  const pointWallet = data?.data?.lWallet[1]?.amount; // Ví điểm 

  // Tạo FormData cho Login
  const FORM_DATA_LOGIN = ({ userName, passWord }) => {
    const data = new FormData();
    data.append('username', userName);
    data.append('password', passWord);
    return data;
  };

  // Kích hoạt vân tay
  const onPressFingerprint = async () => {
    if (isPassword) {
      // Nếu user nhập password thì sẽ gọi api
      const mainDomain = await AsyncStorage.getItem('domain');
      const apiKey = await AsyncStorage.getItem('apiKey');

      const formData = FORM_DATA_LOGIN({ userName: mobileData, passWord: isPassword });
      await axios.post(`${mainDomain}/client_init/login?apikey=${apiKey}`, formData, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      }).then(async (res) => {
        if (res.data.message === 'success') {
          // Lưu sđt và password vào Keychain khi kích hoạt vân tay thành công
          const credentials = await Keychain.setGenericPassword(mobileData, isPassword, options);
          console.log('credentials:>>', credentials);
          // tắt thông báo nhập mật khẩu
          setIsFingerprint(false)
          // bật thông báo kích hoạt thành công
          setIsEnableFingerprint(true)
          setTimeout(() => {
            setIsEnableFingerprint(false)
          }, 3000)
          setIsPassword('')
        } else {
          Alert.alert('Thông báo', 'Bạn đã nhập sai mật khẩu')
        }
        return res.data
      }).catch((error) => console.log(error))
    } else {
      Alert.alert('Thông báo', 'Chưa nhập mật khẩu')
    }
  }

  // MÃ HÓA SĐT
  const encryptMiddleDigits = (inputString) => {
    // Lấy độ dài của chuỗi
    const length = inputString.length;

    // Tính chỉ số bắt đầu và độ dài chuỗi bị mã hóa
    const startIndex = Math.floor((length - 4) / 2);
    const replaceLength = 5;

    // Tạo chuỗi ký tự ***** cùng độ dài với chuỗi cần mã hóa
    const encryptedString = '*'.repeat(replaceLength);

    // Thay thế chuỗi 5 ký tự ở giữa bằng *****
    const outputString = inputString.slice(0, startIndex) + encryptedString + inputString.slice(startIndex + replaceLength);

    return outputString;
  };

  // Đăng xuất
  const deleteData = async () => {
    try {
      // Xóa dữ liệu trong AsyncStorage
      await AsyncStorage.removeItem(SAVE_DATA)
      await AsyncStorage.removeItem(SAVE_ISLOGGEDIN)
      // Xóa dữ liệu trong redux
      store.dispatch(clearUsers())
      store.dispatch(clearproductHome())
      store.dispatch(clearCart())
      store.dispatch(clearCartPoint())
      navigation.navigate('ProfileAdmin')
    } catch (e) {
      console.log(e)
    }
  }

  // Xóa vân tay
  const checkAndClearKeychainData = async () => {
    try {
      // Kiểm tra xem có dữ liệu trong keychain hay không
      const credentials = await Keychain.getGenericPassword(options);
      // Nếu có dữ liệu trong keyChain thì hiện lên thông báo có muốn hủy kích hoạt
      if (credentials) {
        Alert.alert(
          'Thông báo',
          'Bạn có chắc muốn hủy kích hoạt vân tay ?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
              onPress: () => {
                // Xử lý khi nhấn nút "Cancel"
                console.log('Đã nhấn Cancel');
              },
            },
            {
              text: 'OK',
              style: 'destructive',
              onPress: async () => {
                await Keychain.resetGenericPassword(options)
                console.log('Đã hủy kích hoạt vân tay');
              },
            },
          ],
          { cancelable: false }
        );
      } else {
        // Nếu không có dữ liệu trong keyChain thì hiện lên thông báo nhập mật khẩu để kích hoạt
        setIsFingerprint(!isFingerprint)
      }
    } catch (error) {
      console.log(error);
    }
  };

  // GỌi API khi màn hình được gọi
  const fetchData = async () => {
    try {
      const clientDetail = await fetchClientDetail({
        'toKen': data?.data?.session_token
      });

      if (clientDetail?.data != null) {
        // console.log(clientDetail);
        store.dispatch(fetchUsersSuc(clientDetail))
        await localData(clientDetail)
      }
    } catch (error) {
      console.error('Error fetching client detail:', error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {

      fetchData();
    }, []) // Empty dependency array to run the effect every time the screen is focused
  );

  // onRefresh
  const onRefreshs = async () => {
    setRefreshing(true)
    fetchData()
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }

  return isLoggedIn ? (
    <ScrollView
      refreshControl={
        < RefreshControl
          refreshing={refreshing}
          colors={['white']}
          progressBackgroundColor={'#005AA9'}
          onRefresh={onRefreshs}
        />
      }
      showsVerticalScrollIndicator={false}>
      <SafeAreaView style={styles.container}>
        <ModalEnableFingerprint
          visible={isEnableFingerprint}
          onRequestClose={() => { setIsEnableFingerprint(false) }}
          second={3} />
        <Modal
          transparent
          visible={isFingerprint}
          onRequestClose={() => {
            setIsFingerprint(false);
          }}
          animationType='slide'
          hardwareAccelerated
        >
          <View style={styles.modalContainer}>
            <View style={styles.centeredView}>
              <Text style={styles.modalTitle}>Thông báo</Text>
              <Text style={styles.modalDescription}>Quý khách vui lòng nhập mật khẩu để kích hoạt chức năng này</Text>
              <ModalInput value={encryptMiddleDigits(String(mobileData))} style={{ marginBottom: 8, color: '#C2C2C2' }} editable={false} />
              <ModalInput value={isPassword} placeholder={'Nhập mật khẩu đăng nhập'} typeInput={true} autoFocus={true} onChangeText={(text) => setIsPassword(text)} />
              <TouchableOpacity
                onPress={() => { onPressFingerprint() }}
                style={{ bottom: -40 }}>
                <Text style={{ fontSize: 18, color: '#065FD4', fontWeight: '500' }}>Tiếp tục</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <CardProfile
          style={{ marginTop: 25, borderColor: '#005AA9' }}
          image={require('../../assets/Rectangle312.png')}
          text={data?.data?.fullname}
          id={data?.data?.activated_at}
          onPress={() => navigation.navigate('Detail_User')}
        />

        <TouchableOpacity style={{ marginVertical: 16, maxWidth: '20%' }}
          onPress={() => { deleteData() }}>
          <Text style={styles.titleLogout}>Đăng xuất</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.wallet, {
          backgroundColor: '#0059A9',
        }]}
          onPress={() => navigation.navigate('WalletMoney')}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
              source={require('../../assets/Rectangle326.png')}
            />
            <Text style={{ fontSize: 16, color: '#FFFFFF', marginLeft: 10 }}>
              Ví tiền
            </Text>
          </View>
          <Text style={{ fontSize: 16, color: '#FFFFFF' }}>{formatprice(moneyWallet)}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('WalletPoint')}
          style={[
            styles.wallet,
            {
              backgroundColor: '#FCB813', zIndex: 1, marginTop: -22
            },
          ]}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
              source={require('../../assets/Rectangle326.png')}
            />
            <Text style={{ fontSize: 16, color: '#FFFFFF', marginLeft: 10 }}>
              Ví điểm
            </Text>
          </View>
          <Text style={{ fontSize: 16, color: '#FFFFFF' }}>{formatpoint(pointWallet)}</Text>
        </TouchableOpacity>

        <ImageBackground
          style={styles.rowTranfers}
          source={require('../../assets/Rectangle303_1.png')}>
          <TranfersMoney
            image={require('../../assets/Rectangle303.png')}
            text="Quét mã"
            onPress={() => navigation.navigate('QRCodeTab')}
          />
          <TranfersMoney
            image={require('../../assets/Rectangle304.png')}
            text="Nạp ví"
            onPress={() => navigation.navigate('Recharge')}
          />
          <TranfersMoney
            image={require('../../assets/Rectangle305.png')}
            text="Chuyển tiền"
            onPress={() => navigation.navigate('TransferMoney', { screen: 'WalletMoney' })}
          />
          <TranfersMoney
            image={require('../../assets/Rectangle306.png')}
            text="Rút tiền"
            onPress={() => navigation.navigate('WithDraw')}
          />
        </ImageBackground>


        <Text style={styles.title}>Bảng điều khiển</Text>
        <InfoCard
          image={require('../../assets/Home/fingerprint.png')}
          text="Kích hoạt vân tay"
          onPress={() => { checkAndClearKeychainData() }}
        />
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
          onPress={() => navigation.navigate('CustomerBank')}

        />
        <InfoCard
          image={require('../../assets/Rectangle295.png')}
          text="Quản lý địa chỉ"
          onPress={() => navigation.navigate('CustomerInformation')}
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
          style={{ marginBottom: 32 }}
        />
      </SafeAreaView >
    </ScrollView >
  ) : (<NotLogin />)

};

export default React.memo(ProfileAdmin);
