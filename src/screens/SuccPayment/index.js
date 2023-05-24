import React from "react";
import { SafeAreaView, Text, Image } from "react-native";
import styles from "./styles";
import Button from "../../component/Button";

const SuccPayment = ({navigation}) =>{
    return(
        <SafeAreaView style={styles.container}>
            <Text style={{fontSize: 20, color: '#000000'}}>Thanh toán thành công</Text>
            <Image style={{width: 95, height: 95, marginTop: 32}} source={require('../../assets/succ.png')}/>
            <Button text='Đến trang chủ' style={{marginTop: 32, width: '90%'}} onPress={()=>{navigation.navigate('Bottom')}}/>
        </SafeAreaView>
    )
}

export default React.memo(SuccPayment)