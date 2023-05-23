import {Pressable, Image, Text} from 'react-native';
import {memo} from 'react';

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
    <Pressable style={containerStyle} onPress={onPress}>
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
