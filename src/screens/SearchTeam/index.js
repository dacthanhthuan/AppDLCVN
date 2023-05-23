import React, { useState, useEffect } from "react";
import styles from "./styles";
import { FlatList, SafeAreaView } from "react-native";
import Header from "../../component/Header";
import CardTeam from "../../component/CardTeam";
import Input from "../../component/Input";

const data = [
    {
        name: 'Thanh Thuận',
        phone: '84 839 020 007'
    },
    {
        name: 'Mai Phạm Công Bằng',
        phone: '84 839 020 007'
    },
    {
        name: ' Nguyễn Văn Nhi',
        phone: '84 839 020 007'
    },
    {
        name: 'Huỳnh Điền Huy',
        phone: '84 839 020 007'
    },
    {
        name: 'Lê Tự Thụy',
        phone: '84 839 020 007'
    },
    {
        name: 'Lê Thị Thắm',
        phone: '84 839 020 007'
    },
    {
        name: 'Triệu Gia Bảo',
        phone: '84 839 020 007'
    },
    {
        name: 'Triệu Gia Bảo',
        phone: '84 839 020 007'
    },
    {
        name: 'Triệu Gia Bảo',
        phone: '84 839 020 007'
    },
    {
        name: 'Triệu Gia Bảo',
        phone: '84 839 020 007'
    },
    {
        name: 'Triệu Gia Bảo',
        phone: '84 839 020 007'
    },
];

const SearchTeam = ({navigation}) => {

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
                text='Đội nhóm'
                iconRight={require('../../assets/white.png')}
                onPressLeft={()=>{navigation.goBack()}}
            />

            <Input
                placeholder='Tìm kiếm thành viên'
                onChangeText={setKeywork}
                value={keywork} />

            <FlatList
                data={filteredUser}
                showsVerticalScrollIndicator={false}
                style={{ marginTop: 16, flex: 1 }}
                renderItem={({ item }) => {
                    return (
                        <CardTeam
                            name={item.name}
                            phone={item.phone}
                        />
                    )
                }} />
        </SafeAreaView>
    )
}

export default React.memo(SearchTeam);
