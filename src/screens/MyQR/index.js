import React from "react"
import { Image, SafeAreaView, Text } from "react-native"
import styles from "./styles"
import { useSelector } from "react-redux"
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../../global"
import { View } from "react-native"
import { TouchableOpacity } from "react-native"
import Header from "../../component/Header"

const MyQR = ({ navigation }) => {

    const { data } = useSelector((state) => state.postReducers)
    return (
        <SafeAreaView style={styles.container}>
            <Header
                onPressLeft={() => navigation.goBack()}
                iconLeft={require('../../assets/imgSupplier/Arrow_1.png')}
                text="QR của tôi"

            />

            {data?.data?.avatar ? (
                <Image style={styles.imageAvatar} source={{ uri: data?.data?.avatar }} />
            )
                :
                <Image style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 32, borderRadius: 50 }} source={{ uri: 'https://musicart.xboxlive.com/7/4d4d6500-0000-0000-0000-000000000002/504/image.jpg?w=1920&h=1080' }} />}

            <Text style={styles.textFullname}>{data?.data?.fullname}</Text>
            <Text style={styles.textDescription}>Chia sẻ mã QR này để kết bạn nhanh chóng, bảo mật</Text>

            <Image resizeMode="contain" style={{ width: WINDOW_WIDTH * 0.8, height: WINDOW_HEIGHT * 0.4, alignSelf: 'center' }} source={{ uri: data?.data?.QRCode }} />

            <View style={{ width: '70%', marginTop: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity style={styles.buttonTouchable}>
                        <Image style={styles.icon} source={require('../../assets/share.png')} />
                    </TouchableOpacity>
                    <Text style={styles.textFullname}>Chia sẻ</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity style={styles.buttonTouchable}>
                        <Image style={styles.icon} source={require('../../assets/download.png')} />
                    </TouchableOpacity>
                    <Text style={styles.textFullname}>Tải xuống</Text>
                </View>
            </View>

        </SafeAreaView>
    )
}

export default React.memo(MyQR)