import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import Style_Button from './style';

const Button = ({ onPress, text, style }) => {
    return (
        <SafeAreaView>
                <TouchableOpacity onPress={onPress} style={[Style_Button.container, style]}>
                    <Text style={Style_Button.text}>{text}</Text>
                </TouchableOpacity>
        </SafeAreaView>
    )
}
export default Button;