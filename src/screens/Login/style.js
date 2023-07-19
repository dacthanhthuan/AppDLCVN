import {StyleSheet} from 'react-native';

const Style_Login = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    height: '100%',
    alignItems: 'center',
    padding: 15,
  },
  imgLogo: {
    width: 150,
    height: 80,
    marginTop: 40,
  },
  container_1: {
    marginTop: 20,
    width: '90%',
  },
  textLogin: {
    color: '#005AA9',
    fontSize: 20,
    fontWeight: '400',
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
  container_3: {
    width: '100%',
    alignItems: 'flex-end',
    marginTop: 10,
  },
  textForgotpass: {
    color: '#8B8787',
    fontSize: 14,
    fontWeight: '400',
  },
  container_4: {
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
  },
  textNotuser: {
    color: '#8B8787',
    fontSize: 16,
    fontWeight: '300',
  },
  textRegister: {
    color: '#005AA9',
    fontSize: 16,
  },

  textError: {
    fontSize: 13,
    color: 'rgba(255,0,0,1)',
    padding: 10,
  },
});
export default Style_Login;
