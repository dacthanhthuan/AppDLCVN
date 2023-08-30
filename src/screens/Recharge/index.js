import React, { useEffect, useState } from "react";
import styles from "./styles";
import { SafeAreaView, Text, View, Image, TouchableOpacity, TextInput } from "react-native";
import Header from "../../component/Header";
import CardSurplus from "../../component/CardSurplus";
import Button from "../../component/Button";
import LogoBanking from "../../component/LogoBanking";
import { WINDOW_HEIGHT, formatprice } from "../../global";
import { fetchDeposit, fetchListBank } from "../AddAddress/http";
import { useSelector } from "react-redux";
import InputAddress from "../../component/InputAddress";
import { Alert } from "react-native";

const Recharge = ({ navigation }) => {

    const { data } = useSelector((state) => state.postReducers)

    const isNoteDefault = data?.data?.fullname + ' NAP TIEN';

    const [isListBank, setIsListBank] = useState([])
    const [isSelected, setIsSelected] = useState(false)
    const [isNote, setIsNote] = useState(isNoteDefault)

    const [selectedAmount, setSelectedAmount] = useState("");

    const selectAmount = (amount) => {
        setSelectedAmount(amount);
    };

    // console.log('selectAmount:>>', selectedAmount);
    console.log('isSelected:>>', isSelected);

    // Gọi API danh sách ngân hàng
    const callAPIListBank = async () => {
        try {
            const response = await fetchListBank({
                'TOKEN': data?.data?.session_token,
            });

            setIsListBank(response?.data)
            return response;

        } catch (error) {
            console.log('Error API ListBank:>>', error);
        }
    }

    // Gọi API nạp ví
    const callAPIDeposit = async () => {
        if (selectedAmount == '') {
            Alert.alert('Thông báo', 'Bạn chưa nhập số tiền cần nạp')
        } else if (!isSelected) {
            Alert.alert('Thông báo', 'Bạn chưa chọn ngân hàng')
        } else {
            try {
                const response = await fetchDeposit({
                    'TOKEN': data?.data?.session_token,
                    'AMOUNT': selectedAmount,
                    'NOTE': isNote,
                    'BANK_ID': isSelected?.id,
                });

                if (response?.message !== 'success') {
                    Alert.alert('Thông báo', response.message)
                } else {
                    navigation.navigate('WalletMoney')
                }
                return response;

            } catch (error) {
                console.log('Error API Deposit:>>', error);
            }
        }
    }

    useEffect(() => {
        callAPIListBank();
    }, [data])

    return (
        <SafeAreaView style={styles.container}>

            <Header
                iconLeft={require('../../assets/Arrow1.png')}
                text='Nạp tiền'
                onPressLeft={() => { navigation.goBack() }}
            />

            <CardSurplus
                title='Số dư ví chính'
                money={formatprice(data?.data?.lWallet[0]?.amount)}
                onPress={() => navigation.navigate('WalletScreen')}
                style={{ marginTop: 35 }} />

            <Text style={styles.title}>Nhập số tiền cần nạp</Text>

            <TextInput
                style={styles.value}
                placeholder="0Đ"
                placeholderTextColor='#C2C2C2'
                keyboardType="number-pad"
                value={selectedAmount}
                onChangeText={selectAmount} />

            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 25 }}>
                <TouchableOpacity style={styles.numberContainerMoney} onPress={() => selectAmount("50000")}>
                    <Text style={styles.numberMoney}>50 000</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.numberContainerMoney} onPress={() => selectAmount("500000")}>
                    <Text style={styles.numberMoney}>500 000</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.numberContainerMoney} onPress={() => selectAmount("5000000")}>
                    <Text style={styles.numberMoney}>5 000 000</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.textBanking}>Chọn ngân hàng</Text>

            <View style={{ flexDirection: 'row', marginTop: 8 }}>
                <LogoBanking logo={isListBank} isSelected={isSelected} onSelect={setIsSelected} />
            </View>

            <InputAddress
                value={isNote}
                title="Nội dung chuyển tiền"
                onChangeText={(text) => setIsNote(text)} />

            <TouchableOpacity style={styles.card}>
                <Text style={styles.textCard}>Hướng dẫn rút tiền</Text>
                <Image style={styles.iconRight} source={require('../../assets/vectorRight.png')} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { navigation.navigate('RechargeHistory') }} style={[styles.card, { marginTop: 12 }]}>
                <View style={{ flexDirection: 'row' }}>
                    <Image style={styles.iconLeft} source={require('../../assets/Rectangle331.png')} />
                    <Text style={[styles.textCard, { marginLeft: 8 }]}>Lịch sử nạp tiền</Text>
                </View>
                <Image style={styles.iconRight} source={require('../../assets/vectorRight.png')} />
            </TouchableOpacity>
            <View style={{ alignItems: 'center', top: WINDOW_HEIGHT * 0.1 }} >
                <Button onPress={() => { callAPIDeposit() }} text='Tiếp theo'
                    style={{ width: '90%' }} />
            </View>
        </SafeAreaView>
    )
}

export default React.memo(Recharge)


