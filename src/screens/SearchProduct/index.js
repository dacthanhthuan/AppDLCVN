import React, { useState, useEffect } from "react";
import styles from "./styles";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import Header from "../../component/Header";
import Input from "../../component/Input";
import CardProduct from "../../component/CardProduct";

const data = [
    {
        id: 1,
        title: "Auslac Lactoferrin (Giá Ưu Đãi)",
        categori: "AUS01",
        price: "1,089,000",
        image: require('../../assets/Rectangle293.png')
    },
    {
        id: 2,
        title: "DLC Soybean Germ Formula",
        categori: "AUS01",
        price: "1,361,000",
        image: require('../../assets/dlcsoybean.png')
    },
    {
        id: 3,
        title: "DLC Red Yeast Rice Formula",
        categori: "AUS01",
        price: "1,089,000",
        image: require('../../assets/dlcred.png')
    },
    {
        id: 4,
        title: "DLC Brazil Green Propolis",
        categori: "AUS01",
        price: "1,361,000",
        image: require('../../assets/dlcbrazil.png')
    },
];

const SearchProduct = ({ navigation }) => {

    const [filteredUser, setFilteredUser] = useState(data);
    const [keywork, setKeywork] = useState('');

    useEffect(() => {
        if (keywork?.length > 0) {
            const filteredItems = data?.filter(rec => rec?.title?.toLocaleLowerCase()?.includes(keywork?.toLocaleLowerCase()))
            setFilteredUser(filteredItems);
        } else {
            setFilteredUser(data);
        }

    }, [keywork])

    return (
        <SafeAreaView style={styles.container}>

            <Header
                iconLeft={require('../../assets/Arrow1.png')}
                text='Tìm kiếm'
                iconRight={require('../../assets/Vector.png')}
                onPressLeft={() => { navigation.goBack() }}
            />

            <Input
                placeholder='Tìm kiếm sản phẩm'
                onChangeText={setKeywork}
                value={keywork} />

            <Text style={{ marginTop: 25, fontSize: 16, color: '#000000', fontWeight: '500' }}>Tìm thấy 25 sản phẩm</Text>

            <FlatList
                data={filteredUser}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => String(item?.id)}
                ListHeaderComponent={(
                    <View style={{ marginTop: 20 }}></View>
                )}
                ListEmptyComponent={(
                    <>
                        <Text style={{ textAlign: 'center' }}>No items found.</Text>
                    </>
                )}
                renderItem={({ item, index }) => {
                    return (
                        <CardProduct
                            style={index % 2 === 0
                                ? { marginLeft: 4, marginRight: 6 }
                                : {}}
                            key={item.id}
                            image={item.image}
                            title={item.title}
                            categori={item.categori}
                            price={item.price} />
                    )
                }}
            />
        </SafeAreaView>
    )
}

export default React.memo(SearchProduct);
