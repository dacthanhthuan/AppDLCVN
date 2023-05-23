import React, { useState } from 'react';
import { SafeAreaView, View, TouchableOpacity, Image, Text, FlatList } from 'react-native';
import styles from './styles';
import CardNotification from '../../component/CardNotification';
import HeaderNotifications from '../../component/HeaderNotifications';

const menu = [
    {
        category: "Thông báo của tôi",
    },
    {
        category: "Cập nhật đơn hàng"
    }
];

const data = [
    {
        title: 'Cập nhật tài khoản thành công',
        time: '17:07',
        date: '19/06/2022',
        money: '50000',
        dot: false
    },
    {
        title: 'Đổi mật khẩu thành công',
        time: '17:07',
        date: '19/06/2022',
        money: '50000',
        dot: true
    },
    {
        title: 'Bạn vừa có thêm 1 cấp dưới',
        time: '17:07',
        date: '19/06/2022',
        money: '50000',
        dot: false
    },
    {
        title: 'Nhận hoa hồng giới thiệu',
        time: '17:07',
        date: '19/06/2022',
        money: '50000',
        dot: true
    },
    {
        title: 'Đổi mật khẩu thành công',
        time: '17:07',
        date: '19/06/2022',
        money: '50000',
        dot: false
    },
    {
        title: 'Bạn vừa có thêm 1 cấp dưới',
        time: '17:07',
        date: '19/06/2022',
        money: '50000',
        dot: false
    },
    {
        title: 'Nhận hoa hồng giới thiệu',
        time: '17:07',
        date: '19/06/2022',
        money: '50000',
        dot: true
    },
]



const Notifications = ({navigation}) => {
    const [category, setCategory] = useState('Thông báo của tôi');


    const setStatusFilter = status => {
        setCategory(status);
    };

    // Render different interfaces based on the selected status
    const renderContent = () => {
        switch (category) {
            case 'Thông báo của tôi':
                return (
                    <FlatList
                        data={data}
                        style={{ marginTop: 25 }}
                        renderItem={({ item }) => {
                            return (
                                <CardNotification
                                    title={item.title}
                                    time={item.time}
                                    date={item.date}
                                    dot={item.dot}
                                    money={item.money}
                                />
                            )
                        }}
                    />
                )
            case 'Cập nhật đơn hàng':
                return (
                    <></>
                )
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <HeaderNotifications
            iconLeft={require('../../assets/Arrow1.png')}
            text='Thông báo'
            onPressLeft={()=>{navigation.goBack()}}
            />

            <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginTop: 25 }}>
                {menu.map((e) => (
                    <TouchableOpacity
                        onPress={() => setStatusFilter(e.category)}
                        style={[styles.menuItem, category === e.category ? styles.menuSelectedItem : {}]}
                        key={e.category}
                    >
                        <Text style={[styles.textItem, category === e.category ? styles.textSelectedItem : {}]}>{e.category}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {renderContent()}
        </SafeAreaView>
    );
};

export default React.memo(Notifications);
