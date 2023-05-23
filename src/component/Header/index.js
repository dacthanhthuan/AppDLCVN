import React from "react";
import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Style_Header from "./style";

const Header = ({ onPress, iconLeft, title, iconRight, style_iconBack }) => {
    return (
        <SafeAreaView style={Style_Header.container}>
            <TouchableOpacity onPress={onPress}>
                <Image style={[Style_Header.icon, style_iconBack]} source={iconLeft} />
            </TouchableOpacity>
            <Text style={Style_Header.title}>{title}</Text>
            {/* <TouchableOpacity onPress={onPress}>
                <Image style={Style_Header.icon} source={iconRight} />
            </TouchableOpacity> */}
        </SafeAreaView>
    )
};

export default Header;