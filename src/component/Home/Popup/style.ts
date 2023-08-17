import {StyleSheet} from 'react-native';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../../../global';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },

  imageStyle: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },

  containerImageStyle: {
    width: WINDOW_WIDTH * 0.85,
    height: WINDOW_HEIGHT * 0.4,
  },

  closeIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 180,
    padding: 5,
  },
});

export default style;
