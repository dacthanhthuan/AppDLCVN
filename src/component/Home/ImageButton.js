import {Pressable, Image, Text} from 'react-native';
import {memo} from 'react';
import {opacity} from 'react-native-redash';

const ImageButton = ({
  containerStyle,
  imageStyle,
  imagesource,
  textStlye,
  text,
  onPress,
  resizeMode,
}) => {
  return (
    <Pressable
      style={({pressed}) => [containerStyle, pressed ? {opacity: 0.4} : null]}
      onPress={onPress}>
      <Image
        source={imagesource}
        style={imageStyle}
        resizeMode={resizeMode ? resizeMode : 'contain'}
      />
      <Text style={textStlye}>{text}</Text>
    </Pressable>
  );
};

export default memo(ImageButton);
