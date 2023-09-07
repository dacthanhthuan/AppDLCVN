import {TextInput, View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import style from '../LoadingOverlay/style';
import {useCallback, useRef} from 'react';

type BankInputType = {
  label?: string;
  value?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  maxLength?: number;
  upperCase?: boolean;
};

export default function BankInput({
  label,
  placeholder,
  onChangeText,
  maxLength,
  value,
  upperCase,
}: BankInputType) {
  const inputRef = useRef<TextInput | any>(null);

  const handleClearText = useCallback(() => {
    inputRef.current.clear();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputView}>
        <TextInput
          ref={inputRef}
          style={[
            styles.textInput,
            upperCase ? {textTransform: 'uppercase'} : null,
          ]}
          placeholder={placeholder}
          onChangeText={onChangeText}
          maxLength={maxLength}
          value={value}
        />
        <TouchableOpacity style={styles.close} onPress={handleClearText}>
          <Image
            source={require('../../assets/Rectangle328.png')}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
