import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    marginTop: 15,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  numberAddress: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
    marginLeft: 15,
  },
  address: {
    fontSize: 13,
    color: '#000000',
    marginTop: 10,
    flexWrap: 'wrap',
    marginLeft: 40,
  },
  line: {
    borderWidth: 0.5,
    borderColor: '#C4C4C4',
    marginTop: 10,
  },
  title: {
    fontSize: 13,
    color: '#000000',
  },

  default: {
    width: 75,
    textAlign: 'center',
    fontSize: 13,
    color: '#C51605',
    fontWeight: '500',
    marginTop: 5,
    borderWidth: 1.2,
    borderColor: '#FD8D14',
    padding: 2,
    borderRadius: 10,
  },
});

export default styles;
