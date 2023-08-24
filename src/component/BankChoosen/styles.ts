import {StyleSheet} from 'react-native';
import {WINDOW_WIDTH} from '../../global';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(220,220,220,1)',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },

  label: {
    color: 'black',
    fontWeight: '500',
    fontSize: 14,
  },

  chooseButton: {
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },

  downArrow: {
    marginRight: 10,
  },

  flatlist: {
    flex: 1,
    marginTop: 10,
    width: WINDOW_WIDTH * 0.865,
  },

  contentFlatlist: {
    paddingBottom: 10,
  },
});

export default styles;
