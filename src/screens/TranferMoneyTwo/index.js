import React, { useState } from 'react';
import { SafeAreaView, View, Text, Image, Modal, TouchableOpacity, Alert } from 'react-native';
import styles from './style';
import Header from '../../component/Header';
import MainWallet from '../../component/Mainwallet';
import Button from '../../component/Button';
import { useSelector } from 'react-redux';
import { WINDOW_HEIGHT, formatpoint, formatprice } from '../../global';
import TransactionDetails from '../../component/TransactionDetails';
import { fetchClientDetail, fetchTransfers } from '../AddAddress/http';
import ModalInput from '../../component/ModalInput';
import store from '../../redux/store';
import { fetchUsersSuc } from '../../redux/actions';
import * as Keychain from 'react-native-keychain';

const TranferMoneyTwo = ({ navigation, route }) => {

    // Phần hiển thị check vân tay
    const options = {
        authenticationPrompt: {
            title: 'Xác nhận vân tay cho DLCONE',
            cancel: 'Hủy',
        },
        accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
        service: 'MAP'
    }

    const { data } = useSelector((state) => state.postReducers);
    const sessionToken = data?.data?.session_token;

    const [isPassword, setIsPassword] = useState('')
    const [isModalVisible, setIsModalVisible] = useState(false)

    // Amount
    const moneyWallet = data?.data?.lWallet[0]?.amount; // Ví tiền
    const pointWallet = data?.data?.lWallet[1]?.amount; // Ví điểm

    // Wallet_id
    const moneyWallet_Id = data?.data?.lWallet[0]?.wallet_id; // Ví tiền: 1
    const pointWallet_Id = data?.data?.lWallet[1]?.wallet_id; // Ví điểm 2

    const { item, screen } = route?.params || {};

    const prevScreen = screen?.screen;

    const walletIdOnly = prevScreen === 'WalletMoney' ? moneyWallet_Id : pointWallet_Id;

    // console.log('previousScreen2:>>', prevScreen);
    // console.log('sessionToken:>>', sessionToken);
    // console.log('amount:>>', item?.isAmount);
    // console.log('note:>>', item?.isNote);
    // console.log('to:>>', item?.selectedItem?.user_id);
    // console.log('wallet_id:>>', walletIdOnly);
    // console.log('isPassword:>>', isPassword);

    // Gọi API chuyển tiền
    const callAPITransfers = async (password) => {
        try {
            const response = await fetchTransfers({
                'TOKEN': sessionToken,
                'AMOUNT': item?.isAmount,
                'NOTE': item?.isNote,
                'TO': item?.selectedItem?.user_id,
                'WALLET_ID': walletIdOnly,
                'PASSWORD': password,
            })

            // console.log(response);
            if (response?.message == 'success') {
                // Gọi API client Detail
                const clientDetail = await fetchClientDetail({
                    'toKen': data?.data?.session_token
                });
                if (clientDetail?.data != null) {
                    store.dispatch(fetchUsersSuc(clientDetail))
                }
                // Nếu nhận được prevScreen từ màn hình nào thì sẽ chuyển qua màn hình đó.
                { prevScreen === 'WalletMoney' ? navigation.navigate('WalletMoney') : navigation.navigate('WalletPoint') }
            }
            else {
                Alert.alert('Thông báo', response?.message)
                setIsPassword('')
            }
            return response;
        } catch (error) {
            console.log('Error transfers:', error);
        }
    }

    // Số tiền hoặc số điểm dựa trên màn hình được gửi qua
    const walletOnly = prevScreen === 'WalletMoney' ? formatprice(moneyWallet) : formatpoint(pointWallet);
    const totalOnly = prevScreen === 'WalletMoney' ? formatprice(item?.isAmount) : formatpoint(item?.isAmount);

    // Xác nhận bằng vân tay 
    const TouchID = async () => {
        try {
            const credentials = await Keychain.getGenericPassword(options);
            console.log('credentialsPassword:>>', credentials.password);
            if (credentials) {
                const newPassword = credentials.password;
                console.log('newPassword:>>', newPassword);
                if (newPassword) {
                    await callAPITransfers(newPassword)
                }
            } else {
                Alert.alert('Thông báo', 'Tài khoản của bạn chưa được kích hoạt vân tay hoặc FaceId. Vui lòng đăng nhập và kích hoạt để sử dụng');
            }
        } catch (error) {
            console.log('Lỗi khi xác thực vân tay:', error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>

            <Header onPressLeft={() => navigation.goBack()}
                iconLeft={require('../../assets/Arrow1.png')}
                text={'Chuyển tiền'} />

            <Text style={[styles.title, { marginTop: 16 }]}>Người nhận</Text>
            <View style={styles.viewUser}>
                {item?.selectedItem?.avatar ? (
                    <Image style={styles.imgUser} resizeMode='contain' source={{ uri: item?.selectedItem?.avatar }} />
                ) : (
                    <Image style={styles.imgUser} resizeMode='contain' source={require('../../assets/Rectangle312.png')} />
                )}
                <Text style={styles.textName}>{item?.selectedItem?.fullname}</Text>
            </View>

            <Text style={styles.title}>Nguồn tiền</Text>
            <MainWallet
                style={{ marginVertical: 16 }}
                title={prevScreen === 'WalletMoney' ? 'Ví chính' : 'Ví điểm'}
                money={walletOnly} />


            <Text style={styles.title}>Chi tiết giao dịch</Text>
            <TransactionDetails
                style={{ marginTop: 16 }}
                name={item?.selectedItem?.fullname}
                mobile={item?.selectedItem?.mobile}
                price={totalOnly} />

            <View style={styles.containerFooter}>
                <Text style={styles.title}>Tổng tiền giao dịch</Text>
                <Text style={styles.title}>{totalOnly}</Text>
            </View>

            {/* Hiện mật khẩu để nhập */}
            <Modal transparent
                visible={isModalVisible}
                onRequestClose={() => {
                    setIsModalVisible(false);
                    setIsPassword('')
                }}
                animationType='slide'
                hardwareAccelerated>
                <View style={styles.modalContainer}>
                    <View style={styles.centeredView}>
                        <Text style={styles.modalTitle}>Thông báo</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <ModalInput style={{ width: 250 }} value={isPassword} placeholder={'Nhập mật khẩu đăng nhập'} typeInput={true} autoFocus={true} onChangeText={(text) => setIsPassword(text)} />
                            <TouchableOpacity onPress={() => TouchID()}>
                                <Image style={styles.icon} resizeMode='contain' source={require('../../assets/Home/fingerprint.png')} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            onPress={() => callAPITransfers(isPassword)}
                            style={styles.button}>
                            <Text style={styles.textButton}>Tiếp tục</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <View style={{ alignItems: 'center' }}>
                <Button
                    style={{ top: WINDOW_HEIGHT * 0.3, width: '90%' }}
                    text={'Xác nhận chuyển tiền'}
                    onPress={() => {
                        setIsModalVisible(true)
                    }} />
            </View>

        </SafeAreaView>
    )
};

export default React.memo(TranferMoneyTwo);