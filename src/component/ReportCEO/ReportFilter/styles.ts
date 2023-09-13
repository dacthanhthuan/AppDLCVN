import {StyleSheet} from 'react-native';
import {WINDOW_HEIGHT} from '../../../global';

const styles = StyleSheet.create({
  view: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: WINDOW_HEIGHT,
    backgroundColor: '#00000030',
  },

  outside: {
    flex: 1,
  },

  contentView: {
    backgroundColor: 'white',
    height: 400,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    gap: 10,
  },

  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  headerText: {
    color: '#005aa9',
    fontSize: 17,
    fontWeight: '500',
  },

  deleteText: {
    color: '#FF1700',
    fontSize: 18,
    fontWeight: '500',
  },

  closeImage: {
    width: 24,
    height: 24,
    backgroundColor: '#00000035',
    borderRadius: 15,
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },

  applyButton: {
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default styles;
