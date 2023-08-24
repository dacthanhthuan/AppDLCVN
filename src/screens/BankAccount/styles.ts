import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  scrollview: {
    flex: 1,
  },

  contentScrollview: {
    padding: 15,
  },

  button: {
    width: '80%',
    marginBottom: 100,
    alignSelf: 'center',
  },

  errorText: {
    color: 'red',
    paddingVertical: 5,
  },
});

export default styles;
