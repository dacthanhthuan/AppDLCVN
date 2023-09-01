import {Text, View, TouchableOpacity, ToastAndroid} from 'react-native';
import styles from './styles';
import {useCallback} from 'react';
import Clipboard from '@react-native-clipboard/clipboard';

type MyShareCardProps = {
  title: string;
  code: string;
  body: string;
};

export default function MyShareCard(props: MyShareCardProps) {
  const handleCopy = useCallback(() => {
    Clipboard.setString(props.code);
    ToastAndroid.show('Đã sao chép', ToastAndroid.LONG);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <View style={styles.codeView}>
        <View style={styles.code}>
          <Text style={styles.codeContent}>{props.code}</Text>
        </View>
        <TouchableOpacity style={styles.copy} onPress={handleCopy}>
          <Text style={styles.copyContent}>Sao chép</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.body}>{props.body}</Text>
    </View>
  );
}
