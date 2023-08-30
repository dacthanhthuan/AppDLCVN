import React, { useState, useEffect } from 'react';
import styles from './styles';
import {
  Image,
  SafeAreaView,
  Text,
  View,
  FlatList,
  Dimensions,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import Input from '../../component/Input';
import CardProduct from '../../component/CardProduct';
import Header from '../../component/Header';

import { useSelector } from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { WINDOW_HEIGHT, formatprice } from '../../global';
import { fetchProductSupplier } from '../AddAddress/http';
const { height } = Dimensions.get('window')

const ProductSupplier = ({ navigation, route }) => {

  const [keywork, setKeywork] = useState('');
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isTotalRecord, setIsTotalRecord] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [isPage, setIsPage] = useState(1);

  const { data } = useSelector((state) => state.postReducers)
  const { item } = route?.params || {};

  const callAPIProductSupplier = async (page) => {
    try {
      const response = await fetchProductSupplier({
        'TOKEN': data?.data?.session_token,
        'KEYWORK': keywork,
        'SUPPLIERID': item?.id,
        'PAGE': page,
      })

      setListData(response?.data?.l)
      setIsTotalRecord(response?.data?.total_record);
      setRefreshing(false)
      setLoading(false)



      return response;
      // console.log(response?.data?.l);
    } catch (error) {
      console.log('Error product supplier', error);
    }
  }

  useEffect(() => {
    setLoading(true)
    callAPIProductSupplier(1)
  }, [data, keywork])

  // Refresh 
  const onRefreshs = () => {
    setRefreshing(true)
    setListData([])
    setIsPage(1)
    callAPIProductSupplier(1)
  }

  useEffect(() => {
    console.log('lengthData:>>', listData?.length);
    console.log('isTotalRecord:>>', isTotalRecord);
  }, [listData, isTotalRecord])

  // LoadMore
  // const handleLoadMore = async () => {
  //   if (listData?.length < isTotalRecord) {
  //     setLoading(true)
  //     try {
  //       let newPage = isPage + 1;
  //       let response;
  //       console.log('isPage:>>', isPage);

  //       response = await callAPIProductSupplier(newPage);
  //       console.log(response?.data?.l?.length);

  //       setListData([...listData, ...response?.data?.l]);
  //       setIsPage(newPage);

  //     } catch (error) {
  //       console.log('Error loading more data:', error);
  //     }
  //   } else {
  //     setLoading(false)
  //   }
  // };


  // Hiện loading
  const renderFooter = () => {
    if (loading) {
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
        iconLeft={require('../../assets/Arrow1.png')}
        onPressLeft={() => navigation.goBack()}
        text="Sản phẩm nhà cung cấp"
      />
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        {item?.image !== null ? (
          <Image style={{ width: 100, height: 100 }} source={{ uri: item?.logo }} />
        ) : (
          <View style={{ width: 100, height: 100 }} />
        )
        }
        <Text style={styles.title}>{item?.name}</Text>
      </View>

      <Input
        onChangeText={setKeywork}
        placeholder="Bạn cần tìm gì ?"
        value={keywork}
      />

      <Text style={{ marginTop: 25, color: '#000000', fontSize: 16, fontWeight: '400', marginBottom: 16 }}>GỢI Ý HÔM NAY</Text>

      <SkeletonPlaceholder>

      </SkeletonPlaceholder>
      <FlatList
        data={listData}
        numColumns={2}
        style={{ marginTop: 4, width: '100%' }}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => String(item?.product_id)}
        renderItem={({ item, index }) => {
          return (
            <CardProduct
              style={index % 2 === 0
                ? {}
                : { marginRight: 4 }}
              key={item?.product_id}
              image={item?.image}
              title={item?.product_name}
              categori={item?.product_id}
              price={formatprice(item?.price)}
              onPress={() => navigation.navigate('DetailProduct', { item })} />
          )
        }}
        refreshControl={
          < RefreshControl
            refreshing={refreshing}
            colors={['white']}
            progressBackgroundColor={'#005AA9'}
            onRefresh={onRefreshs}
          />
        }
        // onEndReached={handleLoadMore}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
};

export default React.memo(ProductSupplier);



