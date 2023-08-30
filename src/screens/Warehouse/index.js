import React, { useState, useEffect } from 'react';
import styles from './styles';
import {
  Image,
  SafeAreaView,
  Text,
  View,
  FlatList,
  Dimensions,
} from 'react-native';
import Input from '../../component/Input';
import CardProduct from '../../component/CardProduct';
import Header from '../../component/Header';
import { productWarehouse } from '../../redux/actions';
import store from '../../redux/store';
import { useSelector } from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { WINDOW_HEIGHT, formatPriceNotCurrency, formatpoint } from '../../global';
import { RefreshControl } from 'react-native';

const Warehouse = ({ navigation }) => {

  const [filteredUser, setFilteredUser] = useState([]);
  const [keywork, setKeywork] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const { warehouse, data, isLoggedIn, cartItemsPoint } = useSelector((state) => state.postReducers)


  const pointWallet = data?.data?.lWallet[1]?.amount; // Ví điểm 

  // Get isLogged từ AsyncStorage
  const callAPIProductWarehouse = () => {
    if (isLoggedIn) {
      const session_token = data?.data?.session_token;
      store.dispatch(productWarehouse("1", session_token, "1"))
    } else {
      store.dispatch(productWarehouse("1", '', "1"));
    }

    setLoading(true)

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout); // Clean up the timeout when component unmounts
  }

  useEffect(() => {
    callAPIProductWarehouse()
  }, [isLoggedIn, data]);

  // SearchXit
  useEffect(() => {
    if (keywork?.length > 0) {
      const filteredItems = filteredUser?.filter(rec =>
        rec?.product_name?.toLocaleLowerCase()?.includes(keywork?.toLocaleLowerCase()),
      )
      setFilteredUser(filteredItems);
    } else {
      setFilteredUser(warehouse?.data?.l);
    }
  }, [keywork, warehouse]);

  // Tính tổng số lượng trong giỏ hàng
  let totalIsQuantity = cartItemsPoint ? cartItemsPoint.reduce((total, item) => {
    // Thêm số lượng của mỗi sản phẩm vào tổng
    return total + (item?.quantity || 0);
  }, 0) : 1;

  // onReFresh
  const onRefreshs = () => {
    setRefreshing(true);
    setFilteredUser([])
    callAPIProductWarehouse()
    setRefreshing(false);
  }

  // Get window width
  const windowWidth = Dimensions.get('window').width;
  const skeletonProducts = Array.from({ length: 6 });

  return (
    <SafeAreaView style={styles.container}>
      <Header
        iconLeft={require('../../assets/white.png')}
        text="Kho đổi điểm"
        iconRight={require('../../assets/Home/Vector.png')}
        onPressRight={() => {
          navigation.navigate('CartPoint');
        }}
        dataCart={totalIsQuantity}
      />
      <View style={styles.rowPoint}>
        <Text style={styles.helloText}>Chào {data?.data?.fullname} !</Text>
        <View style={styles.pointContainer}>
          <Text style={styles.pointText}>{formatPriceNotCurrency(pointWallet ? pointWallet : 0)}</Text>
          <Image
            style={styles.iconAvatar}
            source={require('../../assets/Rectangle312.png')}
          />
        </View>
      </View>
      <Input
        onChangeText={setKeywork}
        placeholder="Bạn cần tìm gì ?"
        value={keywork}
      />
      <Text style={{ marginTop: 25, color: '#000000', fontSize: 16, fontWeight: '400', marginBottom: 16 }}>GỢI Ý HÔM NAY</Text>

      {loading ? (
        <SkeletonPlaceholder>
          {skeletonProducts.map((_, index) => (
            <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <View style={{ width: '49%', height: WINDOW_HEIGHT * 0.25, borderRadius: 8 }} />
              <View style={{ width: '49%', height: WINDOW_HEIGHT * 0.25, borderRadius: 8 }} />
            </View>
          ))}
        </SkeletonPlaceholder>
      )
        : <FlatList
          data={filteredUser}
          numColumns={2}
          style={{ marginTop: 4, width: '100%' }}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => String(item?.product_id)}
          ListEmptyComponent={(
            <>
              <Text style={{ textAlign: 'center' }}>No items found.</Text>
            </>
          )}
          renderItem={({ item, index }) => {
            const point = item?.price
            return (
              <CardProduct
                style={index % 2 === 0
                  ? {}
                  : { marginRight: 4 }}
                key={item?.product_id}
                image={item?.img_1}
                title={item?.product_name}
                categori={item?.product_id}
                price={formatpoint(point)}
                onPress={() => navigation.navigate('DetailProductPoint', { item })} />
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
        />
      }
    </SafeAreaView>
  );
};

export default React.memo(Warehouse);



