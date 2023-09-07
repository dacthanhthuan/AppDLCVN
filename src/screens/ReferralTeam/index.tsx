import {SafeAreaView, View} from 'react-native';
import styles from './styles';
import Header from '../../component/Header';
import {useNavigation, useRoute} from '@react-navigation/native';
import Search from '../../component/Search';
import ImageButton from '../../component/Home/ImageButton';
import ReferralTeamListGroup from '../../component/ReferralTeam/ListGroup';
import ReferralTeamListMember from '../../component/ReferralTeam/ListMember';
import ReferralTeamSearchFilter from '../../component/ReferralTeam/SearchFilter';
import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ReferralMemberList} from '../../redux/actions/referralMemberActions';
import LoadmoreIndicator from '../../component/Home/LoadmoreIndicator';
import FabAddButton from '../../component/ReferralTeam/FabAddButton';
import {Keyboard} from 'react-native';

export default function ReferralTeam() {
  const navigation = useNavigation();
  const route = useRoute();

  const dispatch = useDispatch();

  const session_token = useSelector((state: any) => state.user.session_token);

  const memberList = useSelector(
    (state: any) => state.referralMember.memberList,
  );
  const statisticList = useSelector(
    (state: any) => state.referralMember.statisticList,
  );
  const memberListLoading = useSelector(
    (state: any) => state.referralMember.memberListLoading,
  );
  const memberListTotal = useSelector(
    (state: any) => state.referralMember.memberListTotal,
  );
  const memberListCurrent = useSelector(
    (state: any) => state.referralMember.memberListCurrent,
  );
  const memberListNextPage = useSelector(
    (state: any) => state.referralMember.memberListNextPage,
  );

  const [filterVisible, setFilterVisible] = useState(false);
  const [filter, setFilter] = useState({
    sort: '',
    type: '',
    date: '',
  });
  const [refreshing, setRefreshing] = useState(false);
  const [loadmore, setLoadmore] = useState(false);
  const [keyword, setKeyword] = useState('');

  // event handle: dispatch action get member list
  const callApiGetMemberList = (
    page: number | string = 1,
    sort?: string,
    type?: string,
    keyword?: string,
    user_id?: string,
  ) => {
    dispatch(
      ReferralMemberList.start({
        token: session_token,
        page: page,
        sort: sort ? sort : '',
        field: type ? type : '',
        keyword: keyword ? keyword : '',
        user_id: user_id ? user_id : '',
      }),
    );
  };

  // side effect: after initial rendering (run once)
  useEffect(() => {
    // synchronous redux
    callApiGetMemberList();

    // clear data before navigate to another screen
    return () => {
      dispatch(ReferralMemberList.clear());
    };
  }, []);

  // handle apply filter
  const handleApplyFilter = useCallback((item: any) => {
    setFilterVisible(false);
    setKeyword('');
    setFilter(item);

    dispatch(ReferralMemberList.clear());
    callApiGetMemberList(1, item.sort, item.type);
  }, []);

  // handle on refreshing
  const handleOnRefresh = useCallback(() => {
    setRefreshing(true);
    Keyboard.dismiss();
    setKeyword('');

    dispatch(ReferralMemberList.clear());
    callApiGetMemberList(1, filter.sort, filter.type);
  }, [filter]);

  // handle on load more
  const handleOnLoadmore = () => {
    if (memberListCurrent < memberListTotal && !memberListLoading) {
      setLoadmore(true);
      callApiGetMemberList(memberListNextPage, filter.sort, filter.type);
    }
  };

  // side effect: synchronous with member list loading status (from redux)
  useEffect(() => {
    if (!memberListLoading) {
      setRefreshing(false);
      setLoadmore(false);
    }
  }, [memberListLoading]);

  // handle on add new member
  const handleOnAddMember = () => {
    // navigation.navigate('')
  };

  // handle search feature
  const handleOnSearch = useCallback(() => {
    if (keyword.length > 0) {
      dispatch(ReferralMemberList.clear());
      callApiGetMemberList(1, filter.sort, filter.type, keyword);
    }
  }, [filter, keyword]);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        text={`Thành viên (${memberListTotal})`}
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

      <ReferralTeamListGroup data={statisticList} />

      <ReferralTeamListMember
        data={memberList}
        loading={memberListLoading}
        refreshing={refreshing}
        onRefresh={handleOnRefresh}
        onLoadmore={handleOnLoadmore}
      />

      <ReferralTeamSearchFilter
        visible={filterVisible}
        onCloseFilter={() => setFilterVisible(false)}
        onApplyFilter={handleApplyFilter}
      />

      <FabAddButton onPress={handleOnAddMember} />

      {loadmore && <LoadmoreIndicator />}
    </SafeAreaView>
  );
}
