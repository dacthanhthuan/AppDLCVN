import {memo} from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import {formatPrice, secondToGlobalDate} from '../../../global';

type RHBListItemProps = {
  id: string;
  date: string;
  name: string;
  totalPrice: string;
  discount: string;
};

const RHBListItem = memo(
  function ({id, date, name, totalPrice, discount}: RHBListItemProps) {
    return (
      <View style={styles.item}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemLabel}>Mã ĐH: {id}</Text>
          <Text style={styles.itemDate}>
            {secondToGlobalDate(date).toLocaleDateString()}
          </Text>
        </View>
        <Text style={styles.itemInfo}>
          Người tạo: <Text style={styles.itemName}>{name}</Text>
        </Text>
        <Text style={styles.itemInfo}>
          Tổng tiền:{' '}
          <Text style={styles.itemTotalPrice}>{formatPrice(totalPrice)}</Text>
        </Text>
        <Text style={styles.itemInfo}>
          Chiết khấu:{' '}
          <Text style={styles.itemDiscount}>{formatPrice(discount)}</Text>
        </Text>
        <Text style={styles.itemInfo}>
          Thực thu:{' '}
          <Text style={styles.itemName}>
            {formatPrice(parseInt(totalPrice) - parseInt(discount))}
          </Text>
        </Text>
      </View>
    );
  },
  (pre, next) => JSON.stringify(pre) === JSON.stringify(next),
);

export default RHBListItem;
