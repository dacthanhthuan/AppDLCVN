import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
  },
  rowTranfers: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: -22,
    paddingVertical: 16,
    zIndex: 2,
  },
  title: {
    color: '#000000',
    fontSize: 18,
    marginVertical: 10,
  },
  titleLogout: {
    color: 'red',
    fontWeight: '500',
    fontSize: 16
  },
  wallet: {
    width: '100%',
    height: 72,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'white',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000099'
  },
  centeredView: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    width: 300,
    height: 300,
    borderRadius: 25,
    padding: 16,
  },
  modalTitle: {
    fontSize: 22,
    color: '#000000',
    fontWeight: '500'
  },
  modalDescription: {
    fontSize: 16,
    color: '#000000',
    marginVertical: 12,
    textAlign: 'center'
  },

});

export default styles;
