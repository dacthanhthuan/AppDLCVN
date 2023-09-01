import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.8,
    borderColor: 'grey',
    padding: 15,
    borderRadius: 10,
  },

  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },

  body: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
  },

  codeView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  code: {
    backgroundColor: 'rgba(220,220,220,1)',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '50%',
    marginVertical: 10,
  },

  codeContent: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#005aa9',
    textAlign: 'center',
    verticalAlign: 'middle',
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
});

export default styles;
