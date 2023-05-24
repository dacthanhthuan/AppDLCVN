import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },

  header: {
    paddingBottom: 5,
  },

  title: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
    paddingTop: 20,
  },

  text: {
    fontSize: 13,
    color: 'black',
  },

  inActiveText: {
    borderColor: 'black',
    borderBottomWidth: 0.3,
  },

  activeText: {
    borderBottomWidth: 1,
    borderColor: '#005AA9',
  },

  buttonText: {
    marginLeft: 20,
    paddingVertical: 10,
  },

  containerText: {
    height: '55%',
  },
});

export default styles;
