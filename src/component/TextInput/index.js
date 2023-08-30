import React from "react";
import { SafeAreaView, TextInput } from "react-native";
import Style_Input from "./style";

const Text_Input = ({ placeholder, onChangeText, value, password }) => {
    return (
        <SafeAreaView>
            <TextInput
                style={Style_Input.textinput}
                placeholder={placeholder}
                onChangeText={onChangeText}
                value={value}
                secureTextEntry={password}
            />
        </SafeAreaView>
    )
}
export default Text_Input;