import React from "react"
import { Image, View, Text, TouchableOpacity } from "react-native"
import styles from "./styles"
const CagegorySmall = ({ img, text }) => {
    return (
        <TouchableOpacity style={styles.container}>
            <Image style={styles.icon} source={{ uri: img }} />
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

export default React.memo(CagegorySmall)