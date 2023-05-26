import React from 'react'
import { Image, Text, ScrollView, ImageBackground, SafeAreaView, View } from 'react-native'
import styles from './styles'
import InfoCard from '../../component/InfoCard'
import CardProfile from '../../component/CardProfile'
import TranfersMoney from '../../component/TranfersMoney'


const ProfileAdmin = ({ navigation }) => {
    return (
        <ScrollView>

            <SafeAreaView style={styles.container}>

                <CardProfile
                    style={{ marginTop: 25, borderColor: '#005AA9' }}
                    image={require('../../assets/Rectangle312.png')}
                    text='Nguyễn Thái Năng'
                    id={'331550479'}
                    onPress={() => navigation.navigate('Detail_User')}
                />

                <Text style={styles.title}>Quản lí ví</Text>

                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', zIndex: 99, marginTop: 170, marginLeft: 30, position: 'absolute', paddingRight: 32 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={{ width: 20, height: 20 }} resizeMode='contain' source={require('../../assets/Rectangle326.png')} />
                        <Text style={{ fontSize: 16, color: '#FFFFFF', marginLeft: 10 }}>Ví tiền</Text>
                    </View>
                    <Text style={{ fontSize: 16, color: '#FFFFFF' }}>35.0000đ</Text>
                </View>

                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', zIndex: 99, marginTop: 220, marginLeft: 30, position: 'absolute', paddingRight: 32 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={{ width: 20, height: 20 }} resizeMode='contain' source={require('../../assets/Rectangle326.png')} />
                        <Text style={{ fontSize: 16, color: '#FFFFFF', marginLeft: 10 }}>Ví điểm</Text>
                    </View>
                    <Text style={{ fontSize: 16, color: '#FFFFFF' }}>0đ</Text>
                </View>


                <Image style={{ width: '100%', height: 72 }} resizeMode='contain' source={require('../../assets/Rectangle301.png')} />
                <Image style={{ width: '100%', height: 72, marginTop: -22 }} resizeMode='contain' source={require('../../assets/Rectangle302.png')} />

                <ImageBackground style={styles.rowTranfers} resizeMode='contain' source={require('../../assets/Rectangle303_1.png')} >
                    <TranfersMoney
                        image={require('../../assets/Rectangle303.png')}
                        text='Quét mã'
                        onPress={() => navigation.navigate('UpdateAddress1')} />
                    <TranfersMoney
                        image={require('../../assets/Rectangle304.png')}
                        text='Nạp ví'
                        onPress={() => navigation.navigate('Recharge')} />
                    <TranfersMoney
                        image={require('../../assets/Rectangle305.png')}
                        text='Chuyển tiền'
                        onPress={() => navigation.navigate('TransferMoney')} />
                    <TranfersMoney
                        image={require('../../assets/Rectangle306.png')}
                        text='Rút tiền'
                        onPress={() => navigation.navigate('WithDraw')} />
                </ImageBackground>

                <Text style={styles.title}>Bảng điều khiển</Text>

                <InfoCard
                    image={require('../../assets/Rectangle294.png')}
                    text='Chia sẻ app'
                    onPress={() => navigation.navigate('SearchRecent')}
                />
                <InfoCard
                    image={require('../../assets/Rectangle295.png')}
                    text='Thiết lập bảo mật'
                    onPress={() => navigation.navigate('CustomerManagement')}
                />
                <InfoCard
                    image={require('../../assets/Rectangle300.png')}
                    text='Tài khoản ngân hàng'
                />
                <InfoCard
                    image={require('../../assets/Rectangle295.png')}
                    text='Quản lý địa chỉ'
                />
                <InfoCard
                    image={require('../../assets/Rectangle298.png')}
                    text='Danh sách đội nhóm'
                    onPress={() => navigation.navigate('TeamThree')}
                />
                <InfoCard
                    image={require('../../assets/Rectangle299.png')}
                    text='Báo cáo doanh số'
                />
                <InfoCard
                    image={require('../../assets/Rectangle299.png')}
                    text='Báo cáo hoa hồng'
                    style={{ marginBottom: 32 }}
                />

            </SafeAreaView>

        </ScrollView>
    )
}

export default React.memo(ProfileAdmin)