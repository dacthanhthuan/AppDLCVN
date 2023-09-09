import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 15,
  },

  header: {
    padding: 15,
  },

  avatar: {
    width: 160,
    height: 160,
    alignSelf: 'center',
  },

  infoList: {
    flex: 1,
  },

  infoListContent: {
    padding: 15,
    gap: 15,
  },

  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingLeft: 15,
    fontSize: 16,
  },

  button: {
    width: '90%',
    alignSelf: 'center',
  },

  errorText: {
    color: 'red',
    fontSize: 16,
    marginHorizontal: 10,
  },
});

export default styles;
