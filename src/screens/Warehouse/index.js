import React, {useState, useEffect, startTransition} from 'react';
import styles from './styles';
import {
  Image,
  SafeAreaView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Keyboard,
  RefreshControl,
} from 'react-native';
import Input from '../../component/Input';
import CardProduct from '../../component/Warehouse/CardProduct';
import Header from '../../component/Header';
import {formatPoint, nomarlizeVietNamese} from '../../global';
import {useDispatch, useSelector} from 'react-redux';
import {
  clientProductListClear,
  clientProductListStart,
} from '../../redux/actions/productListActions';
import {CHANGE_POINT_LIST} from '../../redux/actions/types';
import LoadmoreIndicator from '../../component/Home/LoadmoreIndicator';
import WarehouseSkeleton from '../../component/Warehouse/WarehouseSkeleton';

const Warehouse = ({navigation}) => {
  const dispatch = useDispatch();
  const changePointList = useSelector(state => state.changePoint.data);
  const totalRecord = useSelector(state => state.changePoint.total_record);
  const currentRecord = useSelector(state => state.changePoint.current_record);
  const listLoading = useSelector(state => state.changePoint.loading);
  const nextpage = useSelector(state => state.changePoint.nextpage);
  const user = useSelector(state => state.user);

  const [filterData, setFilterData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loadmore, setLoadmore] = useState(false);
  const [skeletonVisible, setSekeletonVisible] = useState(true);
  const [keyword, setKeyword] = useState('');
  let debounceTimeout;

  //debounce setting keyword
  const debounceSetkeyword = keyword => {
    // clear timeout whenever this function is invoked
    clearTimeout(debounceTimeout);

    // if keyword's length is greater 0 then debouncing setKeyword,
    // otherwise setKeyword immediately
    if (keyword.length > 0) {
      debounceTimeout = setTimeout(() => {
        setKeyword(keyword);
      }, 400);
    } else {
      setKeyword(keyword);
    }
  };

  // feature search
  useEffect(() => {
    const filteredItems = changePointList?.filter(rec =>
      nomarlizeVietNamese(rec?.product_name)?.includes(
        nomarlizeVietNamese(keyword),
      ),
    );
    setFilterData(filteredItems);
  }, [keyword]);

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
    setFilterData(changePointList);
    if (!listLoading) {
      setRefreshing(false);
      setLoadmore(false);
    }
  }, [changePointList, listLoading]);

  // refreshing feature
  useEffect(() => {
    if (refreshing) {
      dispatch(clientProductListClear(CHANGE_POINT_LIST.CLEAR));
      getChangePointListApi();
      setLoadmore(false);
      setKeyword('');
      Keyboard.dismiss();
    }
  }, [refreshing]);

  // loadmore feature
  const onLoadmore = () => {
    if (!listLoading) {
      getChangePointListApi(nextpage);
    }
  };

  // check loadmore data
  const checkListRecord = () => {
    return currentRecord < totalRecord;
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
    if (listLoading && !loadmore) {
      setSekeletonVisible(true);
    } else setSekeletonVisible(false);
  }, [listLoading]);

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
          showCartBadge={true}
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
          onChangeText={debounceSetkeyword}
          placeholder="Bạn cần tìm gì ?"
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
          style={styles.flatlist}
          contentContainerStyle={styles.flatlistContent}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              colors={['white']}
              progressBackgroundColor={'#005AA9'}
              onRefresh={() => setRefreshing(true)}
            />
          }
          onEndReached={() => {
            if (checkListRecord()) {
              setLoadmore(true);
              onLoadmore();
            }
          }}
          onEndReachedThreshold={0.1}
          renderItem={({item}) => {
            return <CardProduct item={item} />;
          }}
          removeClippedSubviews={true}
          windowSize={11}
        />
      )}
      {loadmore ? <LoadmoreIndicator /> : null}
    </SafeAreaView>
  );
};

export default React.memo(Warehouse);
