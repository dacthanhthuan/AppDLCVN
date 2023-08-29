import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ImageSourcePropType,
} from 'react-native';
import {WINDOW_WIDTH, WINDOW_HEIGHT} from '../../global';
import {useNavigation} from '@react-navigation/native';

type ProductShowmoreProps = {
  name: string;
  imageSource: ImageSourcePropType;
};

const CardShowmore = ({name, imageSource}: ProductShowmoreProps) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.renderItem]}>
      <Pressable
        style={({pressed}) => [
          styles.renderPressable,
          pressed ? {opacity: 0.8} : null,
        ]}>
        <Image
          source={imageSource}
          style={[styles.renderImage]}
          resizeMode="contain"
        />
        <Text style={styles.renderTitle} numberOfLines={1}>
          {name}
        </Text>
      </Pressable>
    </View>
  );
};

export default CardShowmore;

const styles = StyleSheet.create({
  renderItem: {
    width: (WINDOW_WIDTH * 0.94) / 2,
    height: 250,
    backgroundColor: 'white',
    justifyContent: 'center',
  },

  renderPressable: {
    width: '96%',
    height: '96%',
    borderRadius: 7,
    alignSelf: 'center',
    backgroundColor: 'white',
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '8%',
  },

  renderImage: {
    height: '50%',
    width: '50%',
  },

  renderTitle: {
    paddingVertical: '1%',
    fontSize: 18,
    color: '#005AA9',
    fontWeight: '400',
  },
});
