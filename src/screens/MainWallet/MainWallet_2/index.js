import React from 'react-native';
import { SafeAreaView, View, Text, Image, TouchableOpacity } from 'react-native';
import Header from '../../../component/Header';
import Style_WalletScreen_2 from './style';

const WalletScreen_2 = () => {
    return (
        <SafeAreaView style={Style_WalletScreen_2.container}>
            <Header onPress={() => navigation.goBack()} iconLeft={require('../../../assets/imgSupplier/Arrow_1.png')} title={'Ví chính'} />
            <View>
                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                    <View style={{ justifyContent: "center", paddingLeft: 15, zIndex: 999 }}>
                        <Text style={Style_WalletScreen_2.text}>Số dư khả dụng</Text>
                        <Text style={Style_WalletScreen_2.textmoney}>1,770,000 VNĐ</Text>
                    </View>
                    <Image style={Style_WalletScreen_2.imgWallet} source={require('../../../assets/imgMainwallet/Rectangle_222.jpg')} />
                </View>
                <View style={Style_WalletScreen_2.line}></View>
            </View>
            <View>
                <Text style={Style_WalletScreen_2.title}>Chức năng ví</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 25 }}>
                    <TouchableOpacity style={Style_WalletScreen_2.view}>
                        <View style={Style_WalletScreen_2.view_2}>
                            <View style={Style_WalletScreen_2.borderIcon}>
                                <Image style={Style_WalletScreen_2.icon} source={require('../../../assets/imgMainwallet/Rectangle_429.png')} />
                            </View>
                            <Text style={Style_WalletScreen_2.text_2}>Nạp tiền</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={Style_WalletScreen_2.view}>
                        <View style={Style_WalletScreen_2.view_2}>
                            <View style={Style_WalletScreen_2.borderIcon}>
                                <Image style={Style_WalletScreen_2.icon} source={require('../../../assets/imgMainwallet/Rectangle_430.png')} />
                            </View>
                            <Text style={Style_WalletScreen_2.text_2}>Rút tiền</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={Style_WalletScreen_2.view}>
                        <View style={Style_WalletScreen_2.view_2}>
                            <View style={Style_WalletScreen_2.borderIcon}>
                                <Image style={Style_WalletScreen_2.icon} source={require('../../../assets/imgMainwallet/Rectangle_431.png')} />
                            </View>
                            <Text style={Style_WalletScreen_2.text_2}>Chuyển tiền</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={Style_WalletScreen_2.view}>
                        <View style={Style_WalletScreen_2.view_2}>
                            <View style={Style_WalletScreen_2.borderIcon}>
                                <Image style={Style_WalletScreen_2.icon} source={require('../../../assets/imgMainwallet/Rectangle_432.png')} />
                            </View>
                            <Text style={Style_WalletScreen_2.text_2}>Lịch sử</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
};

export default WalletScreen_2;