import React, { useState } from "react";
import styles from "./styles";
import { SafeAreaView, Text, View, TextInput, Image, TouchableOpacity } from "react-native";
import Header from "../../component/Header";
import InputAddress from "../../component/InputAddress";
import Button from "../../component/Button";
import TypeAddress from "../../component/TypeAddress";

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
                iconRight={require('../../assets/white.png')}
                onPressLeft={() => { navigation.goBack() }}
            />

            <Text style={styles.title}>Thông tin liên hệ</Text>

            <InputAddress title='Họ và Tên' />
            <InputAddress title='Số điện thoại' keyboardType='number-pad' />

            <Text style={styles.titleAfter}>Địa chỉ giao hàng</Text>

            <View style={{ marginLeft: 25 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TextInput style={{ fontSize: 13 }} placeholder="Tỉnh/Thành phố, Quận/Huyện, Phường/Xã" />
                    <TouchableOpacity>
                        <Image source={require('../../assets/vectorRight.png')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.line}></View>
                <TextInput style={{ fontSize: 13 }} placeholder="Số nhà, tên đường" />
            </View>

            <Text style={styles.titleAfter}>Loại địa chỉ</Text>

            <View style={{ flexDirection: 'row', marginTop: 15 }}>
                <TypeAddress text='Công ty' check={check} onPress={handleTypeAddressPress} />
                <TypeAddress text='Nhà' check={check} onPress={handleTypeAddressPress} />
                <TypeAddress text='Khác' check={check} onPress={handleTypeAddressPress} />
            </View>

            <View style={{ alignItems: 'center' }}>
                <Button text='Thêm' style={{ width: '90%', bottom: -140 }} />
            </View>

        </SafeAreaView >
    )
}

export default React.memo(AddAddress)


