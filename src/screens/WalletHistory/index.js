import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, View, ActivityIndicator } from "react-native";
import styles from "./styles";
import Header from "../../component/Header";
import { useSelector } from "react-redux";
import StatusLWallet from "../../component/StatusLWallet";
import { fetchWalletHistory } from "../AddAddress/http";
import CardWallet from "../../component/CardWallet";
import { RefreshControl } from "react-native";

const WalletHistory = ({ navigation }) => {

    const { data } = useSelector((state) => state.postReducers)

    const lWallet = data?.data?.lWallet;
    const lWalletFirst = data?.data?.lWallet[0];

    const [selectedStatus, setSelectedStatus] = useState(lWalletFirst)
    const [isListData, setIsListData] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [isPage, setIsPage] = useState(1);
    const [isTotalRecord, setIsTotalRecord] = useState(1);
    const [refreshing, setRefreshing] = useState(false);


    // Gọi API danh sách ngân hàng
    const callAPIWalletHistory = async (page, wallet_id) => {
        setIsPage(1)
        try {
            const response = await fetchWalletHistory({
                'TOKEN': data?.data?.session_token,
                'PAGE': page,
                'WALLET_ID': wallet_id
            });

            setIsTotalRecord(response?.data?.total_record);
            setIsListData(response?.data?.l)
            return response;

        } catch (error) {
            console.log('Error API ListBank:>>', error);
        }
    }

    useEffect(() => {
        setIsListData([])
        callAPIWalletHistory(1, selectedStatus?.wallet_id);
    }, [data, selectedStatus])

    // LoadMore
    const loadMore = async () => {
        if (isListData?.length < isTotalRecord) {
            setIsLoading(true)
            try {
                let newPage = isPage + 1;
                let response;

                response = await callAPIWalletHistory(newPage, selectedStatus?.wallet_id)

                console.log(response);
                if (response?.data?.l?.length > 0) {
                    setIsListData([...isListData, ...response?.data?.l])
                    setIsPage(newPage)
                }
                setIsLoading(false)
            } catch (error) {
                console.log('Error loadMore:', error);
            }
        } else {
            setIsLoading(false)
        }
    }

    const onRefreshs = () => {
        setRefreshing(true)
        setIsListData([])
        callAPIWalletHistory(1, selectedStatus?.wallet_id)
        setRefreshing(false)
    }

    console.log(isListData?.length);

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
                text="Giao dịch giữa các ví"
                iconLeft={require('../../assets/Arrow1.png')}
                onPressLeft={() => navigation.goBack()}
            />

            <View style={styles.categoriContainer}>
                <StatusLWallet
                    dataStatus={lWallet}
                    selectedStatus={selectedStatus}
                    onCategoryPress={setSelectedStatus}
                />
            </View>

            <FlatList
                data={isListData}
                style={{ marginVertical: 16 }}
                keyExtractor={(item, index) => `${item?.id}_${index}`}
                renderItem={({ item }) => {
                    return (
                        <CardWallet key={item?.id} item={item} />
                    )
                }}
                onEndReached={loadMore}
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
        </SafeAreaView>
    )
}

export default React.memo(WalletHistory);