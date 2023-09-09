import {memo, useCallback} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
  GestureResponderEvent,
} from 'react-native';
import styles from './styles';
import {formatPrice} from '../../../global';
import {useNavigation} from '@react-navigation/native';

type ListMemberProps = {
  data: Array<any>;
  loading: boolean;
  refreshing: boolean;
  onRefresh?: () => void;
  onLoadmore?: () => void;
};

export default memo(
  function ReferralTeamListMember({
    data,
    loading,
    refreshing,
    onRefresh,
    onLoadmore,
  }: ListMemberProps) {
    const navigation = useNavigation();

    const handleOnPressItem = useCallback((item: any) => {
      navigation.navigate({
        name: 'ReferralDetailMember',
        key: 'RDM-user_id:/' + item.user_id,
        params: {data: item},
      });
    }, []);

    return (
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={data}
        renderItem={({item}) => (
          <ListMemberItem
            groupName={item?.member_group_name}
            name={item?.fullname}
            avatar={item?.avatar}
            totalSpent={item?.total_spent}
            totalLiabilities={item?.total_liabilities}
            onPress={() => handleOnPressItem(item)}
          />
        )}
        ListEmptyComponent={
          loading && !refreshing ? (
            <ActivityIndicator color={'#005aa9'} size="large" />
          ) : !refreshing ? (
            <Text style={styles.emptyListText}>
              Không có thành viên đội nhóm
            </Text>
          ) : null
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            colors={['white']}
            progressBackgroundColor={'#005AA9'}
            onRefresh={onRefresh}
          />
        }
        onEndReached={onLoadmore}
        removeClippedSubviews
      />
    );
  },
  (pre, next) => JSON.stringify(pre) === JSON.stringify(next),
);

type ListMemberItemProps = {
  groupName: string;
  name: string;
  avatar: string;
  totalSpent: string;
  totalLiabilities: string;
  onPress: (e: GestureResponderEvent) => void;
};

const ListMemberItem = memo(
  function ({
    avatar,
    groupName,
    name,
    totalSpent,
    totalLiabilities,
    onPress,
  }: ListMemberItemProps) {
    return (
      <TouchableOpacity style={styles.item} onPress={onPress}>
        <Image
          source={
            avatar ? {uri: avatar} : require('../../../assets/Rectangle312.png')
          }
          style={styles.itemAvatar}
        />

        <View style={styles.itemTextView}>
          <Text style={styles.itemBoldText}>{name}</Text>
          <Text style={styles.itemNormalText}>
            Công nợ:{' '}
            <Text style={styles.itemBoldText}>
              {formatPrice(totalLiabilities)}
            </Text>
          </Text>
          <Text style={styles.itemNormalText}>
            Đã mua:{' '}
            <Text style={styles.itemSpentText}>{formatPrice(totalSpent)}</Text>
          </Text>
        </View>

        <Text style={styles.itemGroupTag}>{groupName}</Text>

        <Image
          source={require('../../../assets/vectorRight.png')}
          style={styles.itemRightIcon}
        />
      </TouchableOpacity>
    );
  },
  (pre, next) => JSON.stringify(pre) === JSON.stringify(next),
);
