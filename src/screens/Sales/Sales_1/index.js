import React from "react";
import { SafeAreaView, View, Text, FlatList } from "react-native";
import Style_Sales from "./style";
import Header from "../../../component/Header/index";
import Dropdown from "../../../component/Dropdown";
import Statistical from "../../../component/Statistical";
import data_sales from "../../../data/data_sales";
import CardTeamThree from "../../../component/CardTeamThree";

const Sales = () => {
    const render_item = ({ item }) => {
        return (
            <View style={{ marginTop: 10 }}>
                <CardTeamThree
                    image={item.image}
                    name={item.name}
                    phone={item.phone}
                    pv={item.pv}
                />
            </View>
        )
    };
    return (
        <SafeAreaView style={Style_Sales.container}>
            <Header onPress={() => navigation.goBack()}
                iconLeft={require('../../../assets/imgSupplier/Arrow_1.png')}
                title={'Hoa hồng doanh số nhóm'} />
            <FlatList
                showsVerticalScrollIndicator={false}
                data={data_sales}
                ListHeaderComponent={(
                    <View style={{ marginTop: 10 }}>
                        <View style={Style_Sales.view_1}>
                            <Text style={Style_Sales.text_1}>SỐ LIỆU THỐNG KÊ</Text>
                            <Dropdown
                                defaultButtonText={'Tuần 50'}
                            />
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
                        <View style={Style_Sales.view_1}>
                            <Text style={Style_Sales.text_1}>CHI TIẾT HOA HỒNG</Text>
                            <Dropdown
                                buttonStyle={{
                                    borderWidth: 0,
                                }}
                                defaultButtonText={'DS cá nhân'}
                                buttonTextStyle={{
                                    color: '#005AA9',
                                    fontWeight: '300'
                                }}
                                style_img={{
                                    marginLeft: 10
                                }}
                            />
                        </View>
                    </View>
                )}
                renderItem={render_item}
            />
        </SafeAreaView>
    )
};

export default Sales;