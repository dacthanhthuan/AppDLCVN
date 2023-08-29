import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import styles from './styles';
import Header from '../../component/Header';
import HistoryMoney from '../../component/HistoryMoney';
import {useDispatch, useSelector} from 'react-redux';
import {
  WalletFundHistoryList,
  WalletHistoryList,
} from '../../redux/actions/walletActions';
import {
  WalletStatusConvert,
  formatPoint,
  formatPrice,
  secondToGlobalDate,
} from '../../global';
import LoadmoreIndicator from '../../component/Home/LoadmoreIndicator';
import StatusMenu from '../../component/StatusMenu';

const WalletHistory = ({navigation, route}: any) => {
  const dispatch = useDispatch();

  const {wallet_id} = route.params;

  const lWallet = useSelector((state: any) => state.user.lWallet);
  const session_token = useSelector((state: any) => state.user.session_token);
  const historyList = useSelector((state: any) => state.wallet.historyWallet);
  const historyListLoading = useSelector(
    (state: any) => state.wallet.historyWaletLoading,
  );
  const historyNextPage = useSelector(
    (state: any) => state.wallet.historyWalletNextPage,
  );
  const historyCurrentRecord = useSelector(
    (state: any) => state.wallet.historyWalletCurrentRecord,
  );
  const historyTotalRecord = useSelector(
    (state: any) => state.wallet.historyWalletTotalRecord,
  );

  const [refreshing, setRefreshing] = useState(false);
  const [loadmore, setLoadmore] = useState(false);
  const [selectedId, setSelectedId] = useState(wallet_id);

  //  get history wallet list
  const getWalletHistoryListApi = (page = 1, wallet_id?: any) => {
    dispatch(
      WalletHistoryList.start({
        token: session_token,
        page: page,
        wallet_id: wallet_id,
      }),
    );
  };

  // initial rendered: clear old data and get new data
  useEffect(() => {
    dispatch(WalletHistoryList.clear());
    getWalletHistoryListApi(1, selectedId);
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
    dispatch(WalletHistoryList.clear());
    getWalletHistoryListApi(1, selectedId);
  };

  // handle load more feature
  const handleLoadmore = () => {
    if (historyCurrentRecord < historyTotalRecord && !historyListLoading) {
      setLoadmore(true);
      getWalletHistoryListApi(historyNextPage, selectedId);
    }
  };

  // handle select another wallet
  const handleSelected = useCallback((id: any) => {
    setSelectedId(id);
    dispatch(WalletHistoryList.clear());
    getWalletHistoryListApi(1, id);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        onPressLeft={() => navigation.goBack()}
        iconLeft={require('../../assets/imgSupplier/Arrow_1.png')}
        text={'Lịch sử giao dịch'}
        iconRight={undefined}
        onPressRight={undefined}
        containerStyle={{padding: 15}}
        showCartBadge={undefined}
      />
      <View style={styles.menu}>
        <StatusMenu
          categori={lWallet}
          selectedCatogory={selectedId}
          onCategoryPress={handleSelected}
        />
      </View>

      <FlatList
        contentContainerStyle={{padding: 15}}
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

export default WalletHistory;

const RenderItem = ({item}: any) => {
  const date = secondToGlobalDate(item.created_at).toLocaleString();
  const amount =
    item.wallet_id == 1 ? formatPrice(item.amount) : formatPoint(item.amount);
  const from = item.from_fullname;
  const to = item.to_fullname;

  return (
    <HistoryMoney
      all={true}
      isWidthDraw={false}
      img={require('../../assets/Rectangle305.png')}
      datetime_1={'Ngày thực hiện:'}
      money_1={'Số tiền:'}
      action_1={'Người chuyển:'}
      status_1={'Người nhận:'}
      datetime_2={date}
      money_2={amount}
      action_2={from}
      status_2={to}
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
        color: '#8C3333',
        fontWeight: '500',
      }}
      style_4={{
        fontSize: 13,
        color: '#557A46',
        fontWeight: '500',
      }}
      data={item}
    />
  );
};
