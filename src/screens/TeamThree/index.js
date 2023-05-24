import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity, View, Text, FlatList, Image } from "react-native";
import styles from "./styles";
import Header from "../../component/Header";
import CardDistributor from "../../component/CardDistributor";
import PurchaseHistory from "../../component/PurchaseHistory";
import CardTeamThree from "../../component/CardTeamThree";
import CardPV from "../../component/CardPV";
import Style_Sales_2 from "../Sales/Sales_2/style";
import Statistical from "../../component/Statistical";

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

const TeamThree = ({ navigation }) => {
    const [status, setStatus] = useState('Doanh số');

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
                    <View>
                        <View style={Style_Sales_2.view_3}>
                            <Image style={Style_Sales_2.imgChart} source={require('../../assets/imgSales/Chart.png')} />
                        </View>
                        <View style={Style_Sales_2.view_1}>
                            <Text style={Style_Sales_2.text_1}>SỐ LIỆU THỐNG KÊ</Text>
                        </View>
                        <View style={{ marginTop: 15, flexDirection: "row", flexWrap: "wrap", justifyContent: 'space-between' }}>
                            <Statistical
                                onPress={() => navigation.navigate('TeamThree')}
                                img={require('../../assets/imgSales/img_1.png')}
                                name={'Doanh số cá nhân'}
                                pv={'366 PV'}
                                style_name={{
                                    color: '#09355C',
                                    fontSize: 12,
                                    fontWeight: '400',
                                    width: 80,
                                    marginTop: 10,
                                }}
                                style_pv={{
                                    color: '#09355C',
                                    fontSize: 15,
                                }}
                            />
                            <Statistical
                                onPress={() => navigation.navigate('TeamThree')}
                                img={require('../../assets/imgSales/img_2.png')}
                                name={'Doanh số nhóm'}
                                pv={'139.31 PV'}
                                style_name={{
                                    color: '#F56318',
                                    fontSize: 12,
                                    fontWeight: '400',
                                    width: 80,
                                    marginTop: 10,
                                }}
                                style_pv={{
                                    color: '#F56318',
                                    fontSize: 15,
                                }}
                            />
                            <Statistical
                                onPress={() => navigation.navigate('TeamThree')}
                                img={require('../../assets/imgSales/img_3.png')}
                                name={'Doanh số tổng'}
                                pv={'505.31 PV'}
                                style_name={{
                                    color: '#9FA811',
                                    fontSize: 12,
                                    fontWeight: '400',
                                    width: 70,
                                    marginTop: 10,
                                }}
                                style_pv={{
                                    color: '#9FA811',
                                    fontSize: 15,
                                }}
                            />
                            <Statistical
                                onPress={() => navigation.navigate('TeamThree')}
                                img={require('../../assets/imgSales/img_4.png')}
                                name={'Doanh số tuyển dụng'}
                                pv={'100 PV'}
                                style_name={{
                                    color: '#A81811',
                                    fontSize: 12,
                                    fontWeight: '400',
                                    width: 80,
                                    marginTop: 10,
                                }}
                                style_pv={{
                                    color: '#A81811',
                                    fontSize: 15,
                                }}
                            />
                            <Statistical
                                onPress={() => navigation.navigate('TeamThree')}
                                img={require('../../assets/imgSales/img_5.png')}
                                name={'Tổng nhóm'}
                                pv={'27,290.01 PV'}
                                style_name={{
                                    color: '#005AA9',
                                    fontSize: 12,
                                    fontWeight: '400',
                                    width: 80,
                                    marginTop: 10,
                                }}
                                style_pv={{
                                    color: '#005AA9',
                                    fontSize: 15,
                                }}
                            />
                            <Statistical
                                onPress={() => navigation.navigate('TeamThree')}
                                img={require('../../assets/imgSales/img_6.png')}
                                name={'Manager'}
                                pv={'100 PV'}
                                style_name={{
                                    color: '#5C3800',
                                    fontSize: 12,
                                    fontWeight: '400',
                                    width: 80,
                                    marginTop: 10,
                                }}
                                style_pv={{
                                    color: '#5C3800',
                                    fontSize: 15,
                                }}
                            />
                        </View>
                    </View>
                    // <FlatList
                    //     data={sales}
                    //     style={{ marginTop: 25, flex: 1 }}
                    //     ListHeaderComponent={(
                    //         <>
                    //             <View style={{ width: '100%', margin: 1, flexDirection: 'row', justifyContent: "space-between", flexWrap: 'wrap', }}>
                    //                 <CardPV
                    //                     image={require('../../assets/pv1.png')}
                    //                     name='Doanh số cá nhân'
                    //                     pv='366'
                    //                     style={{ color: '#09355C' }}
                    //                 />
                    //                 <CardPV
                    //                     image={require('../../assets/pv2.png')}
                    //                     name='Doanh số cá nhân'
                    //                     pv='366'
                    //                     style={{ color: '#F56318' }}
                    //                 />
                    //                 <CardPV
                    //                     image={require('../../assets/pv3.png')}
                    //                     name='Doanh số cá nhân'
                    //                     pv='366'
                    //                     style={{ color: '#9FA811' }}
                    //                 />
                    //                 <CardPV
                    //                     image={require('../../assets/pv4.png')}
                    //                     name='Doanh số cá nhân'
                    //                     pv='366'
                    //                     style={{ color: '#A81811' }}
                    //                 />
                    //             </View>
                    //             <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 12 }}>
                    //                 <Text style={{ fontSize: 15, color: '#000000' }}>CHI TIẾT DOANH SỐ</Text>
                    //                 <Text style={{ fontSize: 15, color: '#005AA9' }}>Tầng 1</Text>
                    //             </View>
                    //         </>
                    //     )}
                    //     showsVerticalScrollIndicator={false}
                    //     renderItem={({ item }) => {
                    //         return (
                    //             <CardTeamThree
                    //                 image={item.image}
                    //                 name={item.name}
                    //                 phone={item.phone}
                    //                 pv={item.pv}
                    //             />
                    //         )
                    //     }} />
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
