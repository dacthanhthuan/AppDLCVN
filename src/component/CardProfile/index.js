import React from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import styles from "./styles";

const CardProfile = ({ text, image, id, style }) => {
    return (
        <View style={[styles.container, style]}>
            <View style={{ flexDirection: 'row' }}>
                <Image style={styles.icon} source={image} />
                <View style={{ flexDirection: 'column', marginLeft: 10, justifyContent: 'space-between' }}>
                    <Text style={styles.name}>{text}</Text>
                    <Text style={styles.id}>{id}</Text>
                </View>
            </View>
            <TouchableOpacity>
                <Text style={styles.textProfile}>Xem hồ sơ</Text>
            </TouchableOpacity>
        </View>
    )
}

export default React.memo(CardProfile);