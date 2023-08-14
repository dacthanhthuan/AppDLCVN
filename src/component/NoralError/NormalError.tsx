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
      entering={LightSpeedInLeft.duration(400)}
      exiting={LightSpeedOutRight.duration(400)}
      style={styles.container}>
      <Text style={styles.message}>{error}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    paddingVertical: 12,
    paddingHorizontal: 10,
    width: '90%',
    alignSelf: 'center',
    position: 'absolute',
    backgroundColor: '#C70039',
    borderBottomLeftRadius: 15,
    borderTopRightRadius: 15,
    borderTopWidth: 1.5,
    borderRightWidth: 1.5,
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    borderColor: '#900C3F',
    borderRightColor: 'white',
    flexDirection: 'row',
  },

  message: {
    fontWeight: '500',
    fontSize: 15,
    color: '#FFFFFF',
  },
});
