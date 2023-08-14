import React from 'react';
import {SafeAreaView, TextInput, Text} from 'react-native';
import Style_DetailInput from './style';

const Detail_Input = ({
  text,
  placeholder,
  style,
  onChangeText,
  value,
  editable = true,
}) => {
  return (
    <SafeAreaView style={{marginVertical: 5}}>
      <Text style={Style_DetailInput.text}>{text}</Text>
      <TextInput
        style={[Style_DetailInput.input, style]}
        placeholder={placeholder}
        multiline
        onChangeText={onChangeText}
        value={value}
        editable={editable}
      />
    </SafeAreaView>
  );
};

export default Detail_Input;
