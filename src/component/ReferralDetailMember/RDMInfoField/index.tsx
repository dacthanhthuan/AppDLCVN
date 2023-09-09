import {Text, View} from 'react-native';
import styles from './styles';
import {memo} from 'react';

type RDMInfoFieldProps = {
  label: string;
  body: string;
};

function RDMInfoField({label, body}: RDMInfoFieldProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.body}>{body ? body : 'Chưa cập nhật'}</Text>
    </View>
  );
}

export default memo(RDMInfoField);
