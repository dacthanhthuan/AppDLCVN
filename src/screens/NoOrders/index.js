import React from "react";
import { SafeAreaView, Text, Image } from "react-native";
import styles from "./styles";
import Button from "../../component/Button";

const NoOrders = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <Image style={{ width: 95, height: 95 }} source={require('../../assets/sad.png')} />
            <Text style={{ fontSize: 20, color: '#000000', marginTop: 32 }}>Bạn chưa có đơn hàng</Text>
            <Button text='Tạo đơn ngay' style={{ marginTop: 32, width: '90%' }} />
        </SafeAreaView>
    )
}

export default React.memo(NoOrders)