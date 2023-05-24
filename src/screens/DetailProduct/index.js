import React from "react";
import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import Style_Detail from "./style";
import { useNavigation } from "@react-navigation/native";
import Button from "../../component/Button";
import Header from "../../component/Header";
import Information from "../../component/Information";
import Line from "../../component/Line";

const DetailProduct = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={Style_Detail.container}>

            <Header iconLeft={require('../../assets/imgSupplier/Arrow_1.png')} title={'Chi tiêt sản phẩm'} />
            <View style={{ alignItems: "center", marginTop: 15 }}>
                <Image style={Style_Detail.imgProduct} source={require('../../assets/imgDetail/Rectangle_91.png')} />
                <View style={Style_Detail.container_1}>
                    <TouchableOpacity>
                        <Image style={Style_Detail.imgIconMinus} source={require('../../assets/imgDetail/minus.png')} />
                    </TouchableOpacity>
                    <Text style={Style_Detail.textquantity}>1</Text>
                    <TouchableOpacity>
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
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <View style={Style_Detail.container_8}>
                        <Image style={Style_Detail.imgCart} source={require('../../assets/imgDetail/Vector.png')} />
                    </View>
                </TouchableOpacity>
                <View style={{ flex: 1, paddingLeft: 15, }}>
                    <Button text={'Chọn mua'} />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default DetailProduct;