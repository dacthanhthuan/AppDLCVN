import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

const CardRecent = ({ text, style }) => {
    return (
        <View
            style={[styles.container, style]}>
            <Text style={styles.text}>{text}</Text>
            <TouchableOpacity>
                <Image style={styles.icon} source={require('../../assets/Rectangle328.png')} />
            </TouchableOpacity>
        </View>
    )
}

export default React.memo(CardRecent);