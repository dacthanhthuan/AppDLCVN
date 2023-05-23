import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';

const TypeAddress = ({ text, onPress, check }) => {
    return (
      <TouchableOpacity onPress={() => onPress(text)} style={[styles.container, check === text ? styles.containerActive : {}]}>
        <Text style={[styles.text, check === text ? styles.textActive : {}]}>{text}</Text>
      </TouchableOpacity>
    );
  };

export default React.memo(TypeAddress);