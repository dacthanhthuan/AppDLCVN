import {StyleSheet} from 'react-native';

const StyleSupplier = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 20,
    color: '#005AA9',
    width: '100%',
    textAlign: 'center',
    padding: 14,
  },
  container_1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    padding: 14,
    paddingTop: -14,
  },
  imgSetting: {
    width: 25,
    height: 25,
    marginTop: 10,
  },
  container_2: {
    height: 100,
    marginTop: 10,
    flexDirection: 'row',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: 'rgba(194,194,194,1)',
    padding: 10,
  },
  imgSupplier: {
    width: 65,
    height: 65,
  },
  container_3: {
    width: '84%',
    marginLeft: 20,
    height: 60,
  },
  container_4: {
    flexDirection: 'row',
    width: '80%',
    marginLeft: 20,
  },
  name: {
    color: '#000000',
    fontSize: 16,
  },
  detail: {
    marginTop: 3,
    color: '#000000',
    fontSize: 13,
    fontWeight: '300',
  },
  quantity: {
    color: '#005AA9',
    fontSize: 13,
    width: 100,
    fontWeight: '300',
  },
  city: {
    color: '#000000',
    fontSize: 13,
    fontWeight: '300',
    marginLeft: 60,
  },
});

export default StyleSupplier;
