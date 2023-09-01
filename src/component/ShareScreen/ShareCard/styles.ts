import {StyleSheet} from 'react-native';
import {WINDOW_WIDTH} from '../../../global';

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.8,
    borderColor: 'grey',
    padding: 15,
    paddingRight: 5,
    marginTop: 35,
    borderRadius: 10,
  },

  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    top: -35,
    backgroundColor: '#005aa9',
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    maxWidth: '70%',
  },

  body: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
  },

  linkView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  link: {
    flexDirection: 'row',
    backgroundColor: 'rgba(220,220,220,1)',
    borderRadius: 5,
    paddingLeft: 15,
    width: '75%',
    height: 40,
    marginVertical: 10,
    marginTop: -15,
    justifyContent: 'space-between',
  },

  linkContent: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
    textAlign: 'left',
    width: '70%',
    verticalAlign: 'middle',
  },

  linkShareButton: {
    width: '30%',
    backgroundColor: '#005aa9',
    justifyContent: 'center',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },

  linkShare: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },

  copy: {
    marginVertical: 10,
    width: '30%',
    justifyContent: 'center',
  },

  copyContent: {
    fontSize: 14,
    textAlign: 'center',
  },

  qrcode: {
    width: WINDOW_WIDTH * 0.2,
    height: WINDOW_WIDTH * 0.2,
    marginTop: WINDOW_WIDTH * -0.11,
  },
});

export default styles;
