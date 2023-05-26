import React, { useState } from "react";
import { SafeAreaView, View, Text, Image, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Style_Payment from "./style";
import Header from "../../component/Header/index";
import Information from "../../component/Information";
import { Checkbox_2 } from "../../component/Checkbox/index";
import Button from "../../component/Button";

const Payment = () => {
    const navigation = useNavigation();
    const lineWidth = useWindowDimensions().width;

    const [check, setCheck] = useState('Thanh toán bằng Ví VNĐ');

    const handleTypeAddressPress = (type) => {
        setCheck(type);
    };

    return (
        <SafeAreaView style={Style_Payment.container}>
            <Header onPressLeft={() => navigation.goBack()} iconLeft={require('../../assets/Arrow1.png')} text={'Xác nhận thanh toán'} />
            <View style={Style_Payment.container_1}>
                <View style={{ backgroundColor: '#005AA9', width: lineWidth, padding: 10, paddingLeft: 20 }}>
                    <Text style={Style_Payment.text_1}>Đơn hàng: #3434654</Text>
                </View>
            </View>
            <Information
                text_1={'Tổng thanh toán'}
                text_2={'Tổng tiền hàng'}
                text_3={'Tổng phí vận chuyển'}
                price_1={'1,500,000đ'}
                price_2={'1,500,000đ'}
                price_3={'Freeship'}
                style_1={{
                    color: '#005AA9',
                    fontSize: 16,
                    fontWeight: '400'
                }}
                style_4={{
                    fontSize: 16,
                }}
                style_5={{
                    color: '#000000',
                }}
                style_6={{
                    color: '#000000',
                    fontStyle: "italic",
                }}
            />
            <Text style={Style_Payment.text_2}>Chọn phương thức thanh toán</Text>

            <View style={{ flexDirection: "row", marginTop: 15, alignItems: 'center' }}>
                <Image style={Style_Payment.icon_1} source={require('../../assets/imgOder/Rectangle_238.png')} />
                <Text style={Style_Payment.title_1}>Thanh toán bằng ví điện tử</Text>
            </View>

            <View style={{ marginLeft: 45 }}>
                <Checkbox_2 type={'VNĐ'} title={'Thanh toán bằng Ví VNĐ'} onSelected={handleTypeAddressPress} isSelected={check} />
                <Checkbox_2 type={'Point'} title={'Thanh toán bằng Ví điểm'} onSelected={handleTypeAddressPress} isSelected={check} />
                <Checkbox_2 title={'Thanh toán bằng Ví Momo'} img={require('../../assets/imgOder/Momo.png')} onSelected={handleTypeAddressPress} isSelected={check} />
            </View>

            <Checkbox_2 img={require('../../assets/imgOder/Rectangle_239.png')} title={'Thanh toán bằng tiền mặt'} onSelected={handleTypeAddressPress} isSelected={check} />

            <View style={{ flex: 1, paddingLeft: 30, paddingRight: 30, }}>
                <View style={{ flex: 1 }}></View>
                <Button onPress={() => navigation.navigate('SuccPayment')} text={'Xác nhận thanh toán'} />
            </View>
        </SafeAreaView>
    )
};
export default Payment;