import React, { useState } from "react";
import styles from "./styles";
import { SafeAreaView, Text, View, TextInput, Image, TouchableOpacity } from "react-native";
import Header from "../../component/Header";
import InputAddress from "../../component/InputAddress";
import Button from "../../component/Button";
import TypeAddress from "../../component/TypeAddress";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../../global";


const AddAddress = ({ navigation }) => {

    const [check, setCheck] = useState('Công ty');

    const handleTypeAddressPress = (type) => {
        setCheck(type);
    };

    return (
        <SafeAreaView style={styles.container}>

            <Header
                iconLeft={require('../../assets/Arrow1.png')}
                text='Thêm địa chỉ'
                onPressLeft={() => { navigation.goBack() }}
            />

            <Text style={styles.title}>Thông tin liên hệ</Text>

            <InputAddress title='Họ và Tên' />
            <InputAddress title='Số điện thoại' keyboardType='number-pad' />

            <Text style={styles.titleAfter}>Địa chỉ giao hàng</Text>

            <View style={{ marginLeft: 25 }}>
                <TouchableOpacity onPress={() => navigation.navigate('UpdateAddress2')} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 18 }}>
                    <Text style={{ color: '#C4C4C4' }}>Tỉnh/Thành phố, Quận/Huyện, Phường/Xã</Text>
                    <Image source={require('../../assets/vectorRight.png')} />
                </TouchableOpacity>
                <View style={styles.line}></View>
                <TextInput style={{ fontSize: 13 }} placeholderTextColor='#C4C4C4' placeholder="Số nhà, tên đường" />
            </View>

            <Text style={styles.titleAfter}>Loại địa chỉ</Text>

            <View style={{ flexDirection: 'row', marginTop: 15 }}>
                <TypeAddress text='Công ty' check={check} onPress={handleTypeAddressPress} />
                <TypeAddress text='Nhà' check={check} onPress={handleTypeAddressPress} />
                <TypeAddress text='Khác' check={check} onPress={handleTypeAddressPress} />
            </View>

            <View style={{ alignItems: 'center' }}>
                <Button text='Thêm' style={{ width: '90%', top: WINDOW_HEIGHT * 0.1 }} />
            </View>

        </SafeAreaView >
    )
}

export default React.memo(AddAddress)


