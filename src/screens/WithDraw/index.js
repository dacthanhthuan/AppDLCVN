import React, { useState } from "react";
import styles from "./styles";
import { SafeAreaView, Text, View, Image, Alert } from "react-native";
import Header from "../../component/Header/index";
import CardSurplus from "../../component/CardSurplus";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Button from "../../component/Button";
import { WINDOW_HEIGHT, formatPriceNotCurrency, formatprice } from "../../global";
import { fetchClientDetail, fetchWithDraw } from "../AddAddress/http";
import InputAddress from "../../component/InputAddress";
import { useSelector } from "react-redux";
import store from "../../redux/store";
import { fetchUsersSuc } from "../../redux/actions";

const WithDraw = ({ navigation }) => {

    const { data } = useSelector((state) => state.postReducers)

    // Nội dung chuyển tiền default
    const isNoteDefault = data?.data?.fullname + ' RUT TIEN';

    const [selectedAmount, setSelectedAmount] = useState('');
    const [isNote, setIsNote] = useState(isNoteDefault)

    let bankAccount = data?.data?.bank_account;
    let bankFullname = data?.data?.bank_fullname;

    const selectAmount = (amount) => {
        setSelectedAmount(amount);
    };

    console.log(data?.data?.session_token);
    console.log(selectedAmount);
    console.log(isNote);

    // Gọi API rút ví
    const callAPIWithDraw = async () => {
        if (!bankAccount && !bankFullname) {
            Alert.alert('Thông báo', 'Bạn chưa có ngân hàng. Vui lòng thêm ngân hàng')
        } else if (selectedAmount == '') {
            Alert.alert('Thông báo', 'Bạn chưa nhập số tiền cần rút.')
        } else if (isNote == '') {
            Alert.alert('Thông báo', 'Vui lòng nhập nội dung chuyển tiền')
        } else if (selectedAmount < 50000) {
            Alert.alert('Thông báo', 'Vui lòng rút tối tiếu 50,000.')
        } else {
            try {
                const response = await fetchWithDraw({
                    'TOKEN': data?.data?.session_token,
                    'AMOUNT': selectedAmount,
                    'NOTE': isNote,
                });

                // Gọi API client Detail
                const clientDetail = await fetchClientDetail({
                    'toKen': data?.data?.session_token
                });
                if (clientDetail?.data != null) {
                    store.dispatch(fetchUsersSuc(clientDetail))
                }

                navigation.navigate('WalletMoney')
                return response;

            } catch (error) {
                console.log('Error API Deposit:>>', error);
            }
        }
    }


    return (
        <SafeAreaView style={styles.container}>

            <Header
                iconLeft={require('../../assets/Arrow1.png')}
                text='Rút tiền'
                onPressLeft={() => { navigation.goBack() }}
            />

            <CardSurplus
                title='Số dư ví chính'
                money={formatprice(data?.data?.lWallet[0]?.amount)}
                onPress={() => navigation.navigate('WalletScreen')}
                style={{ marginTop: 35 }} />

            <Text style={styles.title}>Nhập số tiền cần rút</Text>

            <TextInput
                style={styles.value}
                placeholder="0Đ"
                placeholderTextColor='#C2C2C2'
                keyboardType="number-pad"
                value={selectedAmount}
                onChangeText={selectAmount}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 25 }}>
                <TouchableOpacity style={styles.numberContainerMoney} onPress={() => selectAmount("50 000")}>
                    <Text style={styles.numberMoney}>50 000</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.numberContainerMoney} onPress={() => selectAmount("500 000")}>
                    <Text style={styles.numberMoney}>500 000</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.numberContainerMoney} onPress={() => selectAmount("5 000 000")}>
                    <Text style={styles.numberMoney}>5 000 000</Text>
                </TouchableOpacity>
            </View>

            <View style={{ borderRadius: 10, borderWidth: 1, borderColor: '#005AA9', width: '100%', padding: 12, marginTop: 16 }}>
                {data?.data?.bank_account && data?.data?.bank_fullname ? (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View>
                            <Text style={{ fontSize: 16, color: '#000000' }}>Tài khoản nguồn: <Text style={{ fontWeight: '500' }}>{bankAccount}</Text></Text>
                            <Text style={{ fontSize: 16, color: '#000000', fontWeight: '500' }}> {bankFullname}</Text>
                        </View>
                        <TouchableOpacity onPress={() => { navigation.navigate('CustomerBank') }}>
                            <Text style={{ fontSize: 16, color: '#005AA9' }}>Thay đổi ngân hàng</Text>
                        </TouchableOpacity>
                    </View>

                ) : (
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
                        onPress={() => navigation.navigate('CustomerBank')}>
                        <Image style={{ width: 36, height: 36 }} resizeMode="contain" source={require('../../assets/plus.png')} />
                        <Text style={{ fontSize: 16, color: '#000000', marginLeft: 8 }}>Thêm ngân hàng</Text>
                    </TouchableOpacity>
                )}
            </View>

            <InputAddress
                value={isNote}
                title="Nội dung rút tiền"
                onChangeText={(text) => setIsNote(text)} />

            <TouchableOpacity style={styles.card}>
                <Text style={styles.textCard}>Hướng dẫn rút tiền</Text>
                <Image style={styles.iconRight} source={require('../../assets/vectorRight.png')} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('WithdrawHistory')} style={[styles.card, { marginTop: 12 }]}>
                <View style={{ flexDirection: 'row' }}>
                    <Image style={styles.iconLeft} source={require('../../assets/Rectangle331.png')} />
                    <Text style={[styles.textCard, { marginLeft: 8 }]}>Lịch sử rút tiền</Text>
                </View>
                <Image style={styles.iconRight} source={require('../../assets/vectorRight.png')} />
            </TouchableOpacity>

            <View style={{ alignItems: 'center', top: WINDOW_HEIGHT * 0.1 }} >
                <Button
                    onPress={() => { callAPIWithDraw() }}
                    text='Tiếp theo'
                    style={{ width: '90%' }} />
            </View>

        </SafeAreaView >
    )
}

export default React.memo(WithDraw)


