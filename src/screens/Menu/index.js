import React, {useState, useEffect, useCallback} from 'react';
import styles from './styles';
import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  View,
  RefreshControl,
  FlatList,
} from 'react-native';
import Header from '../../component/Header';
import SingleMenu from '../../component/SingleMenu';
import StatusMenu from '../../component/StatusMenu';
import StatusWallet from '../../component/StatusWallet';
import {useIsReady} from '../../global';
import LoadingOverlay from '../../component/LoadingOverlay';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearListOrder,
  getListOrderStart,
} from '../../redux/actions/orderActions';
import {useImmer} from 'use-immer';
import LoadmoreIndicator from '../../component/Home/LoadmoreIndicator';
import LoginNow from '../LoginNow';

const ALL = 'Tất cả';

const Menu = ({navigation}) => {
  const isReady = useIsReady();
  const dispatch = useDispatch();

  const loadingApp = useSelector(state => state.app.loading); // loading domain and api state

  const session_token = useSelector(state => state.user.session_token);
  const login = useSelector(state => state.user.login.status);

  const orderList = useSelector(state => state.order.data);
  const currentRecord = useSelector(state => state.order.current_record);
  const totalRecord = useSelector(state => state.order.total_record);
  const nextPage = useSelector(state => state.order.nextPage);
  const listOrderState = useSelector(state => state.order.listOrderState);

  const lDeliverySteps = useSelector(state => state.app.data.lDeliverySteps);
  const walllet_payment_type = useSelector(
    state => state.app.data.payment_type_wallet_main,
  );
  const cashback_payment_type = useSelector(
    state => state.app.data.payment_type_wallet_cashback,
  );

  // new order state
  const newOrderState = useSelector(state => state.order.newOrderState);
  // delete order state
  const deleteOrderState = useSelector(state => state.order.deleteOrderState);
  const orderMsg = useSelector(state => state.order.message);

  const [filterData, updateFilterData] = useImmer([]);
  const [paymentType, setPaymentType] = useState(ALL);
  const [orderStatus, setOrderStatus] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  // call api to get order list data
  const getOrderListApi = (page = 1, payment_type, orderStatus) => {
    dispatch(
      getListOrderStart({
        token: session_token,
        page: page,
        type: orderStatus,
        payment_type: payment_type,
      }),
    );
  };

  // whenever loading app done
  useEffect(() => {
    if (!loadingApp && login) {
      dispatch(clearListOrder());
      getOrderListApi();
    }
  }, [loadingApp]);

  // whenever new order is create (and initial rendered)
  useEffect(() => {
    if (!newOrderState && !orderMsg && login) {
      setPaymentType(ALL);
      setOrderStatus(0);
      dispatch(clearListOrder());
      getOrderListApi();
    }
  }, [newOrderState]);

  // whenever order is canceled
  useEffect(() => {
    if (!deleteOrderState && !orderMsg && login) {
      dispatch(clearListOrder());

      getOrderListApi(
        1,
        paymentType == 'Tất cả'
          ? undefined
          : paymentType == 'Ví VNĐ'
          ? walllet_payment_type
          : cashback_payment_type,
        orderStatus,
      );
    }
  }, [deleteOrderState, orderMsg]);

  // update order data after load
  useEffect(() => {
    updateFilterData(
      // update data sort by last update
      orderList.sort((a, b) => {
        console.log(parseInt(a.last_update) - parseInt(b.last_update));
        if (parseInt(a.last_update) - parseInt(b.last_update) > 0) {
          return -1;
        } else if (parseInt(a.last_update) - parseInt(b.last_update) < 0) {
          return 1;
        }
        return 0;
      }),
    );

    if (!listOrderState) {
      setLoadMore(false);
      setRefreshing(false);
    }
  }, [orderList]);

  // if user login or refresh, re-load order list
  useEffect(() => {
    if (refreshing || login) {
      if (login) {
        dispatch(clearListOrder());
        getOrderListApi(
          1,
          paymentType == 'Tất cả'
            ? ''
            : paymentType == 'Ví VNĐ'
            ? walllet_payment_type
            : cashback_payment_type,
          orderStatus,
        );
        setLoadMore(false);
      }
    }
  }, [login, refreshing]);

  // get data whenever user change their choose:
  useEffect(() => {
    if (login) {
      // clear order list whenever user change list
      dispatch(clearListOrder());

      getOrderListApi(
        1,
        paymentType == 'Tất cả'
          ? ''
          : paymentType == 'Ví VNĐ'
          ? walllet_payment_type
          : cashback_payment_type,
        orderStatus,
      );
    }
  }, [orderStatus, paymentType]);

  // handle load more
  const handleLoadmore = () => {
    if (!listOrderState && !loadMore) {
      getOrderListApi(nextPage);
    }
  };

  // check list record
  const checkOrderListRecord = () => {
    return currentRecord < totalRecord;
  };

  return !login ? (
    <LoginNow />
  ) : !isReady ? (
    <LoadingOverlay />
  ) : (
    <SafeAreaView style={styles.container}>
      <Header
        text="Đơn hàng"
        iconLeft={require('../../assets/Arrow1.png')}
        iconRight={require('../../assets/Rectangle366.png')}
        onPressLeft={() => navigation.goBack()}
        containerStyle={{paddingHorizontal: 16, paddingTop: 16}}
      />

      <View style={styles.categoriContainer}>
        <StatusMenu
          categori={lDeliverySteps}
          selectedCatogory={orderStatus}
          onCategoryPress={setOrderStatus}
        />
        <StatusWallet
          categori={['Tất cả', 'Ví VNĐ', 'Ví điểm']}
          selectedCatogory={paymentType}
          onCategoryPress={setPaymentType}
        />
      </View>

      <Text
        style={{
          fontSize: 16,
          color: '#000000',
          marginVertical: 12,
          paddingHorizontal: 16,
        }}>
        Đơn {orderStatus != -1 ? lDeliverySteps[orderStatus].name : 'huỷ'}
      </Text>

      <FlatList
        data={filterData}
        style={{flex: 1, padding: 16}}
        showsVerticalScrollIndicator={true}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            colors={['white']}
            progressBackgroundColor={'#005AA9'}
            onRefresh={() => setRefreshing(true)}
          />
        }
        renderItem={({item}) => {
          return <SingleMenu style={{marginHorizontal: 2}} data={item} />;
        }}
        ListEmptyComponent={
          listOrderState && !refreshing ? (
            <ActivityIndicator size={'large'} />
          ) : !refreshing ? (
            <Text style={{color: 'black', fontSize: 15}}>Không có đơn</Text>
          ) : null
        }
        onEndReached={() => {
          if (checkOrderListRecord()) {
            setLoadMore(true);
            handleLoadmore();
          }
        }}
        initialNumToRender={3}
        maxToRenderPerBatch={5}
        windowSize={15}
        getItemLayout={(_, index) => ({
          index,
          length: 280,
          offset: 280 * index,
        })}
        removeClippedSubviews
      />
      {loadMore ? <LoadmoreIndicator /> : null}
    </SafeAreaView>
  );
};

export default React.memo(Menu);
