import {StyleSheet} from 'react-native';

const Style_Input = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textinput: {
    width: '100%',
    borderRadius: 7,
    borderColor: '#C2C2C2',
    marginTop: 12,
    padding: 15,
    fontSize: 14,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 2,
    backgroundColor: '#FFFFFF',
  },

  showPassword: {
    width: 50,
    marginTop: 12,
    paddingVertical: 15,
    position: 'absolute',
    right: 10,
    opacity: 0.7,
  },
});

export default Style_Input;
