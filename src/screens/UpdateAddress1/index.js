import React, { useState } from "react";
import styles from "./styles";
import { SafeAreaView, Text, View } from "react-native";
import Header from "../../component/Header";
import InputAddress from "../../component/InputAddress";
import TypeAddress from "../../component/TypeAddress";
import Button from "../../component/Button";
import DeliveryAddress from "../../component/DeliveryAddress";

const UpdateAddress1 = ({ navigation }) => {

    const [check, setCheck] = useState('Công ty');

    const handleTypeAddressPress = (type) => {
        setCheck(type);
    };

    return (
        <SafeAreaView style={styles.container}>

            <Header
                iconLeft={require('../../assets/Arrow1.png')}
                text='Sửa địa chỉ'
                iconRight={require('../../assets/white.png')}
                onPressLeft={() => { navigation.goBack() }}
            />

            <Text style={styles.title}>Thông tin liên hệ</Text>

            <InputAddress title='Họ và Tên' />
            <InputAddress title='Số điện thoại' keyboardType='number-pad' />

            <Text style={styles.titleAfter}>Địa chỉ giao hàng</Text>

            <DeliveryAddress
                city='Thành phố Hồ Chí Minh'
                district='Quận Bình Thạnh'
                ward='Phường 11'
                apartmentNumber='28E Tăng Bạt Hổ'
            />

            <Text style={styles.titleAfter}>Loại địa chỉ</Text>

            <View style={{ flexDirection: 'row', marginTop: 15 }}>
                <TypeAddress text='Công ty' check={check} onPress={handleTypeAddressPress} />
                <TypeAddress text='Nhà' check={check} onPress={handleTypeAddressPress} />
                <TypeAddress text='Khác' check={check} onPress={handleTypeAddressPress} />
            </View>

            <View style={{ alignItems: 'center', bottom: -20 }}>
                <Button text='Cập nhật'
                    style={{ width: '90%' }} onPress={() => navigation.navigate('CustomerInformation')} />
                <Button
                    text='Xóa khách hàng'
                    style={{ width: '90%', backgroundColor: '#FFFFFF', borderColor: '#E20B0B', borderWidth: 1, }}
                    styleText={{ color: '#E20B0B', fontWeight: '500' }}
                    onPress={() => navigation.navigate('CustomerInformation')} />
            </View>

        </SafeAreaView >
    )
}

export default React.memo(UpdateAddress1)


