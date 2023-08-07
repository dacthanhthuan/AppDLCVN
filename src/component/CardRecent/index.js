import React from 'react';
import {Image, Text, TouchableOpacity, Pressable} from 'react-native';
import styles from './styles';

const CardRecent = ({text, style, onClose, onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.container,
        style,
        pressed
          ? {backgroundColor: 'rgba(200, 200, 200, 0.5)'}
          : {backgroundColor: 'rgba(246, 246, 246, 1)'},
      ]}>
      <Text style={styles.text}>{text}</Text>
      <TouchableOpacity onPress={onClose}>
        <Image
          style={styles.icon}
          source={require('../../assets/Rectangle328.png')}
        />
      </TouchableOpacity>
    </Pressable>
  );
};

export default React.memo(CardRecent);
