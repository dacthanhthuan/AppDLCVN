import {StyleSheet} from 'react-native';
import {WINDOW_HEIGHT} from '../../global';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  flatlist: {
    flex: 1,
  },

  flatlistContent: {
    alignSelf: 'center',
  },

  rowHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowPoint: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    marginHorizontal: 100,
    color: '#000000',
  },
  helloText: {
    fontSize: 16,
    color: '#000000',
  },
  icon: {
    width: 24,
    height: 24,
  },
  pointContainer: {
    flexDirection: 'row',
    backgroundColor: '#09355C',
    width: 133,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  pointText: {
    color: '#FFFFFF',
    fontSize: 16,
    flex: 1,
    marginLeft: 6,
    marginVertical: 4,
  },
  iconAvatar: {
    width: 28,
    height: 28,
    borderRadius: 20,
  },
});

export default styles;
