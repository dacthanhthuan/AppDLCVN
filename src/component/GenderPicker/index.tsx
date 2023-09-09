import {memo, useCallback, useRef, useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import GenderPickerItem from './GenderPickerItem';

export enum GENDER {
  FEMALE = 0,
  MALE = 1,
}

type GenderPickerProps = {
  placeholder: string;
  defaulGender?: GENDER;
  onChangeGender?: (genderId: GENDER) => void;
};

const genderData = [
  {
    id: GENDER.FEMALE,
    name: 'Nữ',
  },
  {
    id: GENDER.MALE,
    name: 'Nam',
  },
];

const GenderPicker = memo(function ({
  placeholder,
  defaulGender,
  onChangeGender,
}: GenderPickerProps) {
  const [gender, setGender] = useState(defaulGender);
  const visible = useRef(false);

  // event handle: show or hide gender picker
  const handleVisiblePicker = useCallback(() => {
    visible.current = !visible.current;

    // animation:
    if (visible.current) {
      heightValue.value = withTiming(160);
      opacityValue.value = withDelay(150, withTiming(1));
    } else {
      heightValue.value = withDelay(100, withTiming(50));
      opacityValue.value = withTiming(0, {duration: 100});
    }
  }, []);

  // event handle: choose gender
  const handleChosenGender = (genderId: GENDER) => {
    // callbacks
    setGender(genderId);
    if (typeof onChangeGender == 'function') onChangeGender(genderId);

    // hide picker
    handleVisiblePicker();
  };

  // animation: container view
  const heightValue = useSharedValue(50);

  const containerAnimate = useAnimatedStyle(() => {
    return {
      height: heightValue.value,
    };
  }, []);

  // animation: flatlist opacity
  const opacityValue = useSharedValue(0);

  const flatlistAnimate = useAnimatedStyle(() => {
    return {
      opacity: opacityValue.value,
    };
  }, []);

  return (
    <Animated.View style={[styles.container, containerAnimate]}>
      <TouchableOpacity onPress={handleVisiblePicker}>
        <TextInput
          editable={false}
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={'grey'}
          value={
            gender == GENDER.MALE ? genderData[1].name : genderData[0].name
          }
        />
        <Image
          source={require('../../assets/Referral/gender.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
      <ScrollView horizontal>
        <Animated.FlatList
          style={[styles.list, flatlistAnimate]}
          contentContainerStyle={styles.contentList}
          data={genderData}
          renderItem={({item}) => (
            <GenderPickerItem
              label={item.name}
              isSelected={item.id == gender}
              onPress={() => handleChosenGender(item.id)}
            />
          )}
          nestedScrollEnabled={true}
          removeClippedSubviews
        />
      </ScrollView>
    </Animated.View>
  );
});

export default GenderPicker;
