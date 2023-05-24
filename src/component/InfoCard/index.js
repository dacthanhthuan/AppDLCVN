import React from "react";
import { Image, Text, View , TouchableOpacity} from "react-native";
import styles from "./styles";

const InfoCard = ({ text, image, style, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}
         style={[styles.container, style]}>
            <Image style={styles.icon} source={image} />
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

export default React.memo(InfoCard);