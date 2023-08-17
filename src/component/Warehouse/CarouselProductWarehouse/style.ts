import {StyleSheet} from 'react-native';
import {WINDOW_WIDTH} from '../../../global';

const styles = StyleSheet.create({
  container: {
    marginVertical: '1%',
  },

  doubleContainer: {
    flexDirection: 'row',
    width: WINDOW_WIDTH * 0.94,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default styles;
