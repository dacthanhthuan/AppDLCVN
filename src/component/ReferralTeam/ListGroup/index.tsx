import {memo} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  View,
} from 'react-native';
import styles from './styles';
import {Text} from 'react-native';

type ListGroupProps = {
  data: Array<any>;
};

export default memo(
  function ReferralTeamListGroup({data}: ListGroupProps) {
    return data.length == 0 ? null : (
      <FlatList
        data={data}
        renderItem={({item}) => (
          <ListGroupItem
            title={item.total_count}
            body={item.member_group_name}
          />
        )}
        style={styles.list}
        horizontal
        contentContainerStyle={styles.contentList}
        showsHorizontalScrollIndicator={false}
      />
    );
  },
  (pre, next) => JSON.stringify(pre) === JSON.stringify(next),
);

type ListGroupItemProps = {
  title: string;
  body: string;
};

const ListGroupItem = memo(
  function ({title, body}: ListGroupItemProps) {
    return (
      <View style={styles.item}>
        <Text style={styles.itemTitle} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.itemBody}>{body}</Text>
      </View>
    );
  },
  (pre, next) => JSON.stringify(pre) === JSON.stringify(next),
);
