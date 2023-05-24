import React from 'react';
import { SafeAreaView, FlatList, Image, Text, View, TouchableOpacity } from 'react-native';
import Style_Statistical from './style';

const Statistical = ({ img, name, pv, style_name, style_pv, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={Style_Statistical.container}>
            <Image style={Style_Statistical.icon} source={img} />
            <Text style={[Style_Statistical.text, style_name]}>{name}</Text>
            <Text style={[Style_Statistical.text, style_pv]}>{pv}</Text>
        </TouchableOpacity >
    )
};

export default Statistical;