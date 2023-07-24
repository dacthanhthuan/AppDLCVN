import React, {useState} from 'react';
import {SafeAreaView, TextInput, TouchableOpacity} from 'react-native';
import style from './style';
import {Icon} from '@rneui/themed';

const Text_Input = ({
  placeholder,
  placeholderTextColor,
  onChangetext,
  value,
  secure: isPassword,
  inputStyle,
  onSubmitEditing,
}) => {
  const [hidePassword, setHidePassword] = useState(true);

  function handlerShowPassword() {
    setHidePassword(!hidePassword);
  }

  return (
    <SafeAreaView style={style.container}>
      <TextInput
        style={[style.textinput, inputStyle]}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        onChangeText={onChangetext}
        value={value}
        enterKeyHint={'done'}
        returnKeyType="next"
        secureTextEntry={isPassword ? hidePassword : false}
        onSubmitEditing={onSubmitEditing}
      />
      {isPassword ? (
        <TouchableOpacity
          style={style.showPassword}
          onPress={handlerShowPassword}
          hitSlop={5}>
          <Icon
            name={hidePassword ? 'eye' : 'eye-with-line'}
            type="entypo"
            size={24}
          />
        </TouchableOpacity>
      ) : null}
    </SafeAreaView>
  );
};
export default Text_Input;
