import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity, View, Text, FlatList } from "react-native";
import styles from "./styles";
import Header from "../../component/Header";
import CardDistributor from "../../component/CardDistributor";
import PurchaseHistory from "../../component/PurchaseHistory";
import CardTeamThree from "../../component/CardTeamThree";
import CardPV from "../../component/CardPV";

const listTab = [
    { status: 'Nhà phân phối' },
    { status: 'Doanh số' },
    { status: 'Lịch sử mua hàng' },
];
const sales = [
    {
        image: require('../../assets/member3.png'),     
        name: 'Nguyễn Thị Nguyệt',
        phone: '086184000239',
        pv: '101.20'
    },
    {
        image: require('../../assets/member2.png'),
        name: 'Lê Thị Bé Hai',
        phone: '086184000239',
        pv: '101.20'
    },
    {
        image: require('../../assets/member1.png'),
        name: 'Nguyễn Văn Long',
        phone: '086184000239',
        pv: '101.20'
    },
    {
        image: require('../../assets/member.png'),
        name: 'Lê Thị Na',
        phone: '086184000239',
        pv: '101.20'
    },
];

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

const purchaseHistory = [
    {
        name: 'Nguyễn Thị Nguyệt',
        phone: '086184000239',
        md: '13u2498',
        dateTime: '01/11/2022   12:34',
        pv: '101.20',
        money: '1.500.000'
    }
]

const TeamThree = ({navigation}) => {
    const [status, setStatus] = useState('Nhà phân phối');

    const setStatusFilter = status => {
        setStatus(status);
    };

    // Render different interfaces based on the selected status
    const renderContent = () => {
        switch (status) {
            case 'Nhà phân phối':
                return (
                    <FlatList
                        data={data}
                        showsVerticalScrollIndicator={false}
                        style={{ marginTop: 25 }}
                        renderItem={({ item }) => {
                            return (
                                <CardDistributor
                                    name={item.name}
                                    phone={item.phone}
                                />
                            )
                        }}
                    />
                )
            case 'Doanh số':

                return (
                    <FlatList
                        data={sales}
                        style={{ marginTop: 25, flex: 1 }}
                        ListHeaderComponent={(
                            <>
                                <View style={{ width: '100%', margin: 1, flexDirection: 'row', justifyContent: "space-between", flexWrap: 'wrap', }}>
                                    <CardPV
                                        image={require('../../assets/pv1.png')}
                                        name='Doanh số cá nhân'
                                        pv='366'
                                        style={{ color: '#09355C' }}
                                    />
                                    <CardPV
                                        image={require('../../assets/pv2.png')}
                                        name='Doanh số cá nhân'
                                        pv='366'
                                        style={{ color: '#F56318' }}
                                    />
                                    <CardPV
                                        image={require('../../assets/pv3.png')}
                                        name='Doanh số cá nhân'
                                        pv='366'
                                        style={{ color: '#9FA811' }}
                                    />
                                    <CardPV
                                        image={require('../../assets/pv4.png')}
                                        name='Doanh số cá nhân'
                                        pv='366'
                                        style={{ color: '#A81811' }}
                                    />
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 12 }}>
                                    <Text style={{ fontSize: 15, color: '#000000' }}>CHI TIẾT DOANH SỐ</Text>
                                    <Text style={{ fontSize: 15, color: '#005AA9' }}>Tầng 1</Text>
                                </View>
                            </>
                        )}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => {
                            return (
                                <CardTeamThree
                                    image={item.image}
                                    name={item.name}
                                    phone={item.phone}
                                    pv={item.pv}
                                />
                            )
                        }} />
                )
            case 'Lịch sử mua hàng':
                return (
                    <FlatList
                        data={purchaseHistory}
                        showsVerticalScrollIndicator={false}
                        style={{ marginTop: 25 }}
                        renderItem={({ item }) => {
                            return (
                                <PurchaseHistory
                                    name={item.name}
                                    phone={item.phone}
                                    dateTime={item.dateTime}
                                    md={item.md}
                                    pv={item.pv}
                                    money={item.money} />
                            )
                        }}
                    />
                )
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={styles.container}>

            <Header
                iconLeft={require('../../assets/Arrow1.png')}
                text='Đội nhóm'
                iconRight={require('../../assets/white.png')}
                onPressLeft={()=>{navigation.goBack()}}
            />

            <View style={styles.listTab}>
                {listTab.map(e => (
                    <TouchableOpacity
                        style={[styles.btnTab, status === e.status ? styles.btnTabActive : null]}
                        onPress={() => setStatusFilter(e.status)}
                        key={e.status}
                    >
                        <Text style={[styles.textTab, status === e.status ? styles.textTabActive : null]}>
                            {e.status}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {renderContent()}

        </SafeAreaView>
    );
};

export default React.memo(TeamThree);
