import React from "react"
import { Image, Text, TouchableOpacity } from 'react-native'
import styles from "./styles"

const ButtonProductMore = () => {
    return (
        <TouchableOpacity style={styles.container}>
            <Image style={styles.icon} resizeMode="contain" source={require('../../assets/Home/more.png')} />
            <Text style={styles.text}>Xem thêm</Text>
        </TouchableOpacity>
    )
}

export default React.memo(ButtonProductMore)