import React, { useState } from "react";
import { SafeAreaView, View, Text, Image, useWindowDimensions, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Style_Payment from "./style";
import Header from "../../component/Header/index";
import Information from "../../component/Information";
import { Checkbox_2 } from "../../component/Checkbox/index";
import Button from "../../component/Button";
import { formatprice } from "../../global";
import store from "../../redux/store";
import { clearCart } from "../../redux/actions";
import { fetchNewOrder } from "../AddAddress/http";
import { useSelector } from "react-redux";

const PAYMENT_CASHBACK = 'Thanh toán bằng Ví VNĐ';
const PAYMENT_WALLET = 'Thanh toán bằng Ví điểm';
const PAYMENT_COD = 'Thanh toán bằng tiền mặt';

const Payment = ({ route }) => {

    const { totalprice, dataToPass } = route?.params || {};
    // console.log('totalprice:>>', totalprice);
    // console.log('dataToPass:>>', dataToPass);
    const { data } = useSelector((state) => state.postReducers)

    const moneyWallet = data?.data?.lWallet[0]?.amount; // Ví VND
    const pointWallet = data?.data?.lWallet[1]?.amount; // Ví điểm 

    const navigation = useNavigation();
    const lineWidth = useWindowDimensions().width;

    const [check, setCheck] = useState(PAYMENT_CASHBACK);
    console.log(check);


    const handleTypeAddressPress = (type) => {
        setCheck(type);
    };


    const onPressNewOrder = async () => {
        try {
            let paymentCashback = 0;
            let paymentCod = 0;
            let paymentWallet = 0;

            if (check === PAYMENT_CASHBACK) {
                if (moneyWallet < totalprice) {
                    Alert.alert('Thông báo', 'Số dư của ví VNĐ không đủ')
                    return;
                }
                else {
                    paymentWallet = totalprice;
                }
            } else if (check === PAYMENT_WALLET) {
                paymentWallet = totalprice;
                if (pointWallet < totalprice) {
                    Alert.alert('Thông báo', 'Số dư của ví điểm không đủ')
                    return;
                }
                else {
                    paymentCashback = totalprice;
                }
            } else if (check === PAYMENT_COD) {
                paymentCod = totalprice;
            }

            const response = await fetchNewOrder({
                'toKen': dataToPass?.session_token,
                'shipName': dataToPass?.nameAddress,
                'shipMobile': dataToPass?.mobileAddress,
                'shipAddress': dataToPass?.shipAddress,
                'shipNote': dataToPass?.isNote,
                'LItems': dataToPass?.Items,
                'shipFee': 0,
                'addressBookId': dataToPass?.address_book_id,
                'paymentCashback': paymentCashback,
                'paymentCod': paymentCod,
                'paymentWallet': paymentWallet,
            })

            console.log('response:>>', response);
            if (response?.message == 'success') {
                navigation.navigate('SuccPayment')
                store.dispatch(clearCart())
            } else {
                Alert.alert('Thông báo', response?.message)
            }
        } catch (error) {
            console.log('Error new order: ', error);
        }
    }


    // format tổng tiền bên createOrder truyền qua
    const totalPrice = formatprice(totalprice)

    return (
        <SafeAreaView style={Style_Payment.container}>
            <Header onPressLeft={() => navigation.goBack()} iconLeft={require('../../assets/Arrow1.png')} text={'Xác nhận thanh toán'} />
            <View style={Style_Payment.container_1}>
                <View style={{ backgroundColor: '#005AA9', width: lineWidth, padding: 10, paddingLeft: 20 }}>
                    <Text style={Style_Payment.text_1}>Đơn hàng: #3434654</Text>
                </View>
            </View>

            <View style={Style_Payment.row}>
                <Text style={Style_Payment.textBigColor}>Tổng thanh toán</Text>
                <Text style={Style_Payment.textBig}>{totalPrice}</Text>
            </View>
            <View style={Style_Payment.row}>
                <Text style={Style_Payment.textDefault}>Tổng tiền hàng</Text>
                <Text style={Style_Payment.textDefault}>{totalPrice}</Text>
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
                <Checkbox_2 type={'VNĐ'} title={PAYMENT_CASHBACK} onSelected={handleTypeAddressPress} isSelected={check} />
                <Checkbox_2 type={'Point'} title={PAYMENT_WALLET} onSelected={handleTypeAddressPress} isSelected={check} />
            </View>
            <Checkbox_2
                styleTitle={{
                    fontWeight: '400',
                    alignSelf: 'center',
                }}
                styleImg={{
                    width: 31,
                    height: 31,
                }}
                img={require('../../assets/imgOder/Rectangle_239.png')}
                title={PAYMENT_COD}
                onSelected={handleTypeAddressPress}
                isSelected={check} />
            <View style={{ flex: 1, paddingLeft: 30, paddingRight: 30, }}>
                <View style={{ flex: 1 }}></View>
                <Button
                    onPress={onPressNewOrder}
                    text={'Xác nhận thanh toán'} />
            </View>
        </SafeAreaView>
    )
};
export default Payment;