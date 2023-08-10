import {Text, StyleSheet} from 'react-native';
import Animated, {
  LightSpeedInLeft,
  LightSpeedOutRight,
} from 'react-native-reanimated';

type NormalErrorProps = {
  error?: string;
};

export default function NormalError({error}: NormalErrorProps) {
  return (
    <Animated.View
      entering={LightSpeedInLeft.duration(300)}
      exiting={LightSpeedOutRight.duration(300)}
      style={styles.container}>
      <Text style={styles.message}>{error}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    paddingVertical: 12,
    paddingHorizontal: 10,
    width: '90%',
    alignSelf: 'center',
    position: 'absolute',
    backgroundColor: 'rgba(176, 0, 32, 1)',
    borderRadius: 5,
    borderWidth: 4,
    borderTopWidth: 3,
    borderBottomWidth: 5,
    borderColor: 'rgba(130, 0, 32, 1)',
    flexDirection: 'row',
  },

  message: {
    fontWeight: '500',
    fontSize: 15,
    color: '#FFFFFF',
  },
});
