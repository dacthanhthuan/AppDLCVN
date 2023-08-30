import React, { useState, useEffect } from "react"
import { SafeAreaView, View, Text, Alert, TouchableOpacity, ScrollView, Image, Modal } from "react-native";
import styles from "./styles";
import Header from "../../component/Header";
import { useSelector } from "react-redux";
import { WINDOW_WIDTH } from "../../global";
import Button from "../../component/Button";
import InputAddress from "../../component/InputAddress";
import CardBanking from "../../component/CardBanking";
import ModalInput from "../../component/ModalInput";
import { fetchAddBank, fetchClientDetail, fetchClientListBank } from "../AddAddress/http";
import { StackActions } from "@react-navigation/native";
import { fetchUsersSuc } from "../../redux/actions";
import store from "../../redux/store";
import * as Keychain from 'react-native-keychain';



const CustomerBank = ({ navigation }) => {

    const { data } = useSelector((state) => state.postReducers)

    const [isListBank, setIsListBank] = useState([]);
    const [isSelected, setIsSelected] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isBankAccout, setIsBankAccout] = useState('');
    const [isBankFullname, setIsBankFullname] = useState('');
    const [isBankBranch, setIsBankBranch] = useState('');
    const [isBankCity, setIsBankCity] = useState('');
    const [isPassword, setIsPassword] = useState('');

    const bankAccount = data?.data?.bank_account;
    const bankName = data?.data?.bank_name;
    const bankFullname = data?.data?.bank_fullname;
    const bankBranch = data?.data?.bank_branch;
    const bankCity = data?.data?.bank_city;

    const inputString = bankAccount;
    const resultBankAccount = inputString.replace(/(.{4})/g, "$1 ");

    // Phần hiển thị check vân tay
    const options = {
        authenticationPrompt: {
            title: 'Xác nhận vân tay cho DLCONE',
            cancel: 'Hủy',
        },
        accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
        service: 'MAP'
    }

    // Gọi API tất cả ngân hàng để chọn
    const callAPIClientListBank = async () => {
        try {
            const response = await fetchClientListBank({
                'TOKEN': data?.data?.session_token,
            })
            setIsListBank(response?.data?.l);
            return response;
        } catch (error) {
            console.log('Error client list bank:', error);
        }
    }

    // Gọi API thêm tài khoản ngân hàng
    const callAPIAddBank = async (pasword) => {
        if (pasword == '') {
            Alert.alert('Thông báo', 'Vui lòng nhập mật khẩu')
        } else {
            try {
                const response = await fetchAddBank({
                    'TOKEN': data?.data?.session_token,
                    'BANK_NAME': isSelected?.short,
                    'BANK_ACCOUNT': isBankAccout,
                    'BANK_FULLNAME': isBankFullname,
                    'BANK_BRANCH': isBankBranch,
                    'BANK_CITY': isBankCity,
                    'PASSWORD': pasword
                })

                if (response?.message !== 'success') {
                    Alert.alert('Thông báo', response?.message)
                    setIsModalVisible(false)
                    setIsPassword('')
                } else {
                    console.log('response:>>', response);
                    const clientDetail = await fetchClientDetail({
                        'toKen': data?.data?.session_token
                    });

                    if (clientDetail?.data != null) {
                        // console.log(clientDetail);
                        store.dispatch(fetchUsersSuc(clientDetail))
                    }
                    navigation.dispatch(StackActions.pop(1));
                    return response;
                }
            } catch (error) {
                console.log('Error add bank:', error);
            }
        }
    }

    useEffect(() => {
        callAPIClientListBank();
    }, [data])

    // Xác nhận bằng vân tay 
    const TouchID = async () => {
        try {
            const credentials = await Keychain.getGenericPassword(options);
            console.log('credentialsPassword:>>', credentials.password);
            if (credentials) {
                const newPassword = credentials.password;
                if (newPassword) {
                    await callAPIAddBank(newPassword)
                }
            } else {
                Alert.alert('Thông báo', 'Tài khoản của bạn chưa được kích hoạt vân tay hoặc FaceId. Vui lòng đăng nhập và kích hoạt để sử dụng');
            }
        } catch (error) {
            console.log('Lỗi khi xác thực vân tay:', error);
        }
    }


    // Show nhập password
    const showModal = () => {
        if (!isBankAccout || !isBankBranch || !isBankFullname || !isBankCity) {
            Alert.alert('Thông báo', 'Các trường không được để trống');
        } else if (!isSelected) {
            Alert.alert('Thông báo', 'Vui lòng chọn ngân hàng');
        } else {
            setIsModalVisible(true);
        }
    };

    return (
        <>
            <Header
                text="Tài khoản ngân hàng"
                iconLeft={require('../../assets/Arrow1.png')}
                onPressLeft={() => navigation.goBack()}
                containerStyle={{ paddingTop: 16, paddingHorizontal: 16 }}
            />
            <ScrollView>
                <SafeAreaView style={styles.container}>

                    {bankAccount ? (
                        <View style={{ flex: 1, marginTop: 16 }}>
                            <View style={styles.containerItem}>
                                <Text style={styles.textBankAccount}>{resultBankAccount.trim()}</Text>
                                <View style={{ flexDirection: 'row', marginTop: 16 }}>
                                    <View style={{ width: '45%' }}>
                                        <Text style={[styles.textFooterTitle, { flexWrap: 'wrap' }]}>Tên chủ thẻ</Text>
                                        <Text style={styles.textFooterValue}>{bankFullname}</Text>
                                    </View>
                                    <View style={{ marginLeft: 80 }}>
                                        <Text style={styles.textFooterTitle}>Ngân hàng</Text>
                                        <Text style={[styles.textFooterValue, { flexWrap: 'wrap' }]}>{bankName}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 16 }}>
                                    <View style={{ width: '45%' }}>
                                        <Text style={styles.textFooterTitle}>Chi nhánh</Text>
                                        <Text style={[styles.textFooterValue, { flexWrap: 'wrap' }]}>{bankBranch}</Text>
                                    </View>
                                    <View style={{ marginLeft: 80 }}>
                                        <Text style={styles.textFooterTitle}>Thành phố</Text>
                                        <Text style={[styles.textFooterValue, { flexWrap: 'wrap' }]}>{bankCity}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ) : <></>}

                    <InputAddress
                        value={isBankFullname}
                        onChangeText={(text) => setIsBankFullname(text)}
                        title='Tên chủ thể' />
                    <InputAddress
                        value={isBankAccout}
                        onChangeText={(text) => setIsBankAccout(text)}
                        title='Số thẻ'
                        keyboardType='number-pad'
                    />
                    <InputAddress
                        value={isBankBranch}
                        onChangeText={(text) => setIsBankBranch(text)}
                        title='Chi nhánh'
                    />
                    <InputAddress
                        value={isBankCity}
                        onChangeText={(text) => setIsBankCity(text)}
                        title='Thành phố'
                    />
                    <Text style={styles.textTitle}>Vui lòng chọn ngân hàng</Text>

                    <View style={{ alignItems: 'center', marginVertical: 16, width: '100%' }}>
                        <CardBanking logo={isListBank} isSelected={isSelected} onSelect={setIsSelected} />
                    </View>

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
                                    onPress={() => callAPIAddBank(isPassword)}
                                    style={styles.button}>
                                    <Text style={styles.textButton}>Tiếp tục</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    <Button style={{ marginBottom: 16 }} onPress={() => showModal()} text='Cập nhật ngân hàng' />

                </SafeAreaView >
            </ScrollView>
        </>


    )
}

export default React.memo(CustomerBank);