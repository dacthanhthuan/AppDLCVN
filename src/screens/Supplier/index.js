import React, { useState, useEffect } from 'react';
import { Image, SafeAreaView, Text, ActivityIndicator, View, FlatList, TouchableOpacity } from 'react-native';
import styles from './style';
import Search from '../../component/Search';
import Header from '../../component/Header';
import { useSelector } from 'react-redux';
import { fetchListSupplier } from '../AddAddress/http';
import { RefreshControl } from 'react-native';
import { loadCartFromLocalStorage } from '../../redux/actions';

const Supplier = ({ navigation }) => {

    const { data } = useSelector((state) => state.postReducers);
    const [keywork, setKeywork] = useState('');

    const [list, setList] = useState([]);
    const [isPage, setIsPage] = useState(1);
    const [isTotalRecord, setIsTotalRecord] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const callAPIListSupplier = async (page) => {
        setIsLoading(true)
        try {
            const response = await fetchListSupplier({
                'TOKEN': data?.data?.session_token,
                'CITYID': '',
                'KEYWORK': keywork,
                'LAT': 10.81107,
                'LNG': 106.69355,
                'TAGID': '',
                'FIELD': '',
                'PAGE': page,
            })

            setList(response?.data?.l)
            setIsTotalRecord(response?.data?.total_record)
            setIsLoading(false)

            return response;

        } catch (error) {
            console.log('Error list supplier', error);
        }
    }

    useEffect(() => {
        callAPIListSupplier(1)
    }, [data, keywork])

    const render_item = ({ item }) => {
        let totalProduct = item?.total_product;
        if (totalProduct > 99) {
            totalProduct = '+' + 99;
        }
        return (
            <TouchableOpacity style={styles.container_2} onPress={() => {
                navigation.navigate('ProductSupplier', { item: item })
            }}>
                {item?.logo ? (
                    <Image style={styles.imgSupplier} resizeMode='contain' source={{ uri: item.logo }} />
                ) :
                    (
                        <Image style={styles.imgSupplier} source={{ uri: 'https://designs.vn/wp-content/images/09-08-2013/logo_lagi_8_resize.JPG' }} />
                    )
                }
                <View>
                    <View style={styles.container_3}>
                        <Text style={styles.name}>{item.company ? item?.company : 'Không có dữ liệu'}</Text>
                        <Text numberOfLines={2} style={styles.detail}>{item.short_description}</Text>
                    </View>
                    <View style={styles.container_4}>
                        <Text style={styles.quantity}>{totalProduct} sản phẩm</Text>
                        <Text style={styles.city}>{item.city}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    // LoadMore
    const handleLoadMore = async () => {
        if (list?.length < isTotalRecord && !refreshing) {
            setIsLoading(true);
            try {
                let nextPage = isPage + 1;
                let response;
                response = await callAPIListSupplier(nextPage)

                if (response?.data?.l?.length > 0) {
                    setList([...list, ...response?.data?.l]);
                    setIsPage(nextPage);
                }
            } catch (error) {
                console.log('Error loading more data:', error);
            }
        } else {
            setIsLoading(false)
        }
    }

    // onRefresh
    const onRefreshs = async () => {
        setRefreshing(true)
        setList([])
        setIsPage(1)
        await callAPIListSupplier(1)
        setRefreshing(false)
    }

    // Hiện loading
    const renderFooter = () => {
        if (isLoading) {
            return (
                <View style={{ marginTop: 24 }}>
                    <ActivityIndicator size='large' />
                </View>
            );
        }
        return null;
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header
                text='Nhà cung cấp' />
            <View style={styles.container_1}>
                <Search placeholder={'Tìm nhà cung cấp'}
                    value={keywork}
                    onChangeText={setKeywork}
                />
                <TouchableOpacity>
                    <Image style={styles.imgSetting} source={require('../../assets/imgSupplier/Rectangle_313.png')} />
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 15, paddingBottom: 100 }}>
                <FlatList
                    data={list}
                    showsVerticalScrollIndicator={false}
                    renderItem={render_item}
                    onEndReached={handleLoadMore}
                    ListFooterComponent={renderFooter}
                    refreshControl={
                        < RefreshControl
                            refreshing={refreshing}
                            colors={['white']}
                            progressBackgroundColor={'#005AA9'}
                            onRefresh={onRefreshs}
                        />
                    }
                />
            </View>
        </SafeAreaView>
    )
}

export default React.memo(Supplier);