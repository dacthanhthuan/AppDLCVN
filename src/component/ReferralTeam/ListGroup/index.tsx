import {memo, useCallback, useEffect, useState} from 'react';
import {FlatList, GestureResponderEvent, Pressable, View} from 'react-native';
import styles from './styles';
import {Text} from 'react-native';

type ListGroupProps = {
  data: Array<any>;
  onChosen?: (groupId: any) => void;
  refreshing?: boolean;
};

export default memo(
  function ReferralTeamListGroup({data, onChosen, refreshing}: ListGroupProps) {
    const [selectId, setSelectId] = useState<any>(undefined);

    // event handle: on choose
    const handleOnChoose = useCallback(
      (item: any) => {
        if (item?.member_group_id && selectId != item?.member_group_id) {
          setSelectId(item.member_group_id);

          if (typeof onChosen == 'function') onChosen(item.member_group_id);
        } else {
          setSelectId(undefined);

          if (typeof onChosen == 'function') onChosen(undefined);
        }
      },
      [selectId, onChosen],
    );

    // side effect: whenever refreshing
    useEffect(() => {
      if (refreshing) setSelectId(undefined);
    }, [refreshing]);

    return data.length == 0 ? null : (
      <FlatList
        data={data}
        renderItem={({item}) => (
          <ListGroupItem
            title={item.total_count}
            body={item.member_group_name}
            isSelected={selectId == item.member_group_id}
            onPress={e => {
              e.preventDefault();
              e.stopPropagation();
              handleOnChoose(item);
            }}
          />
        )}
        style={styles.list}
        horizontal
        contentContainerStyle={styles.contentList}
        showsHorizontalScrollIndicator={false}
      />
    );
  },
  (pre, next) => {
    return JSON.stringify(pre) === JSON.stringify(next);
  },
);

type ListGroupItemProps = {
  title: string;
  body: string;
  isSelected: boolean;
  onPress?: (e: GestureResponderEvent) => void;
};

const ListGroupItem = memo(
  function ({title, body, isSelected, onPress}: ListGroupItemProps) {
    return (
      <Pressable
        style={({pressed}) => [
          styles.item,
          pressed ? styles.itemPressed : null,
          isSelected ? styles.itemSelected : null,
        ]}
        onPress={onPress}>
        <Text
          style={[
            styles.itemTitle,
            isSelected ? styles.itemTitleSelected : null,
          ]}
          numberOfLines={1}>
          {title}
        </Text>
        <Text
          style={[
            styles.itemBody,
            isSelected ? styles.itemBodySelected : null,
          ]}>
          {body}
        </Text>
      </Pressable>
    );
  },
  (pre, next) => JSON.stringify(pre) === JSON.stringify(next),
);
