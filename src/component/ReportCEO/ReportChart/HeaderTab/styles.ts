import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '80%',
    justifyContent: 'space-around',
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },

  button: {
    borderRadius: 180,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },

  buttonLabel: {
    fontSize: 16,
    color: '#00000080',
    fontWeight: '500',
  },

  selectedButton: {
    backgroundColor: '#f2f2f2',
  },

  selectedButtonLabel: {
    color: 'black',
  },
});

export default styles;
