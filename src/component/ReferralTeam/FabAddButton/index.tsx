import {TouchableOpacity, Image, GestureResponderEvent} from 'react-native';
import styles from './styles';
import {memo} from 'react';

const plus = require('../../../assets/plus.png');

type FabAddButtonProps = {
  onPress: (e: GestureResponderEvent) => void;
};

const FabAddButton = memo(function ({onPress}: FabAddButtonProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={plus} style={styles.image} />
    </TouchableOpacity>
  );
});

export default FabAddButton;
