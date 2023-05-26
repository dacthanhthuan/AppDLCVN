import React from "react";
import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Style_Register from "./style";
import { useNavigation } from "@react-navigation/native";
import Text_Input from "../../component/TextInput";
import Button from "../../component/Button";
import Header from "../../component/Header";

const Register = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={Style_Register.container}>
            <Header onPressLeft={() => navigation.goBack()} iconLeft={require('../../assets/imgSupplier/Arrow_1.png')} />
            <Image style={Style_Register.imgLogo} source={require('../../assets/imgLoginAndRegister/Logo.png')} />
            <View style={Style_Register.container_1}>
                <Text style={Style_Register.textRegister}>Tạo tài khoản mới</Text>
                <View style={{ marginBottom: 30 }}>
                    <Text_Input placeholder='Họ và tên' />
                    <Text_Input placeholder='Email' />
                    <Text_Input placeholder='Số điện thoại' />
                    <Text_Input placeholder='Mật khẩu' />
                    <Text_Input placeholder='Nhập lại mật khẩu' />
                    <Text_Input placeholder='Mã giới thiệu' />
                </View>
                <Button onPress={() => navigation.navigate('Login')} text={'Đăng kí'} />
                <View style={{ alignItems: 'center' }}>
                    <View style={Style_Register.container_4}>
                        <Text style={Style_Register.textNotuser}>Bạn đã có tài khoản?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={Style_Register.textLogin}>Đăng nhập</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Register;