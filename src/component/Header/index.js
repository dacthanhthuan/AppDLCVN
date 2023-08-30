import React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';

const Header = ({
  text,
  iconLeft,
  iconRight,
  onPressLeft,
  onPressRight,
  containerStyle,
  dataCart
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity onPress={onPressLeft}>
        {iconLeft ? (
          <Image style={styles.iconLeft} resizeMode='contain' source={iconLeft} />
        ) : null}
      </TouchableOpacity>
      <Text style={styles.text}>{text}</Text>
      {iconRight ? (
        <TouchableOpacity onPress={onPressRight}>
          <Image style={styles.iconRight} resizeMode='contain' source={iconRight} />
          {dataCart > 0 ? (
            <View style={{ position: 'absolute', backgroundColor: '#EC2739', padding: 10, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginLeft: 15, marginTop: -8 }}>
              <Text style={{ color: '#FFFFFF', position: 'absolute' }}>{dataCart}</Text>
            </View>
          ) : null}
        </TouchableOpacity>
      ) : (
        <View style={styles.iconRight} />
      )}
    </View>
  );
};

export default React.memo(Header);

import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#FFFFFF',
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
    width: 25,
    height: 25,
    tintColor: '#005AA9'
  },
});