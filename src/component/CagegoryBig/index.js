import React from "react"
import { Image, Text, TouchableOpacity } from "react-native"
import styles from "./styles"
const CagegoryBig = ({ img, text }) => {
    return (
        <TouchableOpacity style={styles.container}>
            <Image style={styles.icon} source={{ uri: img }} />
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

export default React.memo(CagegoryBig)