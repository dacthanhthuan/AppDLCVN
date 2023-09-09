import {StyleSheet} from 'react-native';
import {WINDOW_WIDTH} from '../../../../global';

const styles = StyleSheet.create({
  list: {
    flex: 1,
    alignSelf: 'center',
    maxHeight: 80,
  },

  contentList: {
    gap: 10,
  },

  selectButton: {
    flex: 1,
    width: WINDOW_WIDTH * 0.43,
  },

  nonSelectButton: {
    flex: 1,
    width: WINDOW_WIDTH * 0.43,
    backgroundColor: '#f2f2f2',
  },

  selectText: {
    color: 'white',
  },

  nonSelectText: {
    color: 'grey',
  },
});

export default styles;
