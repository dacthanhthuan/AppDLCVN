import {Pressable, Image, Text, View, StyleSheet} from 'react-native';
import {memo, forwardRef, useImperativeHandle, useRef, useState} from 'react';
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
          style={[({pressed}) => [pressed ? {opacity: 0.4} : null]]}
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

export default memo(ImageButton);
