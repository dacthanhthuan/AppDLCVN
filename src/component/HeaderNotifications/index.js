import React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import styles from './styles';

const HeaderNotifications = ({ text, iconLeft, onPressLeft, onPressRight }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPressLeft}>
                <Image style={styles.iconLeft} source={iconLeft} />
            </TouchableOpacity>
            <Text style={styles.text}>{text}</Text>
            <TouchableOpacity onPress={onPressRight}>
                <Text style={styles.textHeaderRight}>Đọc tất cả</Text>
            </TouchableOpacity>
        </View>
    )
}

export default React.memo(HeaderNotifications);