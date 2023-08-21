import React from 'react';
import {Image, SafeAreaView, TextInput, TouchableOpacity} from 'react-native';
import Style_Search from './style';

const Search = ({placeholder, onChangeText, value, onSubmitEditing}) => {
  return (
    <SafeAreaView style={Style_Search.cardsearch}>
      <TextInput
        onChangeText={onChangeText}
        value={value}
        style={Style_Search.textinput}
        placeholder={placeholder}
        onSubmitEditing={onSubmitEditing}
      />
      <TouchableOpacity>
        <Image
          style={Style_Search.imgSearch}
          source={require('../../assets/imgSupplier/ei_search.png')}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Search;
