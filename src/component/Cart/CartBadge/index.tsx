import {Text, View, StyleProp, ViewStyle} from 'react-native';
import styles from './styles';
import {useSelector} from 'react-redux';

type CartBadgeProps = {
  style?: StyleProp<ViewStyle>;
  isWallet: boolean;
};

export default function CartBadge({style, isWallet = true}: CartBadgeProps) {
  const cartData = isWallet
    ? useSelector((state: any) => state.cart.wallet)
    : useSelector((state: any) => state.cart.point);
  const total_quantity = cartData.reduce(
    (total: any, next: any) => total + next.quantity,
    0,
  );

  return total_quantity < 1 ? null : (
    <View style={[styles.badgeContainer, style]}>
      <Text style={styles.badgeText}>
        {total_quantity > 99 ? '99+' : total_quantity}
      </Text>
    </View>
  );
}
