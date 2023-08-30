import React, { useEffect, useState } from "react";
import { Alert, Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import Style_Register from "./style";
import { useNavigation } from "@react-navigation/native";
import Text_Input from "../../component/TextInput";
import Button from "../../component/Button";
import Header from "../../component/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { registerUser } from "../../redux/actions";
import { useSelector } from "react-redux";
import store from "../../redux/store";

const Register = () => {
    const navigation = useNavigation();

    const [isFullName, setIsFullName] = useState('')
    const [isEmail, setIsEmail] = useState('')
    const [isNumber, setIsNumber] = useState('')
    const [isPassword, setIsPassword] = useState('')
    const [isRepeatPassword, setIsRepeatPassword] = useState('')
    const [isReferralBy, setIsReferralBy] = useState('')
    const [isRegisterAttempted, setIsRegisterAttempted] = useState(false);

    // Định dạng Email
    const isEmailValid = (email) => {
        // Email format regex pattern
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Lấy data và error từ redux
    const { data, isLoggedIn, error } = useSelector((state) => state.postReducers);

    useEffect(() => {
        // Khi true
        if (isRegisterAttempted) {
            if (data?.message === 'success') {
                handleRegisterSuccess();
            } else {
                handleRegisterFailed();
            }
        }
    }, [data, error]);

    const handleRegister = (fullname, email, number, password, repeatPassword, referralBy) => {
        if (!fullname || !email || !number || !password || !repeatPassword || !referralBy) {
            Alert.alert('Thông báo', 'Các trường không được để trống');
        } else if (password !== repeatPassword) {
            Alert.alert('Thông báo', 'Mật khẩu không trùng khớp');
        } else if (password.length < 6) {
            Alert.alert('Thông báo', 'Mật khẩu phải từ 6 ký tự trở lên');
        } else if (!isEmailValid(email)) {
            Alert.alert('Thông báo', 'Email không đúng định dạng');
        } else if (number.length !== 10 || isNaN(Number(number))) {
            Alert.alert('Thông báo', 'Số điện thoại phải có đúng 10 số');
        } else {
            // Gửi hành động tới registerUser
            store.dispatch(registerUser(fullname, email, number, password, repeatPassword, referralBy));
            setIsRegisterAttempted(true);
        }
    };

    // Đăng Ký thành công
    const handleRegisterSuccess = async () => {
        try {
            // Lưu data vào AsyncStorage
            await AsyncStorage.setItem('save', JSON.stringify(data));
            await AsyncStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
            // navigation.dispatch(StackActions.pop(2));
            navigation.navigate('ProfileAdmin')
            console.log('Register Success!');
        } catch (error) {
            console.error('Error saving data to AsyncStorage:', error);
        }
    };


    // Đăng ký thất bại
    const handleRegisterFailed = () => {
        Alert.alert('Register Failed!', error);
    };

    return (
        <SafeAreaView style={Style_Register.container}>
            <Header onPressLeft={() => navigation.goBack()} iconLeft={require('../../assets/imgSupplier/Arrow_1.png')} />
            <Image style={Style_Register.imgLogo} source={require('../../assets/imgLoginAndRegister/Logo.png')} />
            <View style={Style_Register.container_1}>
                <Text style={Style_Register.textRegister}>Tạo tài khoản mới</Text>
                <View style={{ marginBottom: 30 }}>
                    <Text_Input value={isFullName} placeholder='Họ và tên' onChangeText={(text) => setIsFullName(text)} />
                    <Text_Input value={isEmail} placeholder='Email' onChangeText={(text) => setIsEmail(text)} />
                    <Text_Input value={isNumber} placeholder='Số điện thoại' onChangeText={(text) => setIsNumber(text)} />
                    <Text_Input value={isPassword} placeholder='Mật khẩu' onChangeText={(text) => setIsPassword(text)} password={true} />
                    <Text_Input value={isRepeatPassword} placeholder='Nhập lại mật khẩu' onChangeText={(text) => setIsRepeatPassword(text)} password={true} />
                    <Text_Input value={isReferralBy} placeholder='Mã giới thiệu' onChangeText={(text) => setIsReferralBy(text)} />
                </View>
                <Button onPress={() => { handleRegister(isFullName, isEmail, isNumber, isPassword, isRepeatPassword, isReferralBy) }} text={'Đăng kí'} />
                <View style={{ alignItems: 'center' }}>
                    <View style={Style_Register.container_4}>
                        <Text style={Style_Register.textNotuser}>Bạn đã có tài khoản ?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={Style_Register.textLogin}> Đăng nhập</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Register;