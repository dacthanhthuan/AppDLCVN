import React from 'react';
import { SafeAreaView, View, Text, Image } from 'react-native';
import Style_TranferMoneyTwo from './style';
import Header from '../../component/Header';
import MainWallet from '../../component/Mainwallet';
import Information from '../../component/Information';
import Button from '../../component/Button';

const TranferMoneyTwo = ({navigation}) => {
    return (
        <SafeAreaView style={Style_TranferMoneyTwo.container}>
            <Header onPressLeft={() => navigation.goBack()}
                iconLeft={require('../../assets/Arrow1.png')}
                text={'Chuyển tiền'} />
            <Text style={[Style_TranferMoneyTwo.text_1, {marginTop: 40}]}>Người nhận</Text>
            <View style={Style_TranferMoneyTwo.viewUser}>
                <Image style={Style_TranferMoneyTwo.imgUser} source={require('../../assets/imgUser/user_1.png')} />
                <Text style={Style_TranferMoneyTwo.text_2}>Lê Thành Tín</Text>
            </View>
            <Text style={Style_TranferMoneyTwo.text_1}>Nguồn tiền</Text>
            <View style={{ marginTop: 15, marginBottom: 15 }}>
                <MainWallet text_1={'Ví chính'} text_2={'15,000,000đ'} text_3={'Thay đổi'} />
            </View>
            <Text style={Style_TranferMoneyTwo.text_1}>Chi tiết giao dịch</Text>
            <View style={Style_TranferMoneyTwo.viewborder}>
                <Information
                    text_1={'Người nhận'}
                    text_2={'Số điện thoại'}
                    text_3={'Số tiền'}
                    price_1={'Lê Thành Tín'}
                    price_2={'0984903445'}
                    price_3={'2,000,000'}
                    style_1={{
                        fontSize: 16,
                        color: '#000000',
                        fontWeight: '200'
                    }}
                    style_2={{
                        fontSize: 16,
                        color: '#000000',
                        fontWeight: '200'
                    }}
                    style_3={{
                        fontSize: 16,
                        color: '#000000',
                        fontWeight: '200'
                    }}
                    style_4={{
                        fontSize: 16,
                        color: '#000000',
                        fontWeight: '300'
                    }}
                    style_5={{
                        fontSize: 16,
                        color: '#000000',
                        fontWeight: '300'
                    }}
                    style_6={{
                        fontSize: 16,
                        color: '#000000',
                        fontWeight: '300'
                    }}
                />
            </View>
            <View style={Style_TranferMoneyTwo.view_2}>
                <Text style={Style_TranferMoneyTwo.text_1}>Tổng tiền giao dịch</Text>
                <Text style={Style_TranferMoneyTwo.text_1}>2,000,000</Text>
            </View>
            <View style={Style_TranferMoneyTwo.view_3}>
                <View></View>
                <Button text={'Xác nhận chuyển tiền'} />
            </View>
        </SafeAreaView>
    )
};

export default TranferMoneyTwo;