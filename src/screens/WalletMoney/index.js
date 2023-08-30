import React from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity } from 'react-native';
import Header from '../../component/Header';
import styles from './style';
import { useSelector } from 'react-redux';
import { formatPriceNotCurrency } from '../../global';

const WalletMoney = ({ navigation }) => {
    const { data } = useSelector((state) => state.postReducers)

    const moneyWallet = data?.data?.lWallet[0]?.amount;
    return (
        <SafeAreaView style={styles.container}>
            <Header onPressLeft={() => navigation.goBack()} iconLeft={require('../../assets/imgSupplier/Arrow_1.png')} text={'Ví chính'} />
            <View>
                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                    <View style={{ justifyContent: "center", paddingLeft: 15, zIndex: 999 }}>
                        <Text style={styles.text}>Số dư khả dụng</Text>
                        <Text style={styles.textmoney}>{formatPriceNotCurrency(moneyWallet)} VNĐ</Text>
                    </View>
                    <Image style={styles.imgWallet} source={require('../../assets/imgMainwallet/Rectangle_222.jpg')} />
                </View>
                <View style={styles.line}></View>
            </View>
            <View>
                <Text style={styles.title}>Chức năng ví</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 25 }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Recharge')}
                        style={styles.view}>
                        <View style={styles.view_2}>
                            <View style={styles.borderIcon}>
                                <Image style={styles.icon} source={require('../../assets/imgMainwallet/Rectangle_429.png')} />
                            </View>
                            <Text style={styles.text_2}>Nạp tiền</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('WithDraw')}
                        style={styles.view}>
                        <View style={styles.view_2}>
                            <View style={styles.borderIcon}>
                                <Image style={styles.icon} source={require('../../assets/imgMainwallet/Rectangle_430.png')} />
                            </View>
                            <Text style={styles.text_2}>Rút tiền</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('TransferMoney', { screen: 'WalletMoney' })}
                        style={styles.view}>
                        <View style={styles.view_2}>
                            <View style={styles.borderIcon}>
                                <Image style={styles.icon} source={require('../../assets/imgMainwallet/Rectangle_431.png')} />
                            </View>
                            <Text style={styles.text_2}>Chuyển tiền</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('WalletHistory')}
                        style={styles.view}>
                        <View style={styles.view_2}>
                            <View style={styles.borderIcon}>
                                <Image style={styles.icon} source={require('../../assets/imgMainwallet/Rectangle_432.png')} />
                            </View>
                            <Text style={styles.text_2}>Lịch sử</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
};

export default React.memo(WalletMoney);