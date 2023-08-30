import React, { useState } from "react";
import styles from "./styles";
import { SafeAreaView, Text, View, TextInput, Image, TouchableOpacity, Alert } from "react-native";
import Header from "../../component/Header";
import InputAddress from "../../component/InputAddress";
import Button from "../../component/Button";
import TypeAddress from "../../component/TypeAddress";
import { WINDOW_HEIGHT } from "../../global";
import { useSelector } from "react-redux";
import { fetchAddAddress } from "./http";


const AddAddress = ({ navigation, route }) => {

    const { data } = useSelector((state) => state.postReducers)
    const { itemUpdate } = route?.params || {}
    console.log('itemADDRESS:>>', itemUpdate);
    const [check, setCheck] = useState('Công ty');
    const [fullname, setFullname] = useState('');
    const [number, setNumber] = useState('');
    const [streetName, setStreetName] = useState('');



    const provinceName = itemUpdate?.province?.name ? itemUpdate?.province?.name : '';
    const districtName = itemUpdate?.district?.name ? ' / ' + itemUpdate?.district?.name : '';
    const wardName = itemUpdate?.ward?.name ? ' / ' + itemUpdate?.ward?.name : '';
    const provinceId = itemUpdate?.province?.id;
    const districtId = itemUpdate?.district?.id;
    const wardId = itemUpdate?.ward?.id;

    let textColor = (wardName || districtName || provinceName) !== '' ? '#000000' : '#C2C2C2';

    console.log('fullname:>>', fullname);
    console.log('number:>>', number);
    console.log('streetName:>>', streetName);

    const handleTypeAddressPress = (type) => {
        setCheck(type);
    };

    const onPressAddAddress = async () => {
        if (
            provinceId &&
            districtId &&
            wardId &&
            streetName.trim() !== '' &&
            number.trim() !== '' &&
            fullname.trim() !== ''
        ) {
            try {
                const response = await fetchAddAddress({
                    'toKen': data?.data?.session_token,
                    'cityId': provinceId,
                    'districtId': districtId,
                    'wardId': wardId,
                    'Address': streetName,
                    'Mobile': number,
                    'fullName': fullname
                });

                // Xử lý response nếu cần
                navigation.navigate('CustomerInformation')
                console.log('Add address response:', response);

                // Gọi API thành công, bạn có thể thực hiện các hành động khác ở đây
            } catch (error) {
                // Xử lý lỗi nếu có
                console.log('Error adding address:', error);
            }
        } else {
            Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin địa chỉ');
        }
    }


    return (
        <SafeAreaView style={styles.container}>

            <Header
                iconLeft={require('../../assets/Arrow1.png')}
                text='Thêm địa chỉ'
                onPressLeft={() => { navigation.goBack() }}
            />

            <Text style={styles.title}>Thông tin liên hệ</Text>

            <InputAddress
                title='Họ và Tên'
                value={fullname}
                onChangeText={(text) => setFullname(text)}
            />
            <InputAddress
                title='Số điện thoại'
                keyboardType='number-pad'
                value={number}
                onChangeText={(text) => setNumber(text)} />

            <Text style={styles.titleAfter}>Địa chỉ giao hàng</Text>

            <View style={{ marginLeft: 25 }}>
                <TouchableOpacity
                    style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16, alignItems: 'center' }}
                    onPress={() => navigation.navigate('UpdateAddress2', { previousScreen: 'AddAddress' })} >
                    <Text style={{ color: textColor }}>
                        {wardName || districtName || provinceName ?
                            provinceName + districtName + wardName
                            : 'Tỉnh/Thành phố, Quận/Huyện, Phường/Xã'}
                    </Text>
                    <Image style={styles.icon} source={require('../../assets/vectorRight.png')} />
                </TouchableOpacity>
                <View style={styles.line}></View>
                <TextInput style={{ fontSize: 14, color: '#000000' }}
                    value={streetName}
                    onChangeText={(text) => setStreetName(text)}
                    placeholder="Số nhà, tên đường"
                    placeholderTextColor='#C2C2C2' />
            </View>

            <Text style={styles.titleAfter}>Loại địa chỉ</Text>

            <View style={{ flexDirection: 'row', marginTop: 15 }}>
                <TypeAddress text='Công ty' check={check} onPress={handleTypeAddressPress} />
                <TypeAddress text='Nhà' check={check} onPress={handleTypeAddressPress} />
                <TypeAddress text='Khác' check={check} onPress={handleTypeAddressPress} />
            </View>

            <View style={{ alignItems: 'center' }}>
                <Button text='Thêm' style={{ width: '90%', top: WINDOW_HEIGHT * 0.1 }} onPress={onPressAddAddress} />
            </View>

        </SafeAreaView >
    )
}

export default React.memo(AddAddress)


