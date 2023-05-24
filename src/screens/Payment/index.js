import React, { useState } from "react";
import { SafeAreaView, View, Text, Image, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Style_Payment from "./style";
import Header from "../../component/Header/index";
import Information from "../../component/Information";
import Checkbox_2 from "../../component/Checkbox";
import Button from "../../component/Button";

const Payment = () => {
    const navigation = useNavigation();
    const lineWidth = useWindowDimensions().width;
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
            <View style={{ flexDirection: "row", padding: 15 }}>
                <Image style={Style_Payment.icon_1} source={require('../../assets/imgOder/Rectangle_238.png')} />
                <View style={{ width: '87%', marginLeft: 20 }}>
                    <Text style={Style_Payment.title_1}>Thanh toán bằng ví điện tử</Text>
                    <View style={{ marginTop: 10 }}>
                        <View style={Style_Payment.viewpayment}>
                            <View style={{ flexDirection: "row" }}>
                                <View style={Style_Payment.viewborder}><Text style={Style_Payment.text_3}>VNĐ</Text></View>
                                <Text style={Style_Payment.text_4}>Thanh toán bằng Ví VNĐ</Text>
                            </View>
                            <Checkbox_2 />
                        </View>
                        <View style={Style_Payment.viewpayment}>
                            <View style={{ flexDirection: "row" }}>
                                <View style={Style_Payment.viewborder}><Text style={Style_Payment.text_3}>Point</Text></View>
                                <Text style={Style_Payment.text_4}>Thanh toán bằng Ví điểm</Text>
                            </View>
                            <Checkbox_2 />
                        </View>
                        <View style={Style_Payment.viewpayment}>
                            <View style={{ flexDirection: "row", }}>
                                <Image style={Style_Payment.icon_2} source={require('../../assets/imgOder/Momo.png')} />
                                <Text style={Style_Payment.text_4}>Thanh toán bằng Ví Momo</Text>
                            </View>
                            <Checkbox_2 />
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ padding: 15, flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>
                <View style={{ flexDirection: "row", width: '94%', }}>
                    <Image style={Style_Payment.icon_1} source={require('../../assets/imgOder/Rectangle_239.png')} />
                    <Text style={[Style_Payment.title_1, { marginLeft: 20 }]}>Thanh toán bằng Ví Momo</Text>
                </View>
                <Checkbox_2 />
            </View>
            <View style={{ flex: 1, paddingLeft: 30, paddingRight: 30, }}>
                <View style={{ flex: 1 }}></View>
                <Button onPress={() => navigation.navigate('SuccPayment')} text={'Xác nhận thanh toán'} />
            </View>
        </SafeAreaView>
    )
};

export default Payment;