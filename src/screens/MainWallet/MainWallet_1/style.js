import {StyleSheet, Dimensions} from 'react-native';
import {TextInputAdapter} from 'react-native-reanimated';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../../../global';

const {width: width, height: height} = Dimensions.get('window');
const Style_WalletScreen = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  text: {
    fontSize: 17,
    color: '#8B8787',
    fontWeight: '300',
  },
  textmoney: {
    fontSize: 24,
    color: '#005AA9',
    fontWeight: '400',
  },
  imgWallet: {
    width: 210,
    height: 166,
  },
  bottomsheet: {
    height: height,
    width: width,
    borderWidth: 0.5,
    backgroundColor: 'white',
    borderColor: '#C2C2C2',
    borderRadius: 40,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  line: {
    width: 40,
    height: 5,
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    alignSelf: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 17,
    color: '#005AA9',
    marginBottom: 10,
  },
  view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  view_2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  borderIcon: {
    width: 41,
    height: 41,
    backgroundColor: '#F3FAFF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 23,
    height: 23,
  },
  text_2: {
    fontSize: 15,
    color: '#101014',
    marginLeft: 15,
  },
  imgArrow: {
    width: 17,
    height: 17,
  },

  showMyQrView: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    position: 'absolute',
    bottom: 0,
  },

  qrView: {
    backgroundColor: 'white',
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
    width: 250,
    height: 250,
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

export default Style_WalletScreen;
