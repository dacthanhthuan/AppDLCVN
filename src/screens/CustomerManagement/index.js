import React, { useEffect, useState } from "react";
import styles from "./styles";
import { SafeAreaView, View } from "react-native";
import Header from "../../component/Header";
import Input from "../../component/Input";
import CardManager from "../../component/CardManager";
import Button from "../../component/Button";
import { FlatList } from "react-native-gesture-handler";

const data = [
    {
        name: 'Chị Huyền',
        address: '256 Bạch Đằng, Phường 24, Q. Bình Thạnh, TPHCM',
        phone: '84 839 020 007'
    },
    {
        name: 'Chị Mai',
        address: '256 Bạch Đằng, Phường 24, Q. Bình Thạnh, TPHCM',
        phone: '84 839 020 007'
    },


]

const CustomerManagement = ({navigation}) => {

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
            <>
                <Header
                    iconLeft={require('../../assets/Arrow1.png')}
                    text='Quản lý khách hàng'
                    onPressLeft={()=>{navigation.goBack()}}
                />
                <Input
                    placeholder='Tìm khách hàng'
                    value={keywork}
                    onChangeText={setKeywork}
                />
            </>

            <FlatList
                data={filteredUser}
                style={{ marginTop: 25, flex: 1 }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                    return (
                        <CardManager
                            name={item.name}
                            address={item.address}
                            phone={item.phone}
                        />
                    )
                }}

            />
            <View style={{alignItems: 'center'}}>
            <Button style={{ bottom: -35, width: '85%' }} text='Thêm khách hàng mới' />
            </View>

        </SafeAreaView>
    )
}

export default React.memo(CustomerManagement)


