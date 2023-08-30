import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 10,
    marginVertical: 10,
    // borderColor: '#C2C2C2',
    // borderWidth: 1,
    //iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    // Android
    elevation: 2,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  moreImagesContainer: {
    position: 'absolute',
    backgroundColor: '#E7E7E7',
    width: 42,
    height: 42,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreImages: {
    color: '#000000',
    fontSize: 14,
  },
  line: {
    borderWidth: 0.5,
    borderColor: '#C4C4C4',
    marginTop: 10,
  },
  textName: {
    fontSize: 16,
    color: '#005AA9',
    fontWeight: '500',
    width: '80%'
  },
  rowFooter: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  textTotal: {
    fontSize: 15,
    color: '#19A538',
    fontWeight: '600',
    // fontFamily: 'Montserrat',
  },
});

export default styles;
