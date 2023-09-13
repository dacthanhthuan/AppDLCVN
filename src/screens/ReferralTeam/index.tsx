import {SafeAreaView, View} from 'react-native';
import styles from './styles';
import Header from '../../component/Header';
import {useNavigation, useRoute} from '@react-navigation/native';
import Search from '../../component/Search';
import ImageButton from '../../component/Home/ImageButton';
import ReferralTeamListGroup from '../../component/ReferralTeam/ListGroup';
import ReferralTeamListMember from '../../component/ReferralTeam/ListMember';
import ReferralTeamSearchFilter from '../../component/ReferralTeam/SearchFilter';
import {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  MemberListStartFormData,
  ReferralMemberList,
} from '../../redux/actions/referralMemberActions';
import LoadmoreIndicator from '../../component/Home/LoadmoreIndicator';
import FabAddButton from '../../component/ReferralTeam/FabAddButton';
import {Keyboard} from 'react-native';
import api_referral_member_list from '../../api/api_referral_member_list';
import {
  riseNetworkError,
  riseNormalError,
} from '../../redux/actions/errorHandlerActions';

let ignoreInitial = false;

export default function ReferralTeam() {
  const navigation = useNavigation();
  const route = useRoute();

  const {data}: any = route.params;

  const dispatch = useDispatch();

  const session_token = useSelector((state: any) => state.user.session_token);

  const memberList = useSelector((s: any) => s.referralMember.memberList);
  const statisticList = useSelector((s: any) => s.referralMember.statisticList);
  const memberListLoading = useSelector(
    (s: any) => s.referralMember.memberListLoading,
  );
  const memberListTotal = useSelector(
    (s: any) => s.referralMember.memberListTotal,
  );
  const memberListCurrent = useSelector(
    (s: any) => s.referralMember.memberListCurrent,
  );
  const memberListNextPage = useSelector(
    (s: any) => s.referralMember.memberListNextPage,
  );
  const updateAddState = useSelector(
    (s: any) => s.referralMember.updateAddState,
  );

  const [members, setMembers] = useState<any>([]);
  const [statistics, setStatistics] = useState<any>([]);
  const [loading, setLoading] = useState<any>(true);
  const [total, setTotal] = useState<any>(0);
  const current = useRef(0);
  const nextPage = useRef(1);

  const [filterVisible, setFilterVisible] = useState(false);
  const filter = useRef({
    sort: '',
    type: '',
    date: '',
  });
  const [refreshing, setRefreshing] = useState(false);
  const [loadmore, setLoadmore] = useState(false);
  const [keyword, setKeyword] = useState('');
  const groupId = useRef<any>(undefined);

  // event handle: dispatch action get member list
  const fetchApiRedux = (
    page: number | string = 1,
    sort?: string,
    type?: string,
    keyword?: string,
    groupId?: string,
  ) => {
    dispatch(
      ReferralMemberList.start({
        token: session_token,
        page: page,
        sort: sort ? sort : '',
        field: type ? type : '',
        keyword: keyword ? keyword : '',
        user_id: data?.user_id ? data?.user_id : '',
        member_group_id: groupId ? groupId : '',
      }),
    );
  };

  // event handle: fetch data from api
  const fetchScreenData = (
    page: number | string = 1,
    sort?: string,
    type?: string,
    keyword?: string,
    groupId?: string,
  ) => {
    fetchData(
      {
        token: session_token,
        page: page,
        sort: sort ? sort : '',
        field: type ? type : '',
        keyword: keyword ? keyword : '',
        user_id: data?.user_id ? data?.user_id : '',
        member_group_id: groupId ? groupId : '',
      },
      res => {
        setMembers((arr: any) => [...arr, ...res.list_members]);
        setStatistics((arr: any) => [...arr, ...res.lStatistic]);
        setLoading(false);
        setRefreshing(false);
        setTotal(res.total_record);
        current.current = current.current + res.list_members.length;
        nextPage.current = nextPage.current + 1;
      },
      msg => {
        if (msg instanceof Error) {
          dispatch(
            riseNetworkError({
              error: msg,
              visible: true,
            }),
          );
        } else {
          dispatch(
            riseNormalError({
              duration: 3000,
              message: msg,
            }),
          );
        }
      },
    );
  };

  // side effect: initial rendering
  useEffect(() => {
    if (!data.user_id) {
      dispatch(ReferralMemberList.clear());
      fetchApiRedux(1);
    } else {
      fetchScreenData(1);
    }
  }, []);

  // side effect: synchronous redux data with state
  useEffect(() => {
    // if have no user_id, set data to display from redux
    if (!data.user_id) {
      setMembers(memberList);

      setStatistics(statisticList);

      setLoading(memberListLoading);

      setTotal(memberListTotal);
    }

    if (!memberListLoading) {
      setRefreshing(false);
      setLoadmore(false);
    }
  }, [memberList, statisticList, memberListLoading, memberListTotal]);

  // side effect: synchronous redux data with ref
  useEffect(() => {
    if (!data.user_id) {
      current.current = memberListCurrent;
      nextPage.current = memberListNextPage;
    }
  }, [memberListCurrent, memberListNextPage]);

  // side effect: whenever update or add state success:
  useEffect(() => {
    if (updateAddState && ignoreInitial) {
      handleOnRefresh();
    }

    return () => {
      ignoreInitial = true;
    };
  }, [updateAddState]);

  // event handle: apply filter
  const handleApplyFilter = useCallback(
    (item: any) => {
      setFilterVisible(false);
      filter.current = item;

      if (!data.user_id) {
        dispatch(ReferralMemberList.clear());
        fetchApiRedux(1, item.sort, item.type, keyword, groupId.current);
      } else {
        setLoading(true);
        setMembers((arr: any) => []);
        setStatistics((arr: any) => []);
        fetchScreenData(1, item.sort, item.type, keyword, groupId.current);
      }
    },
    [groupId, keyword],
  );

  // event handle: refreshing
  const handleOnRefresh = useCallback(() => {
    setRefreshing(true);
    Keyboard.dismiss();
    setKeyword('');

    if (!data.user_id) {
      dispatch(ReferralMemberList.clear());
      fetchApiRedux(
        1,
        filter.current.sort,
        filter.current.type,
        '',
        groupId.current,
      );
    } else {
      setLoading(true);
      setMembers((arr: any) => []);
      setStatistics((arr: any) => []);
      fetchScreenData(
        1,
        filter.current.sort,
        filter.current.type,
        '',
        groupId.current,
      );
    }
  }, [filter.current, groupId.current]);

  // event handle: load more
  const handleOnLoadmore = () => {
    if (current.current < total && !loading) {
      setLoadmore(true);
      if (!data.user_id) {
        fetchApiRedux(
          nextPage.current,
          filter.current.sort,
          filter.current.type,
          keyword,
          groupId.current,
        );
      } else {
        setLoading(true);
        fetchScreenData(
          nextPage.current,
          filter.current.sort,
          filter.current.type,
          keyword,
          groupId.current,
        );
      }
    }
  };

  // event handle: add new member
  const handleOnAddMember = () => {
    navigation.navigate('ReferralAddMember');
  };

  // event handle: search feature
  const handleOnSearch = useCallback(() => {
    if (keyword.length > 0) {
      if (!data.user_id) {
        dispatch(ReferralMemberList.clear());
        fetchApiRedux(
          1,
          filter.current.sort,
          filter.current.type,
          keyword,
          groupId.current,
        );
      } else {
        setLoading(true);
        setMembers((arr: any) => []);
        setStatistics((arr: any) => []);
        fetchScreenData(
          1,
          filter.current.sort,
          filter.current.type,
          keyword,
          groupId.current,
        );
      }
    }
  }, [filter.current, keyword, groupId.current]);

  // event handle: on choose group id
  const handleOnChosenGroupId = useCallback(
    (id: any) => {
      groupId.current = id;

      if (!data.user_id) {
        dispatch(ReferralMemberList.clear());
        fetchApiRedux(1, filter.current.sort, filter.current.type, keyword, id);
      } else {
        setLoading(true);
        setMembers((arr: any) => []);
        setStatistics((arr: any) => []);
        fetchScreenData(
          1,
          filter.current.sort,
          filter.current.type,
          keyword,
          id,
        );
      }
    },
    [keyword, filter.current],
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        text={`Thành viên (${total})`}
        iconLeft={require('../../assets/Arrow1.png')}
        onPressLeft={() => navigation.goBack()}
        containerStyle={styles.header}
        onPressRight={undefined}
        showCartBadge={undefined}
        iconRight={undefined}
      />

      <View style={styles.searchView}>
        <Search
          style={styles.search}
          placeholder={'Tìm kiếm...'}
          onChangeText={setKeyword}
          value={keyword}
          onSubmitEditing={handleOnSearch}
        />

        <ImageButton
          containerStyle={styles.searchSettingPressable}
          imageStyle={styles.searchSettingImage}
          imagesource={require('../../assets/filter.png')}
          textStlye={undefined}
          text={undefined}
          onPress={() => {
            setFilterVisible(true);
            Keyboard.dismiss();
          }}
          resizeMode={undefined}
        />
      </View>

      <ReferralTeamListGroup
        data={refreshing ? [] : statistics}
        onChosen={handleOnChosenGroupId}
        refreshing={refreshing}
      />

      <ReferralTeamListMember
        data={refreshing ? [] : members}
        loading={loading}
        refreshing={refreshing}
        onRefresh={handleOnRefresh}
        onLoadmore={handleOnLoadmore}
      />

      {!data.user_id && <FabAddButton onPress={handleOnAddMember} />}

      <ReferralTeamSearchFilter
        visible={filterVisible}
        onCloseFilter={() => setFilterVisible(false)}
        onApplyFilter={handleApplyFilter}
      />

      {loadmore && <LoadmoreIndicator />}
    </SafeAreaView>
  );
}

function fetchData(
  data: MemberListStartFormData,
  onSuccess: (result: any) => void,
  onFailure: (msg: string | Error) => void,
) {
  const form = new FormData();
  form.append('token', data.token);
  form.append('page', data.page);
  form.append('field', data.field);
  form.append('sort', data.sort);
  form.append('keyword', data.keyword);
  form.append('user_id', data.user_id);
  form.append('joined_at', data.joined_at ? data.joined_at : '');
  form.append(
    'member_group_id',
    data.member_group_id ? data.member_group_id : '',
  );
  form.append(
    'member_department_id',
    data.member_department_id ? data.member_department_id : '',
  );

  api_referral_member_list(form).then(onSuccess).catch(onFailure);
}
