import React from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import styles from "./styles";

const CardTeamThree = ({ name, image, phone, style, pv }) => {
    return (
        <View style={[styles.container, style]}>
            <View style={{ flexDirection: 'row' }}>
                <Image style={styles.icon} source={image} />
                <View style={{ flexDirection: 'column', marginLeft: 10, justifyContent: 'space-between' }}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.phone}>{phone}</Text>
                </View>
            </View>
            <TouchableOpacity>
                <Text style={styles.textPV}>{pv} PV</Text>
            </TouchableOpacity>
        </View>
    )
}

export default React.memo(CardTeamThree);