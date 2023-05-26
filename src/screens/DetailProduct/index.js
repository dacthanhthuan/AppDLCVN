import React, { useState } from "react";
import { Image, SafeAreaView, Text, TouchableOpacity, View, Dimensions } from "react-native";
import Style_Detail from "./style";
import Button from "../../component/Button";
import Header from "../../component/Header/index";
import Information from "../../component/Information";
import Line from "../../component/Line";
import { Carousel, Pagination } from 'react-native-snap-carousel';
import { formatprice } from "../../global";
// import Carousel from 'react-native-reanimated-carousel';

const DetailProduct = ({route}) => {
    const {item} = route?.params || {};

    // console.log('item :>> ', item);
    const navigation = useNavigation();
    const [quantity, setQuantity] = useState(1);
    const price = formatprice(itemdata.item.price);
    const commission = formatprice(itemdata.item.commission);

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

    const render_item = ({ item }) => {
        return (
            <View>
                <Image style={Style_Detail.imgProduct} source={itemdata.item.source} />
            </View>
        )
    }

    const data = [
        {
            "img": require('../../assets/imgDetail/Rectangle_91.png')
        },
        {
            "img": require('../../assets/Rectangle293.png')
        },
        {
            "img": require('../../assets/dlcsoybean.png')
        },
        {
            "img": require('../../assets/dlcred.png')
        },
    ]
    return (
        <SafeAreaView style={Style_Detail.container}>
            <Header onPressLeft={() => navigation.goBack()} text={'Chi tiết sản phẩm'} iconLeft={require('../../assets/Arrow1.png')} onPressRight={() => navigation.navigate('NoOrders')} iconRight={require('../../assets/Vector.png')} />
            <View style={{ alignItems: "center", marginTop: 15 }}>
                <Carousel
                    data={data}
                    renderItem={render_item}
                    sliderWidth={200}
                    itemWidth={200}
                    firstItem={1}
                    autoplay={true}
                    autoplayDelay={2000}
                    autoplayInterval={2000}
                    loop={true}
                    inactiveSlideScale={0.8}
                />
                <Image style={Style_Detail.imgProduct} source={item.image} />
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
                <Text style={Style_Detail.nameproduct}>{itemdata.item.title}</Text>
                <Text style={Style_Detail.price_1}>{price}</Text>
                <Text style={Style_Detail.text_1}>Giá nhà cung cấp</Text>
            </View>
            <Line />
            <Text style={Style_Detail.title_1}>Thông tin sản phẩm</Text>
            <Information
                text_1={'Giá nhà cung cấp:'}
                text_2={'Giá bán lẻ:'}
                text_3={'Hoa hồng:'}
                price_1={price}
                price_2={'1,763,000đ'}
                price_3={commission}
            />
            <View style={Style_Detail.container_3}>
                <Text style={Style_Detail.title_2}>Giới thiệu sản phẩm</Text>
                <Text style={Style_Detail.text_1}>Sản phẩm dựa trên công nghệ hiện đại, môi trường khép kín. Với tiêu chí “an toàn -  sạch - đẹp”, được sản xuất hoàn toàn từ những nguyên liệu tự nhiên an toàn cho sức khỏe, quy trình làm việc sạch sẽ, đảm bảo an toàn vệ sinh thực phẩm, thiết kế bao bì mẫu mã đẹp mắt.</Text>
            </View>
            <View style={{ flex: 1, justifyContent: "space-between" }}>
                <View></View>
                <View style={Style_Detail.container_7}>
                    <TouchableOpacity onPress={() => navigation.navigate('Cart', { itemdata, quantity })}>
                        <View style={Style_Detail.container_8}>
                            <Image style={Style_Detail.imgCart} source={require('../../assets/imgDetail/Vector.png')} />
                        </View>
                    </TouchableOpacity>
                    <View style={{ flex: 1, paddingLeft: 15, }}>
                        <Button onPress={() => navigation.navigate('Cart', { itemdata, quantity })} text={'Chọn mua'} style={{ marginTop: 0 }} />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default DetailProduct;