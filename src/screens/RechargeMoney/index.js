import React from 'react';
import { SafeAreaView, View, FlatList } from 'react-native';
import Header from '../../component/Header';
import HistoryMoney from '../../component/HistoryMoney';
import Style_RechargeHistory from './style';
import data_history from '../../data/data_history';

const RechargeHistory = () => {
    const render_item = ({ item }) => {
        return (
            <HistoryMoney img={require('../../assets/imgHistorymoney/recharge_money.png')}
                datetime_1={'Ngày thực hiện:'}
                money_1={'Số tiền:'}
                action_1={'Rút về:'}
                status_1={'Trạng thái:'}
                datetime_2={item.datetime}
                money_2={item.money}
                action_2={item.action}
                status_2={item.status}
                style_1={{
                    fontSize: 13,
                    color: '#000000',
                    fontWeight: '300',
                }}
                style_2={{
                    fontSize: 13,
                    color: '#005AA9',
                    fontWeight: '300',
                }}
                style_3={{
                    fontSize: 13,
                    color: '#000000',
                    fontWeight: '300',
                }}
                style_4={{
                    fontSize: 13,
                    color: '#19A538',
                    fontWeight: '300',
                }}
            />
        )
    }
    return (
        <SafeAreaView style={Style_RechargeHistory.container}>
            <Header onPress={() => navigation.goBack()}
                iconLeft={require('../../assets/imgSupplier/Arrow_1.png')}
                title={'Lịch sử nạp tiền'} />
            <View style={{ marginTop: 15, }}>
                <FlatList
                    data={data_history}
                    renderItem={render_item}
                    keyExtractor={(item, title) => title.toString()}
                />
            </View>
        </SafeAreaView>
    )
};

export default RechargeHistory;