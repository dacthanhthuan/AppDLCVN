import React from "react";
import { SafeAreaView, View, Text, Image } from "react-native";
import Header from "../../component/Header";
import Dropdown from "../../component/Dropdown";
import Statistical from "../../component/Statistical";
import Style_OverView from "./style";

const OverView = () => {
    return (
        <SafeAreaView style={Style_OverView.container}>
            <Header onPress={() => navigation.goBack()}
                iconLeft={require('../../assets/imgSupplier/background_white.jpg')}
                title={'Tổng quan'} />
            <View style={Style_OverView.view_2}>
                <Text style={[Style_OverView.text_1, { marginRight: 20 }]}>Lọc kết quả</Text>
                <Dropdown
                    defaultButtonText={'Tuần 30'}
                />
            </View>
            <View style={Style_OverView.view_3}>
                <Image style={Style_OverView.imgChart} source={require('../../assets/imgSales/Chart.png')} />
            </View>
            <View style={Style_OverView.view_1}>
                <Text style={Style_OverView.text_1}>SỐ LIỆU THỐNG KÊ</Text>
            </View>
            <View style={Style_OverView.view_statistics}>
                <Statistical img={require('../../assets/imgSales/img_1.png')}
                    name={'Doanh số cá nhân'}
                    pv={'366 PV'}
                    style_name={{
                        color: '#09355C',
                        fontSize: 12,
                        fontWeight: '400',
                        width: 80,
                        marginTop: 10,
                    }}
                    style_pv={{
                        color: '#09355C',
                        fontSize: 15,
                    }}
                />
                <Statistical img={require('../../assets/imgSales/img_3.png')}
                    name={'Doanh số tổng'}
                    pv={'505.31 PV'}
                    style_name={{
                        color: '#9FA811',
                        fontSize: 12,
                        fontWeight: '400',
                        width: 70,
                        marginTop: 10,
                    }}
                    style_pv={{
                        color: '#9FA811',
                        fontSize: 15,
                    }}
                />
                <Statistical img={require('../../assets/imgSales/img_6.png')}
                    name={'Manager'}
                    pv={'100 PV'}
                    style_name={{
                        color: '#5C3800',
                        fontSize: 12,
                        fontWeight: '400',
                        width: 80,
                        marginTop: 10,
                    }}
                    style_pv={{
                        color: '#5C3800',
                        fontSize: 15,
                    }}
                />
                <Statistical img={require('../../assets/imgSales/img_11.png')}
                    name={'Doanh số tuyển dụng'}
                    pv={'0 PV'}
                    style_name={{
                        color: '#7668A8',
                        fontSize: 12,
                        fontWeight: '400',
                        width: 80,
                        marginTop: 10,
                    }}
                    style_pv={{
                        color: '#7668A8',
                        fontSize: 15,
                    }}
                />
            </View>
        </SafeAreaView>
    )
};

export default OverView;