import {memo} from 'react';
import {TouchableOpacity, Text, GestureResponderEvent} from 'react-native';
import styles from './styles';

type GenderPickerItemProps = {
  label: string;
  isSelected?: boolean;
  onPress?: (e: GestureResponderEvent) => void;
};

const GenderPickerItem = memo(function ({
  label,
  isSelected,
  onPress,
}: GenderPickerItemProps) {
  return (
    <TouchableOpacity
      style={[styles.item, isSelected ? styles.selectedItem : null]}
      onPress={onPress}>
      <Text style={[styles.label, isSelected ? styles.selectedLabel : null]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
});

export default GenderPickerItem;
