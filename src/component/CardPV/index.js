import React from "react";
import { Image, Text, TouchableOpacity } from 'react-native'
import styles from "./styles";

const CardPV = ({ image, name, pv, style }) => {
    return (
        <TouchableOpacity style={styles.container}>
            <Image style={styles.icon} source={image} />
            <Text style={[styles.text, style]}>{name}</Text>
            <Text style={[styles.text, style]}>{pv} PV</Text>
        </TouchableOpacity>
    )
}

export default React.memo(CardPV);