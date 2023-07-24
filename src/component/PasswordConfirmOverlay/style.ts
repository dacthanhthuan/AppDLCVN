import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 15,
    width: '80%',
  },

  dialogTitle: {
    color: 'rgba(0,0,0,1)',
  },

  inputPasswordConfirm: {
    backgroundColor: 'rgba(128,128,128,0.15)',
    alignSelf: 'center',
    borderRadius: 5,
    elevation: 0,
  },

  confirmError: {
    color: 'red',
    fontSize: 13,
    marginHorizontal: 10,
    paddingTop: 10,
  },
});

export default style;
