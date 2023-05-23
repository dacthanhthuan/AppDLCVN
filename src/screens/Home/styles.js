import {StyleSheet} from 'react-native';
import {WINDOW_HEIGHT} from '../../global';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    height: WINDOW_HEIGHT * 0.92,
  },

  scrollview: {
    flex: 1,
    height: WINDOW_HEIGHT * 0.92,
  },
});

export default styles;
