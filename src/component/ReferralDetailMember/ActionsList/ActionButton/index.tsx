import {memo} from 'react';
import {
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  Pressable,
  Text,
  View,
} from 'react-native';
import styles from './styles';

type ActionButtonProps = {
  source: ImageSourcePropType;
  text?: string;
  onPress?: (e: GestureResponderEvent) => void;
};

function ActionButton({source, text, onPress}: ActionButtonProps) {
  return (
    <Pressable
      style={({pressed}) => [
        styles.container,
        pressed ? styles.containerPressed : null,
      ]}
      onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={source} style={styles.image} />
      </View>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

export default memo(ActionButton);
