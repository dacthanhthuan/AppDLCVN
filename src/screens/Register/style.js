import {StyleSheet} from 'react-native';

const Style_Register = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    alignItems: 'center',
    padding: 15,
  },
  imgLogo: {
    width: 100,
    height: 50,
  },
  container_1: {
    marginTop: 10,
    width: '90%',
  },
  textRegister: {
    color: '#005AA9',
    fontSize: 20,
    fontWeight: '400',
  },
  container_4: {
    flexDirection: 'row',
    marginTop: 20,
  },
  textNotuser: {
    color: '#8B8787',
    fontSize: 16,
    fontWeight: '300',
  },
  textLogin: {
    color: '#005AA9',
    fontSize: 16,
  },
  textError: {
    fontSize: 13,
    color: 'rgba(255,0,0,1)',
    padding: 10,
  },
});

export default Style_Register;
