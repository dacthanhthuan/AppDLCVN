import {Text, View, StyleProp, ViewStyle} from 'react-native';
import styles from './styles';
import {useSelector} from 'react-redux';

type CartBadgeProps = {
  style?: StyleProp<ViewStyle>;
};

export default function CartBadge({style}: CartBadgeProps) {
  const total_quantity = useSelector((state: any) => state.cart.total_quantity);
  return total_quantity < 1 ? null : (
    <View style={[styles.badgeContainer, style]}>
      <Text style={styles.badgeText}>
        {total_quantity > 99 ? '99+' : total_quantity}
      </Text>
    </View>
  );
}
