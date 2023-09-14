import {memo} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';

type Props = {
  label: string;
  children?: any;
};

const FixProductRowItem = memo(function ({label, children}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      {children}
    </View>
  );
});

export default FixProductRowItem;
