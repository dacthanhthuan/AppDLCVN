import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  overlayStyle: {
    borderRadius: 20,
    width: '90%',
  },

  titleStyle: {
    color: 'black',
    fontWeight: '600',
  },

  inputStyle: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingLeft: 15,
    paddingVertical: 10,
    elevation: 0,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  errorText: {
    color: 'red',
    paddingVertical: 5,
  },
});

export default styles;
