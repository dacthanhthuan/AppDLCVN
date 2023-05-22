import {View, Image, StyleSheet} from 'react-native';
import ImageButton from './ImageButton';
import InputSearch from './InputSearch';
import {memo} from 'react';

const logo = require('../../assets/Home/Rectangle2.png');
const cart = require('../../assets/Home/Vector.png');
const searchSetting = require('../../assets/Home/Rectangle313.png');

const Header = () => {
  return (
    <View style={styles.topContainer}>
      <View style={styles.logoAndCart}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <ImageButton
          containerStyle={styles.cartPressable}
          imageStyle={styles.cart}
          imagesource={cart}
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <InputSearch style={styles.searchInput} />
        <ImageButton
          imagesource={searchSetting}
          containerStyle={styles.searchSettingCont}
          imageStyle={styles.searchSettingStyle}
        />
      </View>
    </View>
  );
};

export default memo(Header);

const styles = StyleSheet.create({
  logo: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    flex: 1,
  },

  topContainer: {
    height: 150,
    width: '100%',
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
    position: 'absolute',
    left: '89.5%',
  },

  logoAndCart: {
    width: '100%',
    height: '35%',
    marginTop: '8%',
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
  },

  searchSettingStyle: {
    width: '65%',
    height: '100%',
  },
});
