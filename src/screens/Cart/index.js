import React, { useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import styles from "./styles";
import ProductCart from "../../component/ProductCart";
import Checkbox from "../../component/Checkbox";
import Button from "../../component/Button";
import { Swipeable } from "react-native-gesture-handler";
import Header from "../../component/Header";


const data = [
    {
        id: 1,
        title: 'Nước rửa chén sinh học True - Bio Natural Dishwashing Liquid',
        price: '206,000',
        image: require('../../assets/Rectangle87.png')
    },
    {
        id: 2,
        title: 'DL12 Probiotic',
        price: '610,000',
        image: require('../../assets/Group135.png'),
    },
]

const Cart = ({ navigation }) => {

    const NotLogin = () => {
        navigation.navigate('NotLogin')
    }
    const [agreed, setAgreed] = useState(false);

    const onCheckboxAll = () => {
        setAgreed(value => !value);
    };


    const clearCard = () => {
        return (
            <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', padding: 12 }}>
                <Image style={{ width: 22, height: 24 }} resizeMode="contain" source={require('../../assets/clearCart.png')} />
            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <Header
                iconLeft={require('../../assets/Arrow1.png')}
                text='Giỏ hàng'
                iconRight={require('../../assets/white.png')}
                onPressLeft={() => { navigation.goBack() }}
            />

            <FlatList
                data={data}
                style={{ marginTop: 35 }}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => {
                    return (
                        <Swipeable renderRightActions={clearCard}>
                            <ProductCart
                                title={item.title}
                                price={item.price}
                                image={item.image}
                                checked={agreed}
                            />
                        </Swipeable>

                    )
                }}
            />

            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Checkbox onPress={onCheckboxAll} checked={agreed} />
                    <Text style={{ fontSize: 14, color: '#000000', marginLeft: 10 }}>Chọn tất cả</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 14, color: '#000000', marginLeft: 10 }}>Tổng giá bán</Text>
                    <Text style={{ fontSize: 16, color: '#000000', marginLeft: 10, fontWeight: '500' }}>2,500,000 đ</Text>
                </View>
            </View>
            <Button text='Tạo đơn' onPress={NotLogin} />

        </SafeAreaView>
    )
}

export default React.memo(Cart);
