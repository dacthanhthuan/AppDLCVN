import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const CardSurplus = ({ style, onPress, money, title }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
            <View style={styles.iconContainer}>
                <Image style={styles.icon} source={require('../../assets/Rectangle326.png')} />
            </View>
            <View style={{ flexDirection: 'column', marginLeft: 12 }}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.value}>{money}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default React.memo(CardSurplus);