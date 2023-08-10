import {StyleSheet} from 'react-native';

const Style_Detail = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    padding: 15,
  },
  imgProduct: {
    width: 400,
    height: 400,
  },
  container_1: {
    marginTop: 30,
    backgroundColor: '#005AA9',
    width: '25%',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 8,
    borderRadius: 30,
  },
  textquantity: {
    flex: 1,
    textAlign: 'center',
    fontSize: 17,
    color: '#FFFFFF',
  },
  imgIconPlus: {
    marginRight: 5,
    width: 8,
    height: 8,
  },
  imgIconMinus: {
    marginLeft: 5,
    width: 8,
    height: 4,
  },
  container_2: {
    marginTop: 20,
    width: '100%',
  },
  nameproduct: {
    fontSize: 16,
    color: '#000000',
  },
  price_1: {
    marginTop: 8,
    color: '#005AA9',
    fontSize: 20,
    fontWeight: 'bold',
  },
  text_1: {
    fontSize: 15,
    color: '#000000',
    marginTop: 5,
    fontWeight: '400',
  },
  title_1: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 10,
    fontWeight: '500',
  },
  container_3: {
    width: '100%',
    marginTop: 15,
  },
  title_2: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  container_7: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },

  container_8: {
    width: 53,
    height: 53,
    borderRadius: 7,
    borderWidth: 1,
    justifyContent: 'center',
    borderColor: 'rgba(0, 90, 169, 1)',
    backgroundColor: 'rgba(255,255,255,1)',
  },

  imgCart: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },

  fireworkLottieView: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 0,
  },

  stroke_line: {
    marginTop: 8,
    color: '#005AA9',
    fontSize: 20,
    fontWeight: 'bold',
    textDecorationLine: 'line-through',
  },

  decrementPrice: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Style_Detail;
