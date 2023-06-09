import React from "react";
import { SafeAreaView, View, Text, Image, useWindowDimensions, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../../component/Header/index";
import Style_CreateOrder from "./style";
import data_product from '../../data/products/data'
import Detail_Input from "../../component/Detail_Input";
import Information from "../../component/Information";
import Line from "../../component/Line";
import Button from "../../component/Button";
import { formatprice, WINDOW_WIDTH } from "../../global";

const CreateOrder = ({ route }) => {
    const { item, Isquantity } = route?.params || {};
    const price = formatprice(item.price);
    const totalprice = formatprice(item.price * parseFloat(Isquantity));
    // const commission = formatprice(item.commission);
    const navigation = useNavigation();

    const render_item = ({ }) => {
        return (
            <View style={Style_CreateOrder.flatlist}>
                <Image style={{ width: 60, height: 60 }} source={item.source} />
                <View style={Style_CreateOrder.view_3}>
                    <Text style={Style_CreateOrder.text_1}>{item.title}</Text>
                    <Text style={Style_CreateOrder.text_3}>Giá nhà cung cấp: {price}</Text>
                    <Text style={Style_CreateOrder.text_2}>Giá bán: {price}</Text>
                    <Text style={Style_CreateOrder.text_3}>Số lượng: {Isquantity}</Text>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={Style_CreateOrder.container}>
            <Header onPressLeft={() => navigation.goBack()} iconLeft={require('../../assets/Arrow1.png')} text={'Tạo đơn hàng'} />
            <FlatList
                style={{ width: WINDOW_WIDTH, alignSelf: "center" }}
                data={[item]}
                renderItem={render_item}
                keyExtractor={(item, title) => title.toString()}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={(
                    <View style={Style_CreateOrder.container}>
                        <View style={{ alignItems: "center", marginBottom: 15, }}>
                            <Image style={{ width: WINDOW_WIDTH }} source={require('../../assets/imgOder/Group_203.png')} />
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Image style={Style_CreateOrder.icon} source={require('../../assets/imgOder/Rectangle_225.png')} />
                            <View style={{ width: '90%' }}>
                                <View style={Style_CreateOrder.view_1}>
                                    <Text style={Style_CreateOrder.text_1}>Địa chỉ giao hàng</Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('CustomerInformation')}>
                                        <Text style={Style_CreateOrder.text_2}>Thay đổi</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={Style_CreateOrder.view_2}>
                                    <Text style={Style_CreateOrder.text_2}>Chị Huyên</Text>
                                    <Text style={Style_CreateOrder.text_3}>+ 84864456545</Text>
                                    <Text style={Style_CreateOrder.text_3}>28E Tăng Bạt Hổ, Phường 11, Quận Bình Thạnh, TP.Hồ Chí Minh</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ alignItems: "center", marginTop: 15, marginBottom: 15 }}>
                            <Image style={{ width: WINDOW_WIDTH }} source={require('../../assets/imgOder/Group_203.png')} />
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Image style={Style_CreateOrder.icon} source={require('../../assets/imgOder/Rectangle_232.png')} />
                            <View style={{ width: '90%' }}>
                                <View style={Style_CreateOrder.view_1}>
                                    <Text style={Style_CreateOrder.text_1}>Sản phẩm đặt mua</Text>
                                    <Text style={Style_CreateOrder.text_4}>#3434654</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
                ListFooterComponent={(
                    <View style={Style_CreateOrder.container}>
                        <Line />
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Image style={Style_CreateOrder.icon} source={require('../../assets/imgOder/Rectangle_231.png')} />
                            <View style={{ width: '85%', marginLeft: 20 }}>
                                <Detail_Input style={{ padding: 5, paddingLeft: 15 }} text={'Ghi chú'} placeholder={'Chưa có ghi chú cho đơn hàng này!'} />
                            </View>
                        </View>
                        <Line />
                        <View style={{ flexDirection: "row" }}>
                            <Image style={Style_CreateOrder.icon} source={require('../../assets/imgOder/Rectangle_230.png')} />
                            <View style={{ width: '85%', marginLeft: 20 }}>
                                <Text style={Style_CreateOrder.title_1}>Thông tin sản phẩm</Text>
                                <Information
                                    title_1={'Thông tin cho khách'}
                                    text_1={'Tổng tiền hàng:'}
                                    text_2={'Phí vận chuyển:'}
                                    text_3={'Tổng số tiền cần thanh toán:'}
                                    price_1={totalprice}
                                    price_2={'Freeship'}
                                    price_3={totalprice}
                                    style_5={{
                                        color: '#000000',
                                        fontStyle: "italic",
                                    }}
                                    style_6={{
                                        color: '#005AA9',
                                    }}
                                />
                            </View>
                        </View>
                        <Line />
                        <View style={{ flexDirection: "row" }}>
                            <Image style={Style_CreateOrder.icon} source={require('../../assets/imgOder/Rectangle_230.png')} />
                            <View style={{ width: '85%', marginLeft: 20 }}>
                                <Text style={Style_CreateOrder.title_1}>Thông tin sản phẩm</Text>
                                <Information
                                    title_1={'Thông tin cho bạn'}
                                    text_1={'Tổng giá nhà cung cấp:'}
                                    text_2={'Tổng giá bán của bạn:'}
                                    text_3={'Tổng hoa hồng của bạn:'}
                                    price_1={'800,000đ'}
                                    price_2={'1,500,000đ'}
                                    price_3={'700,000đ'}
                                    style_5={{
                                        color: '#000000',
                                    }}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 1, paddingLeft: 30, paddingRight: 30, marginTop: 70, }}>
                            <Button onPress={() => navigation.navigate('Payment', { totalprice })} text={'Tiến hành thanh toán'} />
                        </View>
                    </View>
                )}
            />
        </SafeAreaView >
    )
}

export default CreateOrder;