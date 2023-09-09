import {StyleSheet} from 'react-native';
import {WINDOW_WIDTH} from '../../global';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingLeft: 20,
  },

  input: {
    color: 'black',
    fontSize: 16,
  },

  icon: {
    position: 'absolute',
    right: 10,
    width: 30,
    height: 30,
    marginTop: 10,
  },

  list: {
    flex: 1,
    marginTop: 5,
    width: WINDOW_WIDTH * 0.8,
  },

  contentList: {
    paddingBottom: 10,
  },
});

export default styles;
