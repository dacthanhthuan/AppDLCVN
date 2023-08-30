import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import styles from './style';
import Header from '../../component/Header';
import HistoryMoney from '../../component/HistoryMoney';
import { fetchFundHistory, fetchWalletCancel } from '../AddAddress/http';
import { useSelector } from 'react-redux';
import { convertStatus, formatPriceNotCurrency } from '../../global';
import { useFocusEffect } from '@react-navigation/native';

const WithdrawHistory = ({ navigation }) => {

    const { data } = useSelector((state) => state.postReducers)

    const [isListData, setIsListData] = useState([])

    // Gọi API danh sách lịch sử rút tiền
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


    // Gọi API Hủy lịch sử rút tiền khi nhấn vào hủy
    const callAPIWalletCancel = async (id, note) => {
        try {
            const response = await fetchWalletCancel({
                'TOKEN': data?.data?.session_token,
                'ID': id,
                'NOTE': note,
            })

            return response

        } catch (error) {
            console.log('Error wallet cancel :', error);
        }
    }

    useEffect(() => {
        callAPIFundHistory(-1, 1);
    }, [data, isListData])

    // GỌi API khi màn hình được gọi
    useFocusEffect(
        React.useCallback(() => {
            // Gọi API khi màn hình được gọi.
            callAPIFundHistory(-1, 1);
        }, [])
    );

    const render_item = ({ item }) => {
        // Chuyển đổi Unix timestamp sang đối tượng ngày tháng
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
                action_1='Rút về:'
                status_1='Trạng thái:'
                datetime_2={lastUpdate}
                money_2={formatPriceNotCurrency(item.amount)}
                action_2={item.bank_name}
                status_2={convertStatus(item?.status)}
                style_2={{
                    fontSize: 13,
                    color: '#F56318',
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
        <SafeAreaView style={styles.container}>
            <Header onPressLeft={() => navigation.goBack()}
                iconLeft={require('../../assets/imgSupplier/Arrow_1.png')}
                text={'Lịch sử rút tiền'} />
            <FlatList
                data={isListData}
                style={{ marginVertical: 16 }}
                showsVerticalScrollIndicator={false}
                renderItem={render_item}
            />
        </SafeAreaView>
    )
};

export default WithdrawHistory;