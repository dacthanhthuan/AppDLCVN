import React from 'react';
import { SafeAreaView, View, Text, Image } from "react-native";
import Style_MainWallet from './style';

const MainWallet = ({text_1, text_2, text_3}) => {
    return (
        <SafeAreaView style={Style_MainWallet.border}>
            <Image style={Style_MainWallet.icon} source={require('../../assets/imgUser/Group_292.png')} />
            <View style={Style_MainWallet.view_1}>
                <View style={Style_MainWallet.view_2}>
                    <Text style={Style_MainWallet.text_1}>{text_1}</Text>
                    <Text style={Style_MainWallet.text_2}>{text_2}</Text>
                </View>
                <Text style={Style_MainWallet.text_3}>{text_3}</Text>
            </View>
        </SafeAreaView>
    )
};

export default MainWallet;