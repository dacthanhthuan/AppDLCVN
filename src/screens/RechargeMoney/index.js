import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, FlatList} from 'react-native';
import Header from '../../component/Header';
import HistoryMoney from '../../component/HistoryMoney';
import styles from './style';
import {
  WalletStatusConvert,
  formatPrice,
  secondToGlobalDate,
} from '../../global';
import {ActivityIndicator} from 'react-native';
import {Text} from 'react-native';
import {RefreshControl} from 'react-native';
import LoadmoreIndicator from '../../component/Home/LoadmoreIndicator';
import {useDispatch, useSelector} from 'react-redux';
import {WalletFundHistoryList} from '../../redux/actions/walletActions';

const RechargeHistory = ({navigation}) => {
  const dispatch = useDispatch();

  const session_token = useSelector(state => state.user.session_token);
  const historyList = useSelector(state => state.wallet.fundHistoryList);
  const historyListLoading = useSelector(
    state => state.wallet.fundHistoryListLoading,
  );
  const historyNextPage = useSelector(
    state => state.wallet.fundHistoryNextPage,
  );
  const historyCurrentRecord = useSelector(
    state => state.wallet.fundHistoryCurrentRecord,
  );
  const historyTotalRecord = useSelector(
    state => state.wallet.fundHistoryTotalRecord,
  );

  const [refreshing, setRefreshing] = useState(false);
  const [loadmore, setLoadmore] = useState(false);

  //  get history list
  const getWalletHistoryListApi = (page = '1') => {
    try {
      dispatch(
        WalletFundHistoryList.start({
          page: page,
          token: session_token,
          type: '1',
        }),
      );
    } catch (error) {}
  };

  // initial rendered: clear old data and get new data
  useEffect(() => {
    dispatch(WalletFundHistoryList.clear());
    getWalletHistoryListApi();
  }, []);

  // change refreshing, loadmore state after loaded
  useEffect(() => {
    if (!historyListLoading) {
      setRefreshing(false);
      setLoadmore(false);
    }
  }, [historyList]);

  // handle refreshing feature
  const handleRefreshing = () => {
    setRefreshing(true);
    dispatch(WalletFundHistoryList.clear());
    getWalletHistoryListApi();
  };

  // handle load more feature
  const handleLoadmore = () => {
    if (historyCurrentRecord < historyTotalRecord && !historyListLoading) {
      setLoadmore(true);
      getWalletHistoryListApi(historyNextPage);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        onPressLeft={() => navigation.goBack()}
        iconLeft={require('../../assets/imgSupplier/Arrow_1.png')}
        text={'Lịch sử nạp tiền'}
        iconRight={undefined}
        onPressRight={undefined}
        containerStyle={undefined}
        showCartBadge={undefined}
      />
      <FlatList
        style={{marginTop: 15}}
        removeClippedSubviews
        initialNumToRender={7}
        data={historyList}
        renderItem={RenderItem}
        ListEmptyComponent={
          historyListLoading && !refreshing ? (
            <ActivityIndicator size={'large'} color={'#005aa9'} />
          ) : !refreshing ? (
            <Text style={styles.emptyListText}>
              Không có giao dịch phát sinh
            </Text>
          ) : null
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            colors={['white']}
            progressBackgroundColor={'#005AA9'}
            onRefresh={handleRefreshing}
          />
        }
        onEndReached={handleLoadmore}
      />
      {loadmore ? <LoadmoreIndicator /> : null}
    </SafeAreaView>
  );
};

export default RechargeHistory;

const RenderItem = ({item}) => {
  const date = secondToGlobalDate(item.created_at).toLocaleString();
  const amount = formatPrice(item.amount);
  const bank_name = item.bank_name;
  const status = WalletStatusConvert(item.status);

  return (
    <HistoryMoney
      img={require('../../assets/imgHistorymoney/recharge_money.png')}
      datetime_1={'Ngày thực hiện:'}
      money_1={'Số tiền:'}
      action_1={'Nạp vào:'}
      status_1={'Trạng thái:'}
      datetime_2={date}
      money_2={'+' + amount}
      action_2={bank_name}
      status_2={status}
      style_1={{
        fontSize: 13,
        color: '#000000',
        fontWeight: '300',
      }}
      style_2={{
        fontSize: 13,
        color: '#005AA9',
        fontWeight: '300',
      }}
      style_3={{
        fontSize: 13,
        color: '#000000',
        fontWeight: '300',
        textTransform: 'capitalize',
      }}
      style_4={{
        fontSize: 13,
        color: item.status == 0 || item.status == 1 ? '#19A538' : 'red',
        fontWeight: '300',
      }}
      data={item}
      all={false}
    />
  );
};
