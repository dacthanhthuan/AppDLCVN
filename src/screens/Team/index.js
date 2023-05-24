import React, { useState } from "react";
import styles from "./styles";
import { FlatList, SafeAreaView } from "react-native";
import Header from "../../component/Header";
import CardTeam from "../../component/CardTeam";

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

const Team = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <Header
                iconLeft={require('../../assets/Arrow1.png')}
                text='Đội nhóm'
                onPressLeft={()=>{navigation.goBack()}}
            />
            <FlatList
                data={data}
                showsVerticalScrollIndicator={false}
                style={{ marginTop: 25, flex: 1 }}
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

export default React.memo(Team);
