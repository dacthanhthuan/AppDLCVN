import React from "react";
import { SafeAreaView, View, Text, Image, useWindowDimensions, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Style_DetailOrder from "./style";
import Header from "../../component/Header";
import Line from "../../component/Line";
import Information from "../../component/Information";
import Detail_Input from "../../component/Detail_Input";

const DetailOrder = () => {
    const navigation = useNavigation();
    const lineWidth = useWindowDimensions().width;
    return (
        <SafeAreaView style={Style_DetailOrder.container}>
            <Header onPressLeft={() => navigation.goBack()}
                iconLeft={require('../../assets/Arrow1.png')}
                text={'Chi tiết đơn hàng'} />
            <View style={Style_DetailOrder.container_1}>
                <View style={{ backgroundColor: '#005AA9', width: lineWidth, padding: 10, paddingLeft: 20 }}>
                    <Text style={Style_DetailOrder.text_1}>Đơn hàng: #3434654</Text>
                </View>
            </View>
            <View style={{ flexDirection: "row", }}>
                <Image style={Style_DetailOrder.icon} source={require('../../assets/imgOder/Rectangle_226.png')} />
                <View style={{ width: '90%', marginLeft: 15 }}>
                    <View style={Style_DetailOrder.view_1}>
                        <Text style={Style_DetailOrder.text_2}>Người nhận hàng</Text>
                    </View>
                    <View style={Style_DetailOrder.view_2}>
                        <Text style={Style_DetailOrder.text_3}>Chị Huyên</Text>
                        <Text style={Style_DetailOrder.text_4}>+ 84864456545</Text>
                        <Text style={Style_DetailOrder.text_4}>28E Tăng Bạt Hổ, Phường 11, Quận Bình Thạnh, TP.Hồ Chí Minh</Text>
                    </View>
                </View>
            </View>
            <Line />
            <View style={{ flexDirection: "row", }}>
                <Image style={Style_DetailOrder.icon_1} source={require('../../assets/imgOder/Rectangle_230.png')} />
                <View style={{ width: '87%', marginLeft: 20 }}>
                    <Text style={Style_DetailOrder.title_1}>Thông tin cho khách</Text>
                    <Information
                        text_1={'Tổng tiền hàng:'}
                        text_2={'Phí vận chuyển:'}
                        text_3={'Tổng số tiền cần thanh toán:'}
                        price_1={'1,500,000đ'}
                        price_3={'1,500,000đ'}
                        style_6={{
                            color: '#005AA9',
                        }}
                    />
                </View>
            </View>
            <Line />
            <View style={{ flexDirection: "row", }}>
                <Image style={Style_DetailOrder.icon_1} source={require('../../assets/imgOder/Rectangle_230.png')} />
                <View style={{ width: '87%', marginLeft: 20 }}>
                    <Text style={Style_DetailOrder.title_1}>Thông tin cho bạn</Text>
                    <Information
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
            <Line />
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Image style={Style_DetailOrder.icon_1} source={require('../../assets/imgOder/Rectangle_231.png')} />
                <View style={{ width: '85%' }}>
                    <Detail_Input style={{ padding: -15, borderWidth: 0, }} text={'Ghi chú'} placeholder={'Không có ghi chú cho đơn hàng này!'} />
                </View>
            </View>
            <Line />
            <View>
                <View style={{ flexDirection: "row" }}>
                    <Image style={Style_DetailOrder.icon_1} source={require('../../assets/imgOder/Rectangle_232.png')} />
                    <View style={{ width: '93%' }}>
                        <View style={Style_DetailOrder.view_1}>
                            <Text style={Style_DetailOrder.text_2}>Sản phẩm đã mua</Text>
                        </View>
                    </View>
                </View>
                <View style={Style_DetailOrder.flatlist}>
                    <Image source={require('../../assets/imgOder/Rectangle_233.png')} />
                    <View style={Style_DetailOrder.view_3}>
                        <Text style={Style_DetailOrder.text_2}>Nước rửa chén sinh học True - Bio Na...</Text>
                        <Text style={Style_DetailOrder.text_4}>Giá nhà cung cấp: 600,000đ</Text>
                        <Text style={Style_DetailOrder.text_3}>Giá bán: 700,000đ</Text>
                        <Text style={Style_DetailOrder.text_4}>Số lượng: 1</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
};

export default DetailOrder;