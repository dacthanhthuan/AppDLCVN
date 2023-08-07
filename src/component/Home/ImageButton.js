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
      style={({pressed}) => [containerStyle, pressed ? {opacity: 0.65} : null]}
      onPress={onPress}>
      {imagesource ? (
        <Image
          source={imagesource}
          style={imageStyle}
          resizeMode={resizeMode ? resizeMode : 'contain'}
        />
      ) : null}
      <Text style={textStlye} numberOfLines={1}>
        {text}
      </Text>
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
      children,
      disablePress = false,
    },
    ref,
  ) => {
    return (
      <View style={[containerStyle, style]}>
        <Pressable
          ref={ref}
          style={({pressed}) => (pressed ? {opacity: 0.4} : null)}
          onPress={onPress}
          disabled={disablePress}>
          {imagesource !== null ? (
            <Image
              source={imagesource}
              style={imageStyle}
              resizeMode={resizeMode ? resizeMode : 'contain'}
            />
          ) : null}
          {text ? <Text style={textStlye}>{text}</Text> : null}
          {children ? children : null}
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
