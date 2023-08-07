import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '96%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 10,
    marginBottom: 6,
    paddingHorizontal: 6,
    height: 80,
  },
  rightContainer: {
    marginLeft: 12,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    //iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    // Android
    elevation: 4,
  },
  image: {
    width: 64,
    height: 64,
  },
  rightCard: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    marginLeft: 8,
  },
  title: {
    width: 214,
    fontSize: 13,
    color: '#000000',
    paddingVertical: 10,
  },
  id: {
    fontSize: 13,
    color: '#C2C2C2',
    marginTop: 7,
  },
  price: {
    fontSize: 16,
    color: '#09355C',
    marginTop: 7,
    fontWeight: '500',
  },
  rowPriceSL: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowSL: {
    flexDirection: 'row',
    backgroundColor: '#005AA9',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  buttonSL: {
    color: '#FFFFFF',
    marginHorizontal: 4,
    paddingHorizontal: 3,
  },
});

export default styles;
