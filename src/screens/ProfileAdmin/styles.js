import {StyleSheet} from 'react-native';

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
    justifyContent: 'center',
    marginTop: -22,
    marginBottom: 10,
    paddingVertical: 14,
    zIndex: 2,
  },
  title: {
    color: '#000000',
    fontSize: 17,
    marginVertical: 10,
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
});

export default styles;
