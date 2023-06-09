import React from "react";
import { SafeAreaView, Text, Image } from "react-native";
import styles from "./styles";
import Button from "../../component/Button";

const CardEmpty = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <Image style={{ width: 95, height: 95 }} source={require('../../assets/Group211.png')} />
            <Text style={{ fontSize: 20, color: '#000000', marginTop: 32 }}>Giỏ hàng của bạn đang trống</Text>
            <Button text='Mua sắm' onPress={()=>navigation.navigate('Home')} style={{ marginTop: 32, width: '90%' }} />
        </SafeAreaView>
    )
}

export default React.memo(CardEmpty)