import React, { useState } from "react";
import styles from "./styles";
import { SafeAreaView, Text, View, Image, TouchableOpacity, TextInput, FlatList } from "react-native";
import Header from "../../component/Header";
import CardSurplus from "../../component/CardSurplus";
import Button from "../../component/Button";
import LogoBanking from "../../component/LogoBanking";

const data = {
    images: [
        require('../../assets/acb.png'),
        require('../../assets/vcb.png')
    ]
}

const Recharge = ({navigation}) => {

    const [isSelected, setIsSelected] = useState(false)

    const [selectedAmount, setSelectedAmount] = useState("");

    const selectAmount = (amount) => {
        setSelectedAmount(amount);
    };

    return (
        <SafeAreaView style={styles.container}>

            <Header
                iconLeft={require('../../assets/Arrow1.png')}
                text='Nạp tiền'
                iconRight={require('../../assets/white.png')}
                onPressLeft={()=>{navigation.goBack()}}
            />

            <CardSurplus style={{ marginTop: 35 }} />

            <Text style={styles.title}>Nhập số tiền cần nạp</Text>

            <TextInput
                style={styles.value}
                placeholder="0Đ"
                placeholderTextColor='#C2C2C2'
                keyboardType="number-pad"
                value={selectedAmount}
                onChangeText={selectAmount} />

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

            <Text style={styles.textBanking}>Chọn ngân hàng</Text>


            <View style={{ flexDirection: 'row', marginTop: 8 }}>
                <LogoBanking logo={data.images} isSelected={isSelected} onSelect={setIsSelected} />
            </View>

            <TouchableOpacity style={styles.card}>
                <Text style={styles.textCard}>Hướng dẫn rút tiền</Text>
                <Image style={styles.iconRight} source={require('../../assets/vectorRight.png')} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.card, { marginTop: 12 }]}>
                <View style={{ flexDirection: 'row' }}>
                    <Image style={styles.iconLeft} source={require('../../assets/Rectangle331.png')} />
                    <Text style={[styles.textCard, { marginLeft: 8 }]}>Lịch sử rút tiền</Text>
                </View>
                <Image style={styles.iconRight} source={require('../../assets/vectorRight.png')} />
            </TouchableOpacity>

            <View style={{ alignItems: 'center' }} >
                <Button text='Tiếp theo'
                    style={{ bottom: -240, width: '90%', alignItems: 'center' }} />
            </View>

            <View style={{ alignItems: 'center' }} >
                <Button text='Tiếp theo'
                    style={{ bottom: -72, width: '90%' }} />
            </View>

        </SafeAreaView>
    )
}

export default React.memo(Recharge)


