import {Text, StyleSheet} from 'react-native';
import Animated, {
  EntryAnimationsValues,
  EntryExitAnimationFunction,
  SlideInUp,
  SlideOutUp,
  Easing,
  withTiming,
  LayoutAnimation,
  ExitAnimationsValues,
} from 'react-native-reanimated';

type NormalNotificationProps = {
  notification?: string;
};

export default function NormalNotification({
  notification,
}: NormalNotificationProps) {
  // Animation
  const CustomEntering: EntryExitAnimationFunction = (
    values: EntryAnimationsValues,
  ): LayoutAnimation => {
    'worklet';
    const myEasing = Easing.in(Easing.elastic(1));
    return {
      initialValues: {
        originY: -100,
      },
      animations: {
        originY: withTiming(50, {
          duration: 700,
          easing: myEasing,
        }),
      },
    };
  };

  const CustomExiting: EntryExitAnimationFunction = (
    values: ExitAnimationsValues,
  ): LayoutAnimation => {
    'worklet';
    const myEasing = Easing.out(Easing.elastic(1));
    return {
      initialValues: {
        originY: values.currentOriginY,
      },
      animations: {
        originY: withTiming(-100, {
          duration: 700,
          easing: myEasing,
        }),
      },
    };
  };

  return (
    <Animated.View
      entering={CustomEntering}
      exiting={CustomExiting}
      style={styles.container}>
      <Text style={styles.message}>{notification}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    paddingVertical: 12,
    paddingHorizontal: 10,
    width: '90%',
    alignSelf: 'center',
    position: 'absolute',
    backgroundColor: '#35A29F',
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderLeftWidth: 2,
    borderTopWidth: 2,
    borderRightWidth: 5,
    borderBottomWidth: 5,
    borderColor: '#071952',
    flexDirection: 'row',
    zIndex: 1,
  },

  message: {
    fontWeight: '500',
    fontSize: 15,
    color: 'black',
  },
});
