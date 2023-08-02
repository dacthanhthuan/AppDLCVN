import React from 'react';
import {TouchableOpacity, Text, View, Image} from 'react-native';

const Header = ({
  text,
  iconLeft,
  iconRight,
  onPressLeft,
  onPressRight,
  containerStyle,
  showCartBadge,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity onPress={onPressLeft}>
        <Image style={styles.iconLeft} resizeMode="contain" source={iconLeft} />
      </TouchableOpacity>
      <Text style={styles.text}>{text}</Text>
      {iconRight ? (
        <TouchableOpacity onPress={onPressRight}>
          <Image
            style={styles.iconRight}
            resizeMode="contain"
            source={iconRight}
          />
          {showCartBadge ? <CartBadge style={styles.cartBadge} /> : null}
        </TouchableOpacity>
      ) : (
        <View style={styles.iconRight} />
      )}
    </View>
  );
};

export default React.memo(Header);

import {StyleSheet} from 'react-native';
import CartBadge from '../CartBadge';
const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 20,
    color: '#005AA9',
  },
  iconLeft: {
    width: 20,
    height: 20,
  },
  iconRight: {
    width: 35,
    height: 35,
  },
  cartBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
  },
});
