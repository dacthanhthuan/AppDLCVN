import React from 'react';
import {View, TextInput, Image, TouchableOpacity} from 'react-native';
import styles from './styles';

const Input = ({placeholder, value, onChangeText, onEndEditing}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholderTextColor="#C2C2C2"
        onChangeText={onChangeText}
        placeholder={placeholder}
        value={value}
        onEndEditing={onEndEditing}
        enterKeyHint={'search'}></TextInput>
      <TouchableOpacity>
        <Image
          style={styles.icon}
          source={require('../../assets/Home/ei_search.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(Input);
