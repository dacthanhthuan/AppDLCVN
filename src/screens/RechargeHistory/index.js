import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, FlatList } from 'react-native';
import Header from '../../component/Header';
import HistoryMoney from '../../component/HistoryMoney';
import Style_RechargeHistory from './style';
import { fetchFundHistory, fetchWalletCancel } from '../AddAddress/http';
import { useSelector } from 'react-redux';
import { convertStatus, formatPriceNotCurrency, formatprice, formatprice2 } from '../../global';

const RechargeHistory = ({ navigation }) => {

    const { data } = useSelector((state) => state.postReducers)

    const [isListData, setIsListData] = useState([])


    // Gọi API list lịch sử nạp tiền
    const callAPIFundHistory = async (type, page) => {
        try {
            const response = await fetchFundHistory({
                'TOKEN': data?.data?.session_token,
                'TYPE': type,
                'PAGE': page,
            })
            // console.log(response?.data?.l);
            setIsListData(response?.data?.l)

            return response

        } catch (error) {
            console.log('Error width history :', error);
        }
    }

    // Hủy lịch sử nạp tiền
    const callAPIWalletCancel = async (id, note) => {
        try {
            const response = await fetchWalletCancel({
                'TOKEN': data?.data?.session_token,
                'ID': id,
                'NOTE': note,
            })

            // console.log(response);
            return response

        } catch (error) {
            console.log('Error wallet cancel :', error);
        }
    }

    useEffect(() => {
        callAPIFundHistory(1, 1);
    }, [data, isListData])

    const render_item = ({ item }) => {
        const date = new Date(item?.created_at * 1000);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Tháng bắt đầu từ 0, cần cộng thêm 1
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();

        const formattedMonth = month.toString().padStart(2, '0'); // Đảm bảo tháng có hai chữ số
        const formattedMinutes = minutes.toString().padStart(2, '0'); // Đảm bảo phút có hai chữ số

        const lastUpdate = `${day}/${formattedMonth}/${year} - ${hours}:${formattedMinutes}`;
        return (
            <HistoryMoney img={require('../../assets/imgHistorymoney/recharge_money.png')}
                datetime_1='Ngày thực hiện:'
                money_1='Số tiền:'
                action_1='Nạp về:'
                status_1='Trạng thái:'
                datetime_2={lastUpdate}
                money_2={formatPriceNotCurrency(item?.amount)}
                action_2={item.bank_name}
                status_2={convertStatus(item?.status)}
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
                onPressCancel={() => { callAPIWalletCancel(item?.id, item?.note_by_client) }}
            />
        )
    }
    return (
        <SafeAreaView style={Style_RechargeHistory.container}>
            <Header onPressLeft={() => navigation.goBack()}
                iconLeft={require('../../assets/imgSupplier/Arrow_1.png')}
                text={'Lịch sử nạp tiền'} />
            <View style={{ marginTop: 15, }}>
                <FlatList
                    data={isListData}
                    showsVerticalScrollIndicator={false}
                    renderItem={render_item}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </SafeAreaView>
    )
};

export default RechargeHistory;