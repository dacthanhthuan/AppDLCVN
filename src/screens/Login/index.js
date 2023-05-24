import React from 'react';
import { SafeAreaView, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import Style_Login from './style';
import { useNavigation } from "@react-navigation/native";
import Text_Input from '../../component/TextInput';
import Button from '../../component/Button';

const Login = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={Style_Login.container}>
            <Image style={Style_Login.imgLogo} source={require('../../assets/imgLoginAndRegister/Logo.png')} />
            <View style={Style_Login.container_1}>
                <Text style={Style_Login.textLogin}>Đăng nhập tài khoản</Text>
                <View style={{ marginBottom: 30 }}>
                    <Text_Input placeholder='Số điện thoại' />
                    <Text_Input placeholder='Mật khẩu' />
                </View>
                <Button onPress={() => navigation.navigate('Register')} text={'Đăng nhập'} />
                <View style={Style_Login.container_3}>
                    <TouchableOpacity>
                        <Text style={Style_Login.textForgotpass}>Quên mật khẩu?</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <View style={Style_Login.container_4}>
                        <Text style={Style_Login.textNotuser}>Bạn chưa có tài khoản?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={Style_Login.textRegister}>Đăng ký</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}
export default Login;