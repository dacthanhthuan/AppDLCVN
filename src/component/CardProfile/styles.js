import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#C2C2C2',
    borderRadius: 7,
    padding: 12,
    marginBottom: 10,
  },
  icon: {
    width: 49,
    height: 49,
    alignSelf: 'center',
  },
  name: {
    width: '100%',
    fontSize: 20,
    color: '#005AA9',
    fontFamily: 'Montserrat',
  },
  id: {
    width: '70%',
    fontSize: 16,
    color: '#C2C2C2',
  },
  textProfile: {
    // position: 'absolute',
    fontSize: 13,
    color: '#005AA9',
  },
});

export default styles;
