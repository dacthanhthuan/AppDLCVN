import { StyleSheet } from 'react-native';
import { WINDOW_HEIGHT } from '../../global';

const HEADER_EXPAND_HEIGHT = 150;
const HEADER_COLLAPSE_HEIGHT = 60;
export { HEADER_EXPAND_HEIGHT, HEADER_COLLAPSE_HEIGHT };

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

  headerExpand: {
    position: 'relative',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 1,
    height: HEADER_EXPAND_HEIGHT,
    backgroundColor: '#005AA9',
    overflow: 'hidden',
    height: 150,
  },
});

export default styles;

