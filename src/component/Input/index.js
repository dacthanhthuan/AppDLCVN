import React from 'react';
import {View, TextInput, Image, TouchableOpacity} from 'react-native';
import styles from './styles';

const Input = ({
  placeholder,
  value,
  onChangeText,
  onEndEditing,
  onSubmitEditing,
  focus,
  clearTextOnFocus,
  onFocus,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholderTextColor="#C2C2C2"
        onChangeText={onChangeText}
        placeholder={placeholder}
        value={value}
        autoFocus={focus}
        onEndEditing={onEndEditing}
        onSubmitEditing={onSubmitEditing}
        enterKeyHint={'search'}
        clearTextOnFocus={clearTextOnFocus}
        onFocus={onFocus}
      />
      <TouchableOpacity onPress={onSubmitEditing}>
        <Image
          style={styles.icon}
          source={require('../../assets/Home/ei_search.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(Input);
