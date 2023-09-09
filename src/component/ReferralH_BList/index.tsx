import {memo} from 'react';
import RHBListItem from './Item';
import {ActivityIndicator, FlatList, RefreshControl, Text} from 'react-native';
import styles from './styles';

type RHBListProps = {
  data: Array<any>;
  loading: boolean;
  refreshing: boolean;
  onLoadmore?: () => void;
  onRefresh?: () => void;
};

const RHBList = memo(
  function ({data, onLoadmore, onRefresh, loading, refreshing}: RHBListProps) {
    return (
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={data}
        renderItem={({item}) => {
          return (
            <RHBListItem
              id={item.id}
              date={item.created_at}
              name={item.created_by}
              totalPrice={item.detail?.total_product || item.total_product}
              discount={item.detail?.discount.toString() || item.discount}
            />
          );
        }}
        ListEmptyComponent={
          loading && !refreshing ? (
            <ActivityIndicator color={'#005aa9'} size="large" />
          ) : !refreshing ? (
            <Text style={styles.emptyListText}>Không có đơn hàng</Text>
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

export default RHBList;
