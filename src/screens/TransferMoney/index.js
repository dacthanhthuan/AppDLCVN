import React, {useState, useEffect, useRef, useCallback} from 'react';
import styles from './styles';
import {
  FlatList,
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  RefreshControl,
  Keyboard,
} from 'react-native';
import Header from '../../component/Header/index';
import Input from '../../component/Input';
import CardMember from '../../component/CardMember';
import Button from '../../component/Button';
import Modal from 'react-native-modal';
import CardSurplus from '../../component/CardSurplus';
import {WINDOW_HEIGHT, nomarlizeVietNamese} from '../../global';
import CurrencyInput from 'react-native-currency-input';
import {useDispatch, useSelector} from 'react-redux';
import {WalletReferralList} from '../../redux/actions/walletActions';
import {ActivityIndicator} from 'react-native';
import LoadmoreIndicator from '../../component/Home/LoadmoreIndicator';
import {riseNormalError} from '../../redux/actions/errorHandlerActions';

const TransferMoney = ({navigation, route}) => {
  const dispatch = useDispatch();

  const {wallet_id, transferee} = route.params;

  const lWallet = useSelector(state => state.user.lWallet);
  const login = useSelector(state => state.user.login.status);
  const session_token = useSelector(state => state.user.session_token);

  const referralList = useSelector(state => state.wallet.referralList);
  const referralListLoading = useSelector(
    state => state.wallet.referralListLoading,
  );
  const referralListNextPage = useSelector(
    state => state.wallet.referralListNextPage,
  );
  const referralListTotalRecord = useSelector(
    state => state.wallet.referralListTotalRecord,
  );
  const referralListCurrentRecord = useSelector(
    state => state.wallet.referralListCurrentRecord,
  );

  const wallet_type = wallet_id == lWallet[0].wallet_id ? 'tiền' : 'điểm';

  const [data, setData] = useState([]);
  const [searching, setSearching] = useState(false);

  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState('');
  const [selectUser, setSelectUser] = useState(transferee);
  const [error, setError] = useState('');

  const [refreshing, setRefreshing] = useState(false);
  const [loadmore, setLoadmore] = useState(false);

  const _searchDebounceTimer = useRef(undefined);

  // initial render: call api to get referral list or user login again
  useEffect(() => {
    if (referralList.length == 0) {
      dispatch(WalletReferralList.start(session_token, 1));
    }
  }, [login]);

  // whenever referral list data has change
  useEffect(() => {
    setData(referralList);
    if (!referralListLoading) {
      setRefreshing(false);
      setLoadmore(false);
    }
  }, [referralList]);

  const openBottomSheet = () => {
    setShowBottomSheet(true);
  };

  const closeBottomSheet = () => {
    setError('');
    setShowBottomSheet(false);
  };

  // handle continue button
  const handleContinueButton = () => {
    if (!selectUser) {
      // display error
      dispatch(
        riseNormalError({
          duration: 3000,
          message: 'Vui lòng chọn người nhận',
        }),
      );
    } else {
      openBottomSheet();
    }
  };

  // handle continue bottom sheet
  const handleContinueBottomSheet = () => {
    if (amount == 0) {
      // error
      setError('Vui lòng nhập số ' + wallet_type);
    } else {
      closeBottomSheet();

      navigation.navigate('TranferMoneyTwo', {
        amount,
        note,
        selectUser,
        wallet_id,
      });
    }
  };

  // handle select user
  const handleSelect = item => {
    setSelectUser(item);
  };

  // handle refreshing
  const handleRefreshing = () => {
    setRefreshing(true);
    Keyboard.dismiss();
    dispatch(WalletReferralList.clear());
    dispatch(WalletReferralList.start(session_token, 1));
  };

  // handle loadmore
  const handleLoadmore = () => {
    if (
      referralListCurrentRecord < referralListTotalRecord &&
      !referralListLoading &&
      !searching
    ) {
      setLoadmore(true);
      dispatch(WalletReferralList.start(session_token, referralListNextPage));
    }
  };

  // feature search
  const handleSearchFeature = useCallback(
    keyword => {
      clearTimeout(_searchDebounceTimer.current);

      if (keyword.length > 0) {
        setSearching(true);

        _searchDebounceTimer.current = setTimeout(() => {
          const filter = referralList.filter(item => {
            return (
              nomarlizeVietNamese(item.fullname).includes(
                nomarlizeVietNamese(keyword),
              ) || item.mobile.startsWith(keyword)
            );
          });

          setData(filter);
        }, 300);
      } else {
        setSearching(false);

        setData(referralList);
      }
    },
    [searching],
  );

  useEffect(() => {
    if (transferee) {
      handleContinueButton();
    }
  }, [transferee]);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        iconLeft={require('../../assets/Arrow1.png')}
        text={'Chuyển ' + wallet_type}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />

      <Input
        placeholder="Tìm kiếm thành viên"
        value={refreshing ? '' : undefined}
        onChangeText={handleSearchFeature}
      />

      <FlatList
        data={data}
        style={{marginTop: 15, flex: 1}}
        keyExtractor={item => item.user_id}
        ListEmptyComponent={
          referralListLoading && !refreshing ? (
            <ActivityIndicator color="#005aa9" />
          ) : !refreshing ? (
            <Text style={styles.listEmptyText}>
              Không có liên kết thành viên
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
        renderItem={({item}) => {
          return (
            <CardMember
              image={
                item.avatar
                  ? {uri: item.avatar}
                  : require('../../assets/no_avatar.png')
              }
              name={item.fullname}
              phone={item.mobile}
              isSelected={selectUser?.user_id == item.user_id}
              onPress={() => handleSelect(item)}
            />
          );
        }}
      />

      {loadmore ? <LoadmoreIndicator /> : null}

      <View style={{alignItems: 'center'}}>
        <Button
          text="Tiếp theo"
          style={{bottom: WINDOW_HEIGHT * 0, width: '90%'}}
          onPress={handleContinueButton}
        />
      </View>

      <Modal
        isVisible={showBottomSheet}
        onBackdropPress={closeBottomSheet}
        style={styles.bottomSheet}>
        <View style={styles.bottomSheetContent}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text></Text>
            <Text style={{fontSize: 20, color: '#005AA9'}}>
              Chuyển {wallet_type}
            </Text>
            <TouchableOpacity onPress={closeBottomSheet}>
              <Image
                style={{width: 24, height: 24}}
                source={require('../../assets/Rectangle328.png')}
              />
            </TouchableOpacity>
          </View>

          <CardSurplus
            style={{marginTop: 35}}
            isMainWallet={wallet_id == lWallet[0].wallet_id}
          />

          <Text style={styles.title}>Bạn muốn chuyển bao nhiêu?</Text>

          <CurrencyInput
            style={styles.value}
            value={amount}
            onChangeValue={setAmount}
            suffix={wallet_id == lWallet[0].wallet_id ? ' đ' : ' Point'}
            precision={0}
            placeholder={wallet_id == lWallet[0].wallet_id ? '0 đ' : '0 Point'}
            placeholderTextColor="#C2C2C2"
            keyboardType="number-pad"
            maxValue={100000000}
            autoFocus={showBottomSheet}
          />

          {error && <Text style={styles.errorText}>*{error}</Text>}

          <View style={styles.messContainer}>
            <Text style={styles.textMessage}>Lời nhắn</Text>
            <TextInput
              style={styles.messInput}
              placeholderTextColor="#C2C2C2"
              value={note}
              onChangeText={setNote}
            />
          </View>

          <View style={{alignItems: 'center'}}>
            <Button
              onPress={handleContinueBottomSheet}
              text="Tiếp tục"
              style={{width: '90%', marginTop: 50}}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default React.memo(TransferMoney);
