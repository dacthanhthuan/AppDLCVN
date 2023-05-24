import React from 'react'
import { SafeAreaView, View, Image, Text } from 'react-native'
import styles from './styles'
import InfoCard from '../../component/InfoCard'
import Button from '../../component/Button'

const NotLogin = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Image style={styles.image} source={require('../../assets/Rectangle312.png')} />
                <Text style={styles.textHeader}>User</Text>
            </View>

            <Text style={styles.title}>Bảng điều khiển</Text>

            <InfoCard style={{ marginTop: 15 }}
                text='Chia sẻ App'
                image={require('../../assets/Rectangle294.png')} />
            <InfoCard
                text='Tài khoản ngân hàng'
                image={require('../../assets/Rectangle295.png')} />
            <InfoCard
                text='Thiết lập bảo mật'
                image={require('../../assets/Rectangle300.png')} />

            <Button style={{ marginTop: 185 }} text='Đăng nhập' onPress={()=> navigation.navigate('Login')}/>

        </SafeAreaView>
    )
}

export default React.memo(NotLogin)