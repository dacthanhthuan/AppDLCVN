import React, { useEffect, useState } from 'react'
import styles from './styles';
import { SafeAreaView, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import Header from '../../component/Header';
import CardContact from '../../component/CardContact';
import CardAddress from '../../component/CardAddress';
import { useSelector } from 'react-redux';
import { fetchListAddress, } from '../AddAddress/http';
import { cleardeliveryAddress } from '../../redux/actions';
import store from '../../redux/store';

const CustomerInformation = ({ navigation, route }) => {


    // Lấy dữ liệu createOrder
    const { TOTAL_PRICE, DATA_MONEY, TOTAL_POINT, DATA_POINT, previouscreen, deliveryAddress, COMMISSION } = route?.params || {};

    console.log('CTM_previouscreen:>>', COMMISSION);

    const { data } = useSelector((state) => state.postReducers)

    const session_token = data?.data?.session_token;

    const [list, setList] = useState([])

    const callAPIListAddress = async () => {
        try {
            const response = await fetchListAddress({
                'toKen': session_token,
            });

            // Gọi API thành công, bạn có thể thực hiện các hành động khác ở đây
            setList(response)
        } catch (error) {
            // Xử lý lỗi nếu có
            console.error('Error adding address:', error);
        }
    }

    useEffect(() => {
        callAPIListAddress();
    }, [navigation]);

    useEffect(() => {
        const unsubcribe = navigation.addListener('focus', () => {
            callAPIListAddress();
        })

        return unsubcribe;
    }, [navigation])

    const [selectedItem, setSelectedItem] = useState(deliveryAddress?.id || null); // Thêm state để lưu item đã được chọn
    const [showCheckItem, setShowCheckItem] = useState(''); // Thêm state để lưu item đã được chọn

    const onPressCheck = (item) => {
        setSelectedItem(item.id);
        if (previouscreen == 'CreateOrder') {
            store.dispatch(cleardeliveryAddress())
            navigation.navigate('CreateOrder', { deliveryAddress: item, returnTotal: TOTAL_PRICE, dataProduct: DATA_MONEY, returnTotalPoint: TOTAL_POINT, dataProductPoint: DATA_POINT, returnPreviosScreen: previouscreen, returnCommision: COMMISSION });
        } else {
            store.dispatch(cleardeliveryAddress())
            navigation.navigate('CreateOrderPoint', { deliveryAddress: item, returnTotal: TOTAL_PRICE, dataProduct: DATA_MONEY, returnTotalPoint: TOTAL_POINT, dataProductPoint: DATA_POINT, returnPreviosScreen: previouscreen, returnCommision: COMMISSION });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header
                iconLeft={require('../../assets/Arrow1.png')}
                text='Thông tin khách hàng'
                onPressLeft={() => { navigation.goBack() }}
            />
            <FlatList
                data={list.sort((a, b) => b.is_default - a.is_default)}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                    return (
                        <>
                            <CardContact
                                name={item.fullname}
                                phone={item.mobile}
                                onPress={() => navigation.navigate('UpdateAddress1', { item: item, TOTAL_PRICE, DATA_MONEY, TOTAL_POINT, DATA_POINT, previouscreen, COMMISSION })}
                                textAddressDefault={item?.is_default} />
                            <CardAddress
                                numberAddress={item.address}
                                address={item?.ward + ', ' + item?.district + ', ' + item?.city}
                                onPressCheck={() => onPressCheck(item)} // Truyền item vào onPressCheck
                                check={selectedItem === item?.id} // Kiểm tra xem item có được chọn hay không
                                showCheckbox={selectedItem ? showCheckItem : item?.is_default}
                            />
                        </>
                    )
                }}
                ListFooterComponent={(
                    <TouchableOpacity onPress={() => navigation.navigate('AddAddress')} style={styles.addAdress}>
                        <Image source={require('../../assets/Rectangle268.png')} style={{ width: 20, height: 20 }} resizeMode='contain' />
                        <Text style={styles.textBlue}>Thêm địa chỉ mới</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item?.id.toString()}
            />


        </SafeAreaView>
    )
}

export default React.memo(CustomerInformation);