import React from 'react';
import { Image, SafeAreaView, TextInput } from 'react-native';
import Style_Search from './style';

const Search = ({placeholder}) => {
    return (
        <SafeAreaView style={Style_Search.cardsearch}>
            <TextInput style={Style_Search.textinput} placeholder={placeholder} />
            <Image style={Style_Search.imgSearch} source={require('../../assets/imgSupplier/ei_search.png')} />
        </SafeAreaView>
    )
}

export default Search;