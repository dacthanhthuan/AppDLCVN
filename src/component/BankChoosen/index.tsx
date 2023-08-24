import {Text, Pressable, ScrollView, ActivityIndicator} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import styles from './styles';
import {useRef, memo, useCallback, useState} from 'react';
import BankChoosenItem from './BankChoosenItem';

type BankChoosenType = {
  choose: string;
  data: any[];
  onChoose: (item: {}) => void;
};

function BankChoosen({choose, data, onChoose}: BankChoosenType) {
  const expand = useRef(false);
  const [myChoose, setMyChoose] = useState(choose);

  // handle collapse
  const handleCollapse = () => {
    expand.current = !expand.current;
    handleAnimation(expand.current);
  };

  // handle onchoose item
  const handleOnChoose = useCallback((item: any) => {
    onChoose(item);
    setMyChoose(item.short + ' - ' + item.name);
    handleCollapse();
  }, []);

  // Animation
  const rotateValue = useSharedValue(0);
  const heightValue = useSharedValue(90);
  const opacityValue = useSharedValue(0);
  const animationDuration = 300; //duration animation (millisecond - ms)

  // handle animation
  const handleAnimation = (expand: boolean) => {
    if (expand) {
      rotateValue.value = withTiming(90, {duration: animationDuration});
      heightValue.value = withTiming(250, {duration: animationDuration});
      opacityValue.value = withDelay(
        animationDuration * 0.5,
        withTiming(1, {duration: animationDuration}),
      );
    } else {
      rotateValue.value = withDelay(
        animationDuration * 0.2,
        withTiming(0, {duration: animationDuration}),
      );
      heightValue.value = withDelay(
        animationDuration * 0.2,
        withTiming(90, {duration: animationDuration}),
      );
      opacityValue.value = withTiming(0, {duration: animationDuration});
    }
  };

  // icon animation
  const iconAnimation = useAnimatedStyle(() => {
    const rotateZ = rotateValue.value + 'deg';
    return {
      transform: [{rotateZ}],
    };
  }, []);

  // container animation
  const containerAnimation = useAnimatedStyle(() => {
    const height = heightValue.value;

    return {
      height,
    };
  }, []);

  // flatlist animation
  const flatlistAnimation = useAnimatedStyle(() => {
    const opacity = opacityValue.value;

    return {
      opacity,
    };
  }, []);

  return (
    <Animated.View style={[styles.container, containerAnimation]}>
      <Text style={styles.label}>Ngân hàng:</Text>
      <Pressable
        style={({pressed}) => [
          styles.chooseButton,
          pressed ? {opacity: 0.8} : null,
        ]}
        onPress={handleCollapse}>
        <Text style={{color: 'black'}} numberOfLines={1}>
          {myChoose}
        </Text>
        <Animated.Image
          source={require('../../assets/vectorRight.png')}
          style={[styles.downArrow, iconAnimation]}
        />
      </Pressable>
      <ScrollView horizontal>
        <Animated.FlatList
          style={[styles.flatlist, flatlistAnimation]}
          contentContainerStyle={styles.contentFlatlist}
          nestedScrollEnabled={true}
          removeClippedSubviews
          initialNumToRender={10}
          windowSize={21}
          data={data}
          renderItem={({item}) => (
            <BankChoosenItem item={item} onPress={() => handleOnChoose(item)} />
          )}
          ListEmptyComponent={<ActivityIndicator color="#005aa9" />}
        />
      </ScrollView>
    </Animated.View>
  );
}

export default memo(
  BankChoosen,
  (pre, next) => JSON.stringify(pre.data) === JSON.stringify(next.data),
);
