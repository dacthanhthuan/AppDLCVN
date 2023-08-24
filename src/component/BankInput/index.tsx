import {TextInput, View, Text} from 'react-native';
import styles from './styles';
import style from '../LoadingOverlay/style';

type BankInputType = {
  label?: string;
  value?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  maxLength?: number;
};

export default function BankInput({
  label,
  placeholder,
  onChangeText,
  maxLength,
  value,
}: BankInputType) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        onChangeText={onChangeText}
        maxLength={maxLength}
        value={value}
      />
    </View>
  );
}
