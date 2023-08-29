import React, {useState} from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import styles from './styles';

const CardMember = ({name, image, phone, style, isSelected, onPress}) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <View style={{flexDirection: 'row'}}>
        <Image style={styles.icon} resizeMode="contain" source={image} />
        <View
          style={{
            flexDirection: 'column',
            marginLeft: 10,
            justifyContent: 'space-between',
          }}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.phone}>{phone}</Text>
        </View>
      </View>
      <View style={styles.checkContainer}>
        {isSelected ? (
          <Image
            style={{width: 12, height: 12}}
            resizeMode="contain"
            source={require('../../assets/check.png')}
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(CardMember);
