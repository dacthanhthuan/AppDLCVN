import {SafeAreaView} from 'react-native';
import styles from './styles';
import Header from '../../component/Header';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useCallback, useEffect, useState} from 'react';
import RHBList from '../../component/ReferralH_BList';
import LoadmoreIndicator from '../../component/Home/LoadmoreIndicator';
import {ReferralMemberHistoryOrder} from '../../redux/actions/referralMemberActions';

export default function ReferralHistoryList() {
  const navigation = useNavigation();
  const route = useRoute();

  const {data}: any = route.params;

  const dispatch = useDispatch();

  const session_token = useSelector((s: any) => s.user.session_token);

  const list = useSelector((s: any) => s.referralMember.historyOrder);
  const loading = useSelector((s: any) => s.referralMember.historyOrderLoading);
  const total = useSelector((s: any) => s.referralMember.historyOrderTotal);
  const current = useSelector((s: any) => s.referralMember.historyOrderCurrent);
  const nextPage = useSelector(
    (s: any) => s.referralMember.historyOrderNextPage,
  );

  const [refreshing, setRefreshing] = useState(false);
  const [loadmore, setLoadmore] = useState(false);

  // event handle: refreshing
  const handleOnRefreshing = useCallback(() => {
    setRefreshing(true);

    dispatch(ReferralMemberHistoryOrder.clear());
    dispatch(ReferralMemberHistoryOrder.start(session_token, data.user_id, 1));
  }, []);

  // event handle: load more
  const handleOnLoadmore = useCallback(() => {
    if (current < total && !loading) {
      setLoadmore(true);

      dispatch(
        ReferralMemberHistoryOrder.start(session_token, data.user_id, nextPage),
      );
    }
  }, []);

  // side effect: after initial rendering, synchronous list data
  useEffect(() => {
    // dispatch aciton to call api
    dispatch(ReferralMemberHistoryOrder.start(session_token, data.user_id, 1));

    // cleanup: clear data
    return () => {
      dispatch(ReferralMemberHistoryOrder.clear());
    };
  }, []);

  // side effect: synchronous with loading state
  useEffect(() => {
    if (!loading) {
      setRefreshing(false);
      setLoadmore(false);
    }
  }, [loading]);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        text={`Lịch sử bán trả hàng`}
        iconLeft={require('../../assets/Arrow1.png')}
        onPressLeft={() => navigation.goBack()}
        containerStyle={styles.header}
        onPressRight={undefined}
        showCartBadge={undefined}
        iconRight={undefined}
      />

      <RHBList
        data={list}
        refreshing={refreshing}
        loading={loading}
        onLoadmore={handleOnLoadmore}
        onRefresh={handleOnRefreshing}
      />

      {loadmore && <LoadmoreIndicator />}
    </SafeAreaView>
  );
}
