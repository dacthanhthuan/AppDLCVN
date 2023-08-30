import React from "react"
import styles from "./styles"
import { TextInput } from "react-native"

const ModalInput = ({ value, placeholder, style, typeInput, editable, onChangeText }) => {
    return (
        <TextInput value={value} placeholder={placeholder} style={[styles.modalInput, style]} secureTextEntry={typeInput} editable={editable} onChangeText={onChangeText} />
    )
}

export default React.memo(ModalInput)