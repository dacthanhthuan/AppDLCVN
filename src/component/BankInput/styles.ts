import {StyleSheet} from 'react-native';

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

  textInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 6,
    paddingHorizontal: 10,
  },

  inputView: {
    justifyContent: 'center',
    marginTop: 10,
  },

  close: {
    position: 'absolute',
    alignSelf: 'center',
    right: 5,
    padding: 2,
    borderRadius: 180,
    backgroundColor: '#f2f2f2',
  },

  image: {
    width: 22,
    height: 22,
  },
});

export default styles;
