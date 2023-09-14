import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  rowHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    fontSize: 20,
    color: '#005AA9',
    textAlign: 'center',
  },
  icon: {
    width: 20,
  },

  button: {
    flex: 1,
    marginLeft: 20,
    alignSelf: 'center',
    height: 45,
    padding: 0,
  },

  listFooterView: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 10,
    gap: 5,
    paddingBottom: 10,
  },

  listFooterHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textTransform: 'capitalize',
    flex: 1,
    borderBottomWidth: 1.5,
    borderColor: 'lightgrey',
    marginBottom: 5,
    paddingVertical: 5,
    left: -10,
  },

  listFooterLabel: {
    color: 'black',
    fontSize: 16,
    fontWeight: '400',
  },

  listFooterItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 10,
  },

  listFooterPrice: {
    fontWeight: '500',
    color: 'black',
    fontSize: 16,
  },

  listFooterProfit: {
    fontWeight: '500',
    color: '#12aa34',
    fontSize: 16,
  },
});

export default styles;
