import {StyleSheet} from 'react-native';
import {WINDOW_WIDTH} from '../../../../global';

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH / 3.5,
    gap: 5,
    alignItems: 'center',
  },

  imageContainer: {
    backgroundColor: '#005aa9',
    width: 55,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },

  image: {
    width: 35,
    height: 35,
  },

  text: {
    fontSize: 15,
    color: 'black',
  },

  containerPressed: {
    opacity: 0.6,
  },
});

export default styles;
