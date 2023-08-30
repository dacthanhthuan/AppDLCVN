import {StyleSheet} from 'react-native';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../../global';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  camera: {
    flex: 1,
  },

  titleView: {
    flexDirection: 'row',
    width: WINDOW_WIDTH * 0.6,
    alignSelf: 'center',
    justifyContent: 'space-around',
    marginTop: 50,
  },

  title: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
  },

  image: {
    width: WINDOW_WIDTH * 0.15,
    height: WINDOW_WIDTH * 0.15,
    alignSelf: 'center',
    marginBottom: 10,
  },

  actionView: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 50,
    width: WINDOW_WIDTH * 0.8,
    alignSelf: 'center',
    justifyContent: 'space-around',
  },

  button: {
    maxWidth: WINDOW_WIDTH * 0.25,
  },

  buttonTitle: {
    textAlign: 'center',
    fontWeight: '500',
    color: 'white',
  },

  showMyQrView: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    bottom: 0,
  },

  qrView: {
    backgroundColor: 'white',
    height: 550,
    width: '100%',
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 25,
  },

  outSideQrViewButton: {
    flex: 1,
  },

  logo: {
    width: 200,
    height: 120,
    alignSelf: 'center',
  },

  myQR: {
    width: 210,
    height: 210,
    alignSelf: 'center',
  },

  myQrFullname: {
    fontSize: 25,
    color: '#005aa9',
    textAlign: 'center',
    fontWeight: '500',
    marginTop: 20,
  },

  myQrButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  myQrButton: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    margin: 5,
    padding: 5,
    borderRadius: 10,
  },

  myQrButtonImage: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },

  myQrButtonTitle: {
    textAlign: 'center',
    color: 'black',
    fontSize: 15,
  },

  myQrButtonClose: {
    position: 'absolute',
    right: 15,
    top: 15,
    backgroundColor: '#f2f2f2',
    borderRadius: 180,
    padding: 5,
    zIndex: 1,
  },

  myQrCaptureView: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 25,
  },
});

export default styles;
