import React, {useState, useEffect} from 'react';
import styles from './styles';
import {
  Image,
  SafeAreaView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StatusBar,
  RefreshControl,
} from 'react-native';
import Input from '../../component/Input';
import CardProduct from '../../component/Warehouse/CardProduct';
import Header from '../../component/Header';
import {formatPoint} from '../../global';
import {useDispatch, useSelector} from 'react-redux';
import {
  clientProductListClear,
  clientProductListStart,
} from '../../redux/actions/productListActions';
import WarehouseRenderItem from '../../component/Warehouse/WarehouseRenderItem';
import {CHANGE_POINT_LIST} from '../../redux/actions/types';
import LoadmoreIndicator from '../../component/Home/LoadmoreIndicator';
import WarehouseSkeleton from '../../component/Warehouse/WarehouseSkeleton';

const Warehouse = ({navigation}) => {
  const dispatch = useDispatch();
  const changePointList = useSelector(state => state.changePoint);
  const user = useSelector(state => state.user);

  const [filterData, setFilterData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loadmore, setLoadmore] = useState(false);
  const [skeletonVisible, setSekeletonVisible] = useState(true);
  const [keywork, setKeywork] = useState('');

  // useEffect(() => {
  //   if (keywork?.length > 0) {
  //     const filteredItems = data?.filter(rec =>
  //       rec?.title?.toLocaleLowerCase()?.includes(keywork?.toLocaleLowerCase()),
  //     );
  //     setFilterData(filteredItems);
  //   } else {
  //     setFilterData(data);
  //   }
  // }, [keywork]);

  // get product list from server
  const getChangePointListApi = (page = 1) => {
    try {
      dispatch(clientProductListStart(page, '1', user.session_token));
    } catch (error) {
      throw new Error(error);
    }
  };

  // call api initial rendered
  useEffect(() => {
    getChangePointListApi();
  }, []);

  // set data from redux to flatlist data
  useEffect(() => {
    setFilterData(changePointList.data);
    if (!changePointList.loading) {
      setRefreshing(false);
      setLoadmore(false);
    }
  }, [changePointList]);

  // refreshing feature
  useEffect(() => {
    if (refreshing) {
      dispatch(clientProductListClear(CHANGE_POINT_LIST.CLEAR));
      getChangePointListApi();
      setLoadmore(false);
    }
  }, [refreshing]);

  // loadmore feature
  const onLoadmore = () => {
    if (!changePointList.loading) {
      getChangePointListApi(changePointList.data.length + 1);
    }
  };

  // when user login, clear changepoint list data
  useEffect(() => {
    if (user.login.status) {
      dispatch(clientProductListClear(CHANGE_POINT_LIST.CLEAR));
      getChangePointListApi();
    }
  }, [user]);

  // skeleton visible handler
  useEffect(() => {
    if (changePointList.loading && !loadmore) {
      setSekeletonVisible(true);
    } else setSekeletonVisible(false);
  }, [changePointList]);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 8,
        }}>
        <Header
          iconLeft={require('../../assets/white.png')}
          text="Kho đổi điểm"
          iconRight={require('../../assets/Vector.png')}
          onPressRight={() => {
            navigation.navigate('Cart');
          }}
        />
        <View style={styles.rowPoint}>
          <Text style={styles.helloText}>Chào {user.fullname}</Text>
          <View style={styles.pointContainer}>
            <Text style={styles.pointText}>{user.lWallet[1].amount}</Text>
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
        {/* <Text
          style={{
            marginTop: 25,
            color: '#000000',
            fontSize: 16,
            fontWeight: '400',
          }}>
          {filterData.length} sản phẩm phù hợp
        </Text> */}
      </View>

      {skeletonVisible ? (
        <WarehouseSkeleton />
      ) : (
        <FlatList
          data={filterData}
          // numColumns={2}
          style={styles.flatlist}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              colors={['white']}
              progressBackgroundColor={'#005AA9'}
              onRefresh={() => setRefreshing(true)}
            />
          }
          onEndReached={() => {
            if (
              changePointList.data.length + 1 <
              changePointList.data[0].data.perpage
            ) {
              setLoadmore(true);
              onLoadmore();
            }
          }}
          onEndReachedThreshold={0.1}
          // ListHeaderComponent={<View style={{marginTop: 12}}></View>}
          // ListEmptyComponent={
          //   <>
          //     <Text style={{textAlign: 'center'}}>Không tìm thấy sản phẩm.</Text>
          //   </>
          // }
          renderItem={({item}) => <WarehouseRenderItem item={item} />}
        />
      )}
      {loadmore ? <LoadmoreIndicator /> : null}
    </SafeAreaView>
  );
};

export default React.memo(Warehouse);
