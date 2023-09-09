import {SafeAreaView} from 'react-native';
import styles from './styles';
import Header from '../../component/Header';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useCallback, useEffect, useState} from 'react';
import RHBList from '../../component/ReferralH_BList';
import LoadmoreIndicator from '../../component/Home/LoadmoreIndicator';
import {ReferralMemberBookingOrder} from '../../redux/actions/referralMemberActions';

export default function ReferralBookingList() {
  const navigation = useNavigation();
  const route = useRoute();

  const {data}: any = route.params;

  const dispatch = useDispatch();

  const session_token = useSelector((s: any) => s.user.session_token);

  const list = useSelector((s: any) => s.referralMember.bookingOrder);
  const loading = useSelector((s: any) => s.referralMember.bookingOrderLoading);
  const total = useSelector((s: any) => s.referralMember.bookingOrderTotal);
  const current = useSelector((s: any) => s.referralMember.bookingOrderCurrent);
  const nextPage = useSelector(
    (s: any) => s.referralMember.bookingOrderNextPage,
  );

  const [refreshing, setRefreshing] = useState(false);
  const [loadmore, setLoadmore] = useState(false);

  // event handle: refreshing
  const handleOnRefreshing = useCallback(() => {
    setRefreshing(true);

    dispatch(ReferralMemberBookingOrder.clear());
    dispatch(ReferralMemberBookingOrder.start(session_token, data.user_id, 1));
  }, []);

  // event handle: load more
  const handleOnLoadmore = useCallback(() => {
    if (current < total && !loading) {
      setLoadmore(true);

      dispatch(
        ReferralMemberBookingOrder.start(session_token, data.user_id, nextPage),
      );
    }
  }, []);

  // side effect: after initial rendering, synchronous list data
  useEffect(() => {
    // dispatch aciton to call api
    dispatch(ReferralMemberBookingOrder.start(session_token, data.user_id, 1));

    // cleanup: clear data
    return () => {
      dispatch(ReferralMemberBookingOrder.clear());
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
        text={`Đơn đặt hàng`}
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
