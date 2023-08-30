import { Pressable, Image, Text, View } from 'react-native';
import { memo, forwardRef } from 'react';
import Animated from 'react-native-reanimated';

const ImageButton = ({
  containerStyle,
  imageStyle,
  imagesource,
  textStlye,
  text,
  onPress,
  resizeMode,
}) => {
  // console.log("img"imagesource);
  return (
    <Pressable
      style={({ pressed }) => [containerStyle, pressed ? { opacity: 0.65 } : null]}
      onPress={onPress}>
      {imagesource ? (
        <Image
          source={imagesource}
          style={imageStyle}
          resizeMode={resizeMode ? resizeMode : 'contain'}
        />
      ) : null}
      <Text style={textStlye}>{text}</Text>
    </Pressable>
  );
};

const AnimatedImageButton = forwardRef(
  (
    {
      containerStyle,
      imageStyle,
      imagesource,
      textStlye,
      text,
      onPress,
      resizeMode,
      style,
    },
    ref,
  ) => {
    return (
      <View style={[containerStyle, style]}>
        <Pressable
          ref={ref}
          style={({ pressed }) => (pressed ? { opacity: 0.4 } : null)}
          onPress={onPress}>
          <Image
            source={imagesource}
            style={imageStyle}
            resizeMode={resizeMode ? resizeMode : 'contain'}
          />
          <Text style={textStlye}>{text}</Text>
        </Pressable>
      </View>
    );
  },
);

export const AnimatedImgButton =
  Animated.createAnimatedComponent(AnimatedImageButton);

export default memo(ImageButton, (pre, next) => {
  JSON.stringify(pre) === JSON.stringify(next);
});
