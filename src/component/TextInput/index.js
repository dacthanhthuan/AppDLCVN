import React from 'react';
import {SafeAreaView, TextInput} from 'react-native';
import Style_Input from './style';

const Text_Input = ({placeholder, onChangetext, value}) => {
  return (
    <SafeAreaView>
      <TextInput
        style={Style_Input.textinput}
        placeholder={placeholder}
        onChangeText={onChangetext}
        value={value}
      />
    </SafeAreaView>
  );
};
export default Text_Input;
