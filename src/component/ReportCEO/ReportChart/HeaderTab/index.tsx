import {memo, useCallback, useState} from 'react';
import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';

const button = [
  {
    value: 'day',
    name: 'Ngày',
  },
  {
    value: 'month',
    name: 'Tháng',
  },
  {
    value: 'quarter',
    name: 'Quý',
  },
];

type ReportChartHeaderProps = {
  onChosen?: (item: any) => void;
};

const ReportChartHeader = memo(function ({onChosen}: ReportChartHeaderProps) {
  const [selectItem, setSelectItem] = useState(button[1]);

  const handleOnChosen = useCallback(
    (item: any) => {
      setSelectItem(item);
      if (typeof onChosen == 'function') {
        onChosen(item);
      }
    },
    [onChosen],
  );

  return (
    <View style={styles.container}>
      {button.map(item => {
        return (
          <TouchableOpacity
            key={item.value}
            style={[
              styles.button,
              item.value === selectItem.value ? styles.selectedButton : null,
            ]}
            onPress={() => handleOnChosen(item)}>
            <Text
              style={[
                styles.buttonLabel,
                item.value === selectItem.value
                  ? styles.selectedButtonLabel
                  : null,
              ]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
});

export default ReportChartHeader;
