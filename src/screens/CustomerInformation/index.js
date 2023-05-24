import React from 'react'
import styles from './styles';
import { SafeAreaView, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import Header from '../../component/Header';
import CardContact from '../../component/CardContact';
import CardAddress from '../../component/CardAddress';

const data = [
    {
        name: 'Chị Mai',
        phone: '84839020007',
        numberAddress: '120 Lê Văn Quới',
        address: 'Phường Bình Hưng Hòa A, Quận Bình Tân, Thành phố Hồ chí Minh'
    },
    {
        name: 'Chị Mai',
        phone: '84839020007',
        numberAddress: '120 Lê Văn Quới',
        address: 'Phường Bình Hưng Hòa A, Quận Bình Tân, Thành phố Hồ chí Minh'
    },
]

const CustomerInformation = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.container}>

            <Header
                iconLeft={require('../../assets/Arrow1.png')}
                text='Thông tin khách hàng'
                iconRight={require('../../assets/white.png')}
                onPressLeft={() => { navigation.goBack() }}
            />

            <FlatList
                data={data}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                    return (
                        <>
                            <CardContact
                                name={item.name}
                                phone={item.phone}
                                onPress={()=>navigation.navigate('UpdateAddress1')} />
                            <CardAddress
                                numberAddress={item.numberAddress}
                                address={item.address}
                                onPress={()=>navigation.navigate('UpdateAddress1')} 
                            />
                        </>
                    )
                }}
                ListFooterComponent={(
                    <TouchableOpacity onPress={()=>navigation.navigate('AddAddress')} style={styles.addAdress}>
                        <Image source={require('../../assets/Rectangle268.png')} />
                        <Text style={styles.textBlue}>Thêm địa chỉ mới</Text>
                    </TouchableOpacity>
                )}
            />


        </SafeAreaView>
    )
}

export default React.memo(CustomerInformation);