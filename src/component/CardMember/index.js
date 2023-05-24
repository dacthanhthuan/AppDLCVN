import React, { useState } from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import styles from "./styles";

const CardMember = ({ name, image, phone, style }) => {

    // const check = isCheck;
    const [isCheck, setIsCheck] = useState(false)
    const onPressCheck = () => {
        setIsCheck(value => !value)
    }

    return (
        <View style={[styles.container, style]}>
            <View style={{ flexDirection: 'row' }}>
                <Image style={styles.icon} source={image} />
                <View style={{
                    flexDirection: 'column', marginLeft: 10, justifyContent: 'space-between'
                }}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.phone}>{phone}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.checkContainer} onPress={onPressCheck}>
                {isCheck ? (
                    <Image style={{ width: 12, height: 12 }} resizeMode="contain" source={require('../../assets/check.png')} />
                ) : null}
            </TouchableOpacity>
        </View>
    )
}

export default React.memo(CardMember);