import React, { useState } from "react";
import { SafeAreaView, View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../../component/Header/index";
import Style_CreateOrder from "./style";
import Detail_Input from "../../component/Detail_Input";
import Information from "../../component/Information";
import Line from "../../component/Line";
import Button from "../../component/Button";
import { formatpoint, WINDOW_WIDTH } from "../../global";
import { useSelector } from "react-redux";
import store from "../../redux/store";
import { cleardeliveryAddress } from "../../redux/actions";

const CreateOrderPoint = ({ route }) => {
    const { data, subAddress } = useSelector((state) => state.postReducers)

    // Lấy dữ liệu bên cart và CustomerInformation truyền qua.
    const { cartItemsPoint, totalPoint, deliveryAddress, dataProductPoint, returnTotalPoint, returnCommision } = route?.params || {};

    const navigation = useNavigation();


    let commission = 0;
    // Lấy ra phần trăm hoa hồng hoa hồng
    cartItemsPoint?.forEach((item) => {
        commission += parseInt(item?.productData?.decrement);
        return commission;
    })

    const [isNote, setIsNote] = useState('');

    // Dữ liệu sau khi chọn địa chỉ giao hàng
    const deliveryName = deliveryAddress?.fullname;
    const deliveryMobile = deliveryAddress?.mobile;
    const deliveryCity = deliveryAddress?.city;
    const deliveryDistrict = deliveryAddress?.district;
    const deliveryWard = deliveryAddress?.ward;
    const deliveryRoad = deliveryAddress?.address;
    const deliveryId = deliveryAddress?.id;

    // dữ liệu lấy address default từ trong user
    const session_token = data?.data?.session_token;
    const nameAddress = deliveryName ? deliveryName : data?.data?.address_default?.fullname;
    const mobileAddress = deliveryMobile ? deliveryMobile : data?.data?.address_default?.mobile;
    const address = deliveryRoad ? deliveryRoad : data?.data?.address_default?.address;
    const wardAddress = deliveryWard ? deliveryWard : data?.data?.address_default?.ward;
    const districtAddress = deliveryDistrict ? deliveryDistrict : data?.data?.address_default?.district;
    const cityAddress = deliveryCity ? deliveryCity : data?.data?.address_default?.city;
    const shipAddress = address + ', ' + wardAddress + ', ' + districtAddress + ', ' + cityAddress;
    const address_book_id = deliveryId ? deliveryId : data?.data?.address_default?.id;

    let TOTAL_POINT = returnTotalPoint ? returnTotalPoint : totalPoint;
    let DATA_POINT = dataProductPoint ? dataProductPoint : cartItemsPoint;
    let COMMISSION = returnCommision ? returnCommision : commission;

    // Dữ liệu địa chỉ để hiện ra (FINAL)
    let finalId = subAddress !== null ? subAddress?.id : address_book_id;
    let finalName = subAddress !== null ? subAddress?.fullname : nameAddress;
    let finalMobile = subAddress !== null ? subAddress?.mobile : mobileAddress;
    let finalAddress = subAddress !== null ? subAddress?.address + ', ' + subAddress?.ward + ', ' + subAddress?.district + ', ' + subAddress?.city : shipAddress;

    const render_item_Point = ({ item }) => {
        const overview = item?.productData;
        const point = overview?.price
        return (
            <View style={Style_CreateOrder.flatlist}>
                <Image style={Style_CreateOrder.image} source={{ uri: overview?.image ? overview?.image : overview?.img_1 }} />
                <View style={Style_CreateOrder.view_3}>
                    <Text style={Style_CreateOrder.text_1}>{overview?.product_name}</Text>
                    <Text style={Style_CreateOrder.text_3}>Giá nhà cung cấp: {formatpoint(point)}</Text>
                    <Text style={Style_CreateOrder.text_3}>Số lượng: {item?.quantity}</Text>
                </View>
            </View>
        );
    };

    const Items = [];

    DATA_POINT?.forEach((item) => {
        Items.push({
            unique_id: item?.productData?.unique_id,
            product_id: item?.productData?.product_id,
            amount: item?.quantity,
            price: item?.productData?.price,
            decrement: item?.productData?.decrement,
        });
    });

    // Gộp dữ liệu vào một object để truyền qua screen Payment
    const dataToPass = {
        session_token: session_token,
        nameAddress: finalName,
        mobileAddress: finalMobile,
        shipAddress: finalAddress,
        isNote: isNote,
        Items: Items,
        address_book_id: finalId,
    };

    console.log(dataToPass);

    return (
        <SafeAreaView style={Style_CreateOrder.container}>
            <Header onPressLeft={() => navigation.goBack()} iconLeft={require('../../assets/Arrow1.png')} text={'Tạo đơn hàng'} />
            <FlatList
                style={{ width: WINDOW_WIDTH, alignSelf: "center" }}
                data={DATA_POINT}
                renderItem={render_item_Point}
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
                                    <TouchableOpacity onPress={() => {
                                        navigation.navigate('CustomerInformation', { previouscreen: 'CreateOrderPoint', TOTAL_POINT, DATA_POINT, deliveryAddress, COMMISSION })
                                    }}>
                                        <Text style={Style_CreateOrder.text_2}>Thay đổi</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={Style_CreateOrder.view_2}>
                                    <Text style={Style_CreateOrder.text_2}>{finalName}</Text>
                                    <Text style={Style_CreateOrder.text_3}>{finalMobile}</Text>
                                    <Text style={Style_CreateOrder.text_3}>{finalAddress}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ alignItems: "center", marginVertical: 15 }}>
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
                                <Detail_Input
                                    style={{ padding: 5, paddingLeft: 15 }}
                                    text={'Ghi chú'}
                                    placeholder={'Chưa có ghi chú cho đơn hàng này!'}
                                    value={isNote}
                                    onChangeText={(text) => setIsNote(text)}
                                />
                            </View>
                        </View>

                        <Information title='Thông tin cho khách'
                            textOne='Tổng tiền hàng:' textTwo='Phí vận chuyển:' textThree='Tổng số tiền cần thanh toán:'
                            valueOne={formatpoint(TOTAL_POINT)} valueTwo='Free Ship' valueThree={formatpoint(TOTAL_POINT)} />
                        <Information title='Thông tin cho bạn'
                            textOne='Tổng giá nhà cung cấp:' textTwo='Tổng giá bán của bạn:' textThree='Tổng hoa hồng của bạn:'
                            valueOne={formatpoint(TOTAL_POINT)} valueTwo='Free Ship' valueThree={formatpoint(TOTAL_POINT * COMMISSION / 100)} />


                        <View style={{ flex: 1, paddingLeft: 30, paddingRight: 30, marginTop: 20, }}>
                            <Button onPress={() => navigation.navigate('PaymentPoint', { totalPoint: TOTAL_POINT, dataToPass })} text={'Tiến hành thanh toán'} />
                        </View>
                    </View>
                )}
            />
        </SafeAreaView >
    )
}

export default CreateOrderPoint;