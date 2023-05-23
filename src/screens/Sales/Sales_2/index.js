import React from "react";
import { SafeAreaView, View, Text, Image } from "react-native";
import Header from "../../../component/Header/index";
import Dropdown from "../../../component/Dropdown";
import Statistical from "../../../component/Statistical";
import Style_Sales_2 from "./style";

const Sales_2 = () => {
    return (
        <SafeAreaView style={Style_Sales_2.container}>
            <Header onPress={() => navigation.goBack()}
                iconLeft={require('../../../assets/imgSupplier/Arrow_1.png')}
                title={'Hoa hồng doanh số nhóm'} />
            <View style={Style_Sales_2.view_2}>
                <Text style={[Style_Sales_2.text_1, { marginRight: 20 }]}>Lọc kết quả</Text>
                <Dropdown 
                defaultButtonText={'Tuần 50'}
                />
            </View>
            <View style={Style_Sales_2.view_3}>
                <Image style={Style_Sales_2.imgChart} source={require('../../../assets/imgSales/Chart.png')} />
            </View>
            <View style={Style_Sales_2.view_1}>
                <Text style={Style_Sales_2.text_1}>SỐ LIỆU THỐNG KÊ</Text>
            </View>
            <View style={{ marginTop: 15, flexDirection: "row", flexWrap: "wrap", justifyContent: 'space-between' }}>
                <Statistical img={require('../../../assets/imgSales/img_1.png')}
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
                <Statistical img={require('../../../assets/imgSales/img_2.png')}
                    name={'Doanh số nhóm'}
                    pv={'139.31 PV'}
                    style_name={{
                        color: '#F56318',
                        fontSize: 12,
                        fontWeight: '400',
                        width: 80,
                        marginTop: 10,
                    }}
                    style_pv={{
                        color: '#F56318',
                        fontSize: 15,
                    }}
                />
                <Statistical img={require('../../../assets/imgSales/img_3.png')}
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
                <Statistical img={require('../../../assets/imgSales/img_4.png')}
                    name={'Doanh số tuyển dụng'}
                    pv={'100 PV'}
                    style_name={{
                        color: '#A81811',
                        fontSize: 12,
                        fontWeight: '400',
                        width: 80,
                        marginTop: 10,
                    }}
                    style_pv={{
                        color: '#A81811',
                        fontSize: 15,
                    }}
                />
                <Statistical img={require('../../../assets/imgSales/img_5.png')}
                    name={'Tổng nhóm'}
                    pv={'27,290.01 PV'}
                    style_name={{
                        color: '#005AA9',
                        fontSize: 12,
                        fontWeight: '400',
                        width: 80,
                        marginTop: 10,
                    }}
                    style_pv={{
                        color: '#005AA9',
                        fontSize: 15,
                    }}
                />
                <Statistical img={require('../../../assets/imgSales/img_6.png')}
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
            </View>
        </SafeAreaView>
    )
};

export default Sales_2;