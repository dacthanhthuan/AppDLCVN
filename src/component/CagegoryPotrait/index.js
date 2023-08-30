import React from "react"
import { Image, View, TouchableOpacity } from "react-native"
import styles from "./styles"
const CagegoryPotrait = ({ img }) => {
    return (
        <TouchableOpacity style={styles.container}>
            <Image style={styles.image} source={{ uri: img }} />
        </TouchableOpacity>
    )
}

export default React.memo(CagegoryPotrait)