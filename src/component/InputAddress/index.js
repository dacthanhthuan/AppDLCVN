import React from 'react';
import {View, TextInput, Text} from 'react-native';
import styles from './styles';

const InputAddress = ({
  title,
  keyboardType,
  style,
  onChangeText,
  value,
  multiline = false,
}) => {
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={styles.titleInput}>{title}</Text>
      <TextInput
        style={styles.input}
        keyboardType={keyboardType}
        multiline={multiline}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
};

export default React.memo(InputAddress);
