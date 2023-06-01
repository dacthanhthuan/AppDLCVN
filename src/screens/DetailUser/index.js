import React from "react";
import { SafeAreaView, View, TextInput, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import Header from "../../component/Header";
import { useNavigation } from "@react-navigation/native";
import Style_User from "./style";
import Detail_Input from "../../component/Detail_Input";
import Button from "../../component/Button";

const Detail_User = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={Style_User.container}>
            <Header onPressLeft={() => navigation.goBack()} text={'Chi tiết tài khoản'} iconLeft={require('../../assets/Arrow1.png')} containerStyle={{ paddingBottom: 10 }} />
            <ScrollView style={Style_User.scrollview} showsVerticalScrollIndicator={false}>
                <View style={Style_User.container_1}>
                    <TouchableOpacity>
                        <Image style={Style_User.imgUser} source={require('../../assets/Rectangle312.png')} />
                        <Image style={Style_User.iconCamera} source={require('../../assets/imgSupplier/Rectangle_310.png')} />
                    </TouchableOpacity>
                    <Text style={Style_User.nameUser}>Nguyễn Thái Năng</Text>
                </View>
                <Detail_Input text={'Mã NPP'} placeholder={'Chưa có thông tin'} />
                <Detail_Input text={'Điện thoại'} placeholder={'Chưa có thông tin'} />
                <Detail_Input text={'Tên đăng nhập'} placeholder={'Chưa có thông tin'} />
                <Detail_Input text={'Ngày sinh'} placeholder={'Chưa có thông tin'} />
                <Detail_Input text={'Họ và tên'} placeholder={'Chưa có thông tin'} />
                <Detail_Input text={'Email'} placeholder={'Chưa có thông tin'} />
                <Detail_Input text={'CMND/CCCD/Hộ chiếu(Người nước ngoài)'} placeholder={'Chưa có thông tin'} />
                <Detail_Input text={'Tỉnh/ Thành'} placeholder={'Chưa có thông tin'} />
                <Detail_Input text={'GPLĐ'} placeholder={'Chưa có thông tin'} />
                <Detail_Input text={'Ngày cấp'} placeholder={'Chưa có thông tin'} />
                <Detail_Input text={'Ngày hiệu lực'} placeholder={'Chưa có thông tin'} />
                <Detail_Input text={'Nơi cấp'} placeholder={'Chưa có thông tin'} />
                <Detail_Input text={'Số hợp đồng'} placeholder={'Chưa có thông tin'} />
                <Detail_Input text={'Giới tính'} placeholder={'Chưa có thông tin'} />
                <Detail_Input text={'Ngày sinh'} placeholder={'Chưa có thông tin'} />
                <Detail_Input text={'Vị trí'} placeholder={'Chưa có thông tin'} />
                <Detail_Input text={'Số tài khoản'} placeholder={'Chưa có thông tin'} />
                <Detail_Input text={'Ngân hàng'} placeholder={'Chưa có thông tin'} />
                <Detail_Input text={'Danh hiệu'} placeholder={'Chưa có thông tin'} />
                <Detail_Input text={'Chi nhánh'} placeholder={'Chưa có thông tin'} />
                <Detail_Input text={'Địa chỉ thuờng trú(hoặc đăng ký lưu trú đối với người nước ngoài)'} placeholder={'Chưa có thông tin'} />
                <Detail_Input text={'Mã số người bảo trợ'} placeholder={'Chưa có thông tin'} />
                <Detail_Input text={'Họ tên người bảo trợ'} placeholder={'Chưa có thông tin'} />
                <Detail_Input text={'Địa chỉ tạm trú(thuờng trú hoặc tạm trú trong trường hợp không cư trú tại nơi thường trú):'} placeholder={'Chưa có thông tin'} />
                <Detail_Input text={'Số hợp đồng người bảo trợ'} placeholder={'Chưa có thông tin'} />
                <View style={{ paddingLeft: 30, paddingRight: 30 }}>
                    <Button onPress={() => navigation.navigate('ProfileAdmin')} style={{ marginTop: 30, }} text={'Cập nhật'} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

export default Detail_User;