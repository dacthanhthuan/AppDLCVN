import {StyleSheet} from 'react-native';
import {
  HEADER_EXPAND_HEIGHT,
  HEADER_COLLAPSE_HEIGHT,
} from '../../../screens/Home/styles';

export default styles = StyleSheet.create({
  logo: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    flex: 1,
  },

  expandsStyle: {
    height: '100%',
    width: '100%',
    backgroundColor: '#005AA9',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },

  collapseStyle: {
    height: 53,
    width: '100%',
    paddingTop: 7,
    backgroundColor: '#005AA9',
  },

  cart: {
    width: '65%',
    height: '100%',
  },

  cartPressable: {
    width: '10%',
    height: '50%',
    marginTop: '1%',
    top: HEADER_EXPAND_HEIGHT * 0.35 * 0.1,
    position: 'absolute',
    left: '89.5%',
  },

  logoAndCart: {
    width: '100%',
    height: '35%',
    marginTop: HEADER_EXPAND_HEIGHT * 0.2,
    flexDirection: 'row',
  },

  searchInput: {
    width: '82%',
    justifyContent: 'center',
    marginLeft: '3%',
  },

  searchSettingCont: {
    width: '10%',
    height: '50%',
    position: 'absolute',
    left: '89.5%',
    alignSelf: 'center',
    top: '10%',
  },

  searchSettingStyle: {
    width: '65%',
    height: '100%',
  },

  search: {
    width: '100%',
    height: '100%',
    tintColor: 'white',
    transform: [{scale: 1.2}],
  },

  searchPressable: {
    width: '10%',
    height: '50%',
    marginTop: '1%',
    position: 'absolute',
    left: '2%',
    top: -HEADER_COLLAPSE_HEIGHT * 0.1,
  },

  searchContainer: {
    flexDirection: 'row',
  },
});
