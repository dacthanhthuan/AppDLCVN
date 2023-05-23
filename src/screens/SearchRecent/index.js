import React, { useState, useEffect } from "react";
import styles from "./styles";
import { FlatList, SafeAreaView, Text } from "react-native";
import Header from "../../component/Header";
import Input from "../../component/Input";
import CardRecent from "../../component/CardRecent";

const data = [
    { name: 'Auslac Lactoferrin (Giá Ưu Đãi)' },
    { name: 'DLC Brazil Green Propolis' },
    { name: 'DLC Diamond Lip Balm No.1' },
]

const SearchRecent = ({ navigation }) => {

    const [filteredUser, setFilteredUser] = useState(data);
    const [keywork, setKeywork] = useState('');

    useEffect(() => {
        if (keywork?.length > 0) {
            const filteredItems = data?.filter(rec => rec?.name?.toLocaleLowerCase()?.includes(keywork?.toLocaleLowerCase()))
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
                placeholder='Bạn cần tìm gì'
                onChangeText={setKeywork}
                value={keywork} />

            <Text style={{ marginTop: 25, fontSize: 16, color: '#000000', fontWeight: '500' }}>Đã tìm gần đây</Text>

            <FlatList
                data={filteredUser}
                style={{ marginTop: 15 }}
                renderItem={({ item }) => {
                    return (
                        <CardRecent text={item.name} />
                    )
                }} />

        </SafeAreaView>
    )
}

export default React.memo(SearchRecent);
