import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const CardSurplus = ({ style, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
            <View style={styles.iconContainer}>
                <Image style={styles.icon} source={require('../../assets/Rectangle326.png')} />
            </View>
            <View style={{ flexDirection: 'column', marginLeft: 12 }}>
                <Text style={styles.title}>Số dư ví chính</Text>
                <Text style={styles.value}>15,000,000 đ</Text>
            </View>
        </TouchableOpacity>
    )
}

export default React.memo(CardSurplus);