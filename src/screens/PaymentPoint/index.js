import React, { useState } from "react";
import { SafeAreaView, View, Text, Image, useWindowDimensions, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Style_Payment from "./style";
import Header from "../../component/Header/index";
import { Checkbox_2 } from "../../component/Checkbox/index";
import Button from "../../component/Button";
import store from "../../redux/store";
import { clearCartPoint } from "../../redux/actions";
import { fetchNewOrder } from "../AddAddress/http";
import { formatpoint } from "../../global";
import { useSelector } from "react-redux";

const PAYMENT_WALLET = 'Thanh toán bằng Ví điểm';

const PaymentPoint = ({ route }) => {

    const { data } = useSelector((state) => state.postReducers)
    const { totalPoint, dataToPass } = route?.params || {};
    const pointWallet = data?.data?.lWallet[1]?.amount;
    console.log(pointWallet);

    const navigation = useNavigation();
    const lineWidth = useWindowDimensions().width;

    const [check, setCheck] = useState(PAYMENT_WALLET);
    console.log('totalPoint:>>', totalPoint);
    console.log('dataTopas:>>', dataToPass);
    console.log(check);


    const handleTypeAddressPress = (type) => {
        setCheck(type);
    };

    const onPressNewOrder = async () => {
        try {
            const response = await fetchNewOrder({
                'toKen': dataToPass?.session_token,
                'shipName': dataToPass?.nameAddress,
                'shipMobile': dataToPass?.mobileAddress,
                'shipAddress': dataToPass?.shipAddress,
                'shipNote': dataToPass?.isNote,
                'LItems': dataToPass?.Items,
                'shipFee': 0,
                'addressBookId': dataToPass?.address_book_id,
                'paymentCashback': pointWallet,
                'paymentCod': 0,
                'paymentWallet': 0,
            })

            console.log('response:>>', response);

            if (response?.message == 'success') {
                navigation.navigate('SuccPayment')
                store.dispatch(clearCartPoint())
            } else {
                Alert.alert('Thông báo', response?.message)
            }

        } catch (error) {
            console.log('Error new order: ', error);
        }
    }

    return (
        <SafeAreaView style={Style_Payment.container}>
            <Header
                onPressLeft={() => navigation.goBack()}
                iconLeft={require('../../assets/Arrow1.png')}
                text={'Xác nhận thanh toán (Điểm)'} />
            <View style={Style_Payment.container_1}>
                <View style={{ backgroundColor: '#005AA9', width: lineWidth, padding: 10, paddingLeft: 20 }}>
                    <Text style={Style_Payment.text_1}>Đơn hàng: #3434654</Text>
                </View>
            </View>

            <View style={Style_Payment.row}>
                <Text style={Style_Payment.textBigColor}>Tổng thanh toán</Text>
                <Text style={Style_Payment.textBig}>{formatpoint(totalPoint)}</Text>
            </View>
            <View style={Style_Payment.row}>
                <Text style={Style_Payment.textDefault}>Tổng tiền hàng</Text>
                <Text style={Style_Payment.textDefault}>{formatpoint(totalPoint)}</Text>
            </View>
            <View style={Style_Payment.row}>
                <Text style={Style_Payment.textDefault}>Tổng phí vận chuyển</Text>
                <Text style={[Style_Payment.textDefault, { fontStyle: 'italic' }]}>Freeship</Text>
            </View>

            <Text style={Style_Payment.text_2}>Chọn phương thức thanh toán</Text>

            <View style={{ flexDirection: "row", marginTop: 15, alignItems: 'center' }}>
                <Image style={Style_Payment.icon_1} source={require('../../assets/imgOder/Rectangle_238.png')} />
                <Text style={Style_Payment.title_1}>Thanh toán bằng ví điện tử</Text>
            </View>

            <View style={{ marginLeft: 45 }}>
                <Checkbox_2 type={'Point'} title={PAYMENT_WALLET} onSelected={handleTypeAddressPress} isSelected={check} />
            </View>

            <View style={{ flex: 1, paddingLeft: 30, paddingRight: 30, }}>
                <View style={{ flex: 1 }}></View>
                <Button
                    onPress={onPressNewOrder}
                    text={'Xác nhận thanh toán'} />
            </View>
        </SafeAreaView>
    )
};
export default PaymentPoint;