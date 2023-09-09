import {Fragment, memo, useCallback} from 'react';
import {View} from 'react-native';
import styles from './styles';
import ActionButton from './ActionButton';
import {useNavigation} from '@react-navigation/native';

const buttons = [
  {
    id: 0,
    name: 'Lịch sử bán trả',
    screenName: 'ReferralHistoryList',
    image: require('../../../assets/Referral/historylist.png'),
  },
  {
    id: 1,
    name: 'Đơn đặt hàng',
    screenName: 'ReferralBookingList',
    image: require('../../../assets/Referral/orderlist.png'),
  },
  {
    id: 2,
    name: 'Thành viên',
    screenName: 'ReferralTeam',
    image: require('../../../assets/Referral/members.png'),
  },
];

type ActionListProps = {
  userData: any;
};

const ActionList = memo(
  function ({userData}: ActionListProps) {
    const navigation = useNavigation();

    const handleOnPress = useCallback((item: any) => {
      navigation.navigate({
        name: item.screenName,
        key: 'from_referral_detail_action:/' + userData.user_id,
        params: {
          data: userData,
        },
      });
    }, []);

    return (
      <View style={styles.list}>
        {buttons.map((item, i) => (
          <Fragment key={item.id}>
            <ActionButton
              source={item.image}
              text={item.name}
              onPress={() => handleOnPress(item)}
            />
            {i < buttons.length - 1 && <View style={styles.separateLine} />}
          </Fragment>
        ))}
      </View>
    );
  },
  (pre, next) => JSON.stringify(pre) === JSON.stringify(next),
);

export default ActionList;
