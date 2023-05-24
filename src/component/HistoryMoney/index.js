import React from 'react';
import { SafeAreaView, View, Image, Text } from 'react-native';
import Style_Historymoney from './style';

const HistoryMoney = ({ img, datetime_1, money_1, action_1, status_1, datetime_2, money_2, action_2, status_2, style_1, style_2, style_3, style_4 }) => {
    return (
        <SafeAreaView style={Style_Historymoney.border}>
            <Image style={Style_Historymoney.img} source={img} />
            <View style={Style_Historymoney.view_1}>
                <View style={Style_Historymoney.view_2}>
                    <Text style={Style_Historymoney.text}>{datetime_1}</Text>
                    <Text style={Style_Historymoney.text}>{money_1}</Text>
                    <Text style={Style_Historymoney.text}>{action_1}</Text>
                    <Text style={Style_Historymoney.text}>{status_1}</Text>
                </View>
                <View style={Style_Historymoney.view_3}>
                    <Text style={style_1}>{datetime_2}</Text>
                    <Text style={style_2}>{money_2}</Text>
                    <Text style={style_3}>{action_2}</Text>
                    <Text style={style_4}>{status_2}</Text>
                </View>
            </View>
        </SafeAreaView>
    )
};

export default HistoryMoney;