import React from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import styles from "./styles";

const CardMember = ({ item, style, isSelected, onPress }) => {
    return (
        <View style={[styles.container, style]}>
            <View style={{ flexDirection: 'row' }}>
                {item?.avatar ? (
                    <Image style={styles.icon} resizeMode="contain" source={{ uri: item?.avatar }} />
                ) : (
                    <Image style={styles.icon} resizeMode="contain" source={require('../../assets/Rectangle312.png')} />
                )}
                <View style={{ flexDirection: 'column', marginLeft: 10, justifyContent: 'space-between' }}>
                    <Text style={styles.name}>{item?.fullname}</Text>
                    <Text style={styles.phone}>{item?.mobile}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.checkContainer} onPress={onPress}>
                {isSelected ? (
                    <Image style={{ width: 12, height: 12 }} resizeMode="contain" source={require('../../assets/check.png')} />
                ) : null}
            </TouchableOpacity>
        </View>
    );
}

export default CardMember;
