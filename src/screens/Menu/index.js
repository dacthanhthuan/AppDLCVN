import React, { useState, useEffect } from 'react';
import styles from './styles';
import { SafeAreaView, Text, View, ActivityIndicator, RefreshControl, FlatList, Image } from 'react-native';
import Header from '../../component/Header';
import SingleMenu from '../../component/SingleMenu';
import StatusMenu from '../../component/StatusMenu';
import StatusWallet from '../../component/StatusWallet';
import { useSelector } from 'react-redux';
import { fetchHistoryStep } from '../AddAddress/http';
import { WINDOW_HEIGHT } from '../../global';

const Menu = ({ navigation }) => {

  const { data, apiData } = useSelector((state) => state.postReducers)

  // Client API
  const walletMoney = apiData?.data?.payment_type_wallet_main; // ví tiền : 1
  const walletPoint = apiData?.data?.payment_type_wallet_cashback; // ví điểm : 3 

  const deliverySteps = apiData?.data?.lDeliverySteps;
  const deliveryStepsFirst = apiData?.data?.lDeliverySteps[0];

  const ALL = 'Tất cả';
  const STATUS_FIRST = deliveryStepsFirst;

  const session_token = data?.data?.session_token;
  const [selectedStatus, setSelectedStatus] = useState(STATUS_FIRST);
  const [selectedCategory, setSelectedCategory] = useState(ALL);
  const [filterData, setFilterData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [isPage, setIsPage] = useState(1);
  const [isTotalRecord, setIsTotalRecord] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  // Gọi API tất cả
  const callAPIListOrder_AllWallet = async (type, page) => {
    try {
      const response = await fetchHistoryStep({
        'TOKEN': session_token,
        'TYPE': type,
        'PAYMENT_TYPE': 0,
        'PAGE': page
      })

      setIsTotalRecord(response?.data?.dInfo?.total_record)
      setFilterData(response?.data?.data)

      return response;

    } catch (error) {
      console.log('Error list order:', error);
    }
  }


  // Gọi API Ví tiền
  const callAPIListOrder_WalletCashback = async (type, page) => {
    try {
      const response = await fetchHistoryStep({
        'TOKEN': session_token,
        'TYPE': type,
        'PAYMENT_TYPE': walletMoney,
        'PAGE': page
      })

      setIsTotalRecord(response?.data?.dInfo?.total_record)
      setFilterData(response?.data?.data)

      return response;
    } catch (error) {
      console.log('Error list order:', error);
    }
  }

  // Gọi API ví điểm
  const callAPIListOrder_WalletPoint = async (type, page) => {
    try {
      const response = await fetchHistoryStep({
        'TOKEN': session_token,
        'TYPE': type,
        'PAYMENT_TYPE': walletPoint,
        'PAGE': page
      })

      setIsTotalRecord(response?.data?.dInfo?.total_record)
      setFilterData(response?.data?.data)
      return response;

    } catch (error) {
      console.log('Error list order:', error);
    }
  }

  const listOrder = async () => {
    setFilterData([])
    setIsPage(1)
    setIsLoadMore(false)
    setIsLoading(true)
    if (selectedCategory === ALL) {
      await callAPIListOrder_AllWallet(selectedStatus?.id, 1);
    } else if (selectedCategory === 'Ví VNĐ') {
      await callAPIListOrder_WalletCashback(selectedStatus?.id, 1);
    } else if (selectedCategory === 'Ví điểm') {
      await callAPIListOrder_WalletPoint(selectedStatus?.id, 1);
    }
    setIsLoadMore(true)
    setRefreshing(false)
    setIsLoading(false)
  }

  useEffect(() => {
    listOrder()
  }, [selectedCategory, data, navigation, selectedStatus]);

  // Gọi API khi màn hình được gọi
  useEffect(() => {
    const unsubcribe = navigation.addListener('focus', () => { listOrder() })

    return unsubcribe;
  }, [selectedCategory, data, navigation, selectedStatus])

  // LoadMore
  const handleLoadMore = async () => {
    if (filterData?.length < isTotalRecord && isLoadMore == true) {
      setIsLoading(true);
      try {
        let nextPage = isPage + 1;
        let response;

        if (selectedCategory === ALL) {
          response = await callAPIListOrder_AllWallet(selectedStatus?.id, nextPage);
        } else if (selectedCategory === 'Ví VNĐ') {
          response = await callAPIListOrder_WalletCashback(selectedStatus?.id, nextPage);
        } else if (selectedCategory === 'Ví điểm') {
          response = await callAPIListOrder_WalletPoint(selectedStatus?.id, nextPage);
        }

        if (response?.data?.data?.length > 0) {
          setFilterData([...filterData, ...response?.data?.data]);
          setIsPage(nextPage);
        }
        setIsLoading(false)
      } catch (error) {
        console.log('Error loading more data:', error);
      }

    } else {
      setIsLoading(false);
    }
  }

  // onReFresh
  const onRefreshs = () => {
    setRefreshing(true);
    listOrder();
    setRefreshing(false);
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
        text="Đơn hàng"
        iconLeft={require('../../assets/Arrow1.png')}
        iconRight={require('../../assets/Rectangle366.png')}
        onPressLeft={() => navigation.goBack()}
      />

      <View style={styles.categoriContainer}>
        <StatusMenu
          dataStatus={deliverySteps}
          selectedStatus={selectedStatus}
          onCategoryPress={setSelectedStatus}
        />
        <StatusWallet
          categori={['Tất cả', 'Ví VNĐ', 'Ví điểm']}
          selectedCatogory={selectedCategory}
          onCategoryPress={setSelectedCategory}
        />
      </View>

      <Text style={{ fontSize: 16, color: '#000000', marginVertical: 12 }}>
        Đơn đã đặt
      </Text>

      <FlatList
        data={filterData}
        style={{ flex: 1 }}
        keyExtractor={(item, index) => `${item.id}_${index}`}
        renderItem={({ item }) => {
          return <SingleMenu key={item?.id} style={{ marginHorizontal: 2 }} data={item} />;
        }}
        ListEmptyComponent={() => {
          if (isLoadMore) {
            return (
              <View style={{
                flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: WINDOW_HEIGHT / 6
              }}>
                < Image style={{ width: 95, height: 95 }} source={require('../../assets/sad.png')} />
                <Text style={{ textAlign: 'center', color: '#000000', fontSize: 20, marginTop: 16 }}>Bạn chưa có đơn hàng</Text>
              </View>
            )
          }
          return null;
        }}
        refreshControl={
          < RefreshControl
            refreshing={refreshing}
            colors={['white']}
            progressBackgroundColor={'#005AA9'}
            onRefresh={onRefreshs}
          />
        }
        onEndReached={handleLoadMore}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView >
  );
};

export default React.memo(Menu);
