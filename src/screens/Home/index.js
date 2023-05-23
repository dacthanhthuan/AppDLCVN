import React from "react";
import styles from "./styles";
import { SafeAreaView, ScrollView } from 'react-native'
import Button from "../../component/Button";

const Home = ({ navigation }) => {
    return (
        <ScrollView style={styles.container}>
            <Button text='Team' onPress={() => { navigation.navigate('Team') }}></Button>
            <Button text='TeamThree' onPress={() => { navigation.navigate('TeamThree') }}></Button>
            <Button text='CardEmpty' onPress={() => { navigation.navigate('CardEmpty') }}></Button>
            <Button text='Notifications' onPress={() => { navigation.navigate('Notifications') }}></Button>
            <Button text='SearchTeam' onPress={() => { navigation.navigate('SearchTeam') }}></Button>
            <Button text='CustomerManagement' onPress={() => { navigation.navigate('CustomerManagement') }}></Button>
            <Button text='WithDraw' onPress={() => { navigation.navigate('WithDraw') }}></Button>
            <Button text='Recharge' onPress={() => { navigation.navigate('Recharge') }}></Button>
            <Button text='TransferMoney' onPress={() => { navigation.navigate('TransferMoney') }}></Button>
            <Button text='SuccPayment' onPress={() => { navigation.navigate('SuccPayment') }}></Button>
            <Button text='SearchProduct' onPress={() => { navigation.navigate('SearchProduct') }}></Button>
            <Button text='SearchRecent' onPress={() => { navigation.navigate('SearchRecent') }}></Button>
            <Button text='CustomerInformation' onPress={() => { navigation.navigate('CustomerInformation') }}></Button>
        </ScrollView>
    )
}

export default React.memo(Home);
