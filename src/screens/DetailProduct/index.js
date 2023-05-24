import React, { useState } from "react";
import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import Style_Detail from "./style";
import { useNavigation } from "@react-navigation/native";
import Button from "../../component/Button";
import Header from "../../component/Header/index";
import Information from "../../component/Information";
import Line from "../../component/Line";

const DetailProduct = () => {
    const navigation = useNavigation();
    const [quantity, setQuantity] = useState(1);
    // Tăng số lượng
    const increase = () => {
        setQuantity(quantity + 1);
    };

    // Giảm số lượng
    const reduce = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <SafeAreaView style={Style_Detail.container}>
            <Header onPressLeft={() => navigation.goBack()} text={'Chi tiết tài khoản'} iconLeft={require('../../assets/Arrow1.png')} />
            <View style={{ alignItems: "center", marginTop: 15 }}>
                <Image style={Style_Detail.imgProduct} source={require('../../assets/imgDetail/Rectangle_91.png')} />
                <View style={Style_Detail.container_1}>
                    <TouchableOpacity onPress={reduce}>
                        <Image style={Style_Detail.imgIconMinus} source={require('../../assets/imgDetail/minus.png')} />
                    </TouchableOpacity>
                    <Text style={Style_Detail.textquantity}>{quantity}</Text>
                    <TouchableOpacity onPress={increase}>
                        <Image style={Style_Detail.imgIconPlus} source={require('../../assets/imgDetail/plus.png')} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={Style_Detail.container_2}>
                <Text style={Style_Detail.nameproduct}>Nước rửa chén sinh học True - Bio Natural Dishwashing Liquid</Text>
                <Text style={Style_Detail.price_1}>800,000đ</Text>
                <Text style={Style_Detail.text_1}>Giá nhà cung cấp</Text>
            </View>
            <Line />
            <Text style={Style_Detail.title_1}>Thông tin sản phẩm</Text>
            <Information
                text_1={'Giá nhà cung cấp:'}
                text_2={'Giá bán lẻ:'}
                text_3={'Hoa hồng:'}
                price_1={'800,000đ'}
                price_2={'1,763,000đ'}
                price_3={'500,000đ'}
            />
            <View style={Style_Detail.container_3}>
                <Text style={Style_Detail.title_2}>Giới thiệu sản phẩm</Text>
                <Text style={Style_Detail.text_1}>Sản phẩm dựa trên công nghệ hiện đại, môi trường khép kín. Với tiêu chí “an toàn -  sạch - đẹp”, được sản xuất hoàn toàn từ những nguyên liệu tự nhiên an toàn cho sức khỏe, quy trình làm việc sạch sẽ, đảm bảo an toàn vệ sinh thực phẩm, thiết kế bao bì mẫu mã đẹp mắt.</Text>
            </View>
            <View style={Style_Detail.container_7}>
                <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                    <View style={Style_Detail.container_8}>
                        <Image style={Style_Detail.imgCart} source={require('../../assets/imgDetail/Vector.png')} />
                    </View>
                </TouchableOpacity>
                <View style={{ flex: 1, paddingLeft: 15, }}>
                    <Button onPress={() => navigation.navigate('CreateOrder')} text={'Chọn mua'} style={{ marginTop: 0 }} />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default DetailProduct;