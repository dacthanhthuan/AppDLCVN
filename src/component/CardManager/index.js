import React, { useState } from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import styles from "./styles";
import Checkbox from "../Checkbox";

const CardManager = ({ name, address, phone, style, onPress }) => {

    const [check, setCheck] = useState(false);

    const onPressCheck = () => {
        setCheck(value => !value)
    }

    return (
        <View style={[styles.container, style]}>
            <Checkbox check={check} onPress={onPressCheck} />
            <View style={{ flexDirection: 'column', marginLeft: 12, width: '80%', flexWrap: 'nowrap' }}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.address}>{address}</Text>
                <Text style={styles.address}>+{phone}</Text>
            </View>
            <TouchableOpacity onPress={onPress}>
                <Image style={styles.icon} source={require('../../assets/Rectangle217.png')} />
            </TouchableOpacity>
        </View>
    )
}

export default React.memo(CardManager);