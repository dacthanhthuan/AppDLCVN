import React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import styles from './styles';

const Header = ({ text, iconLeft, iconRight, onPressLeft, onPressRight }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPressLeft}>
                <Image style={styles.iconLeft} source={iconLeft} />
            </TouchableOpacity>
            <Text style={styles.text}>{text}</Text>
            <TouchableOpacity onPress={onPressRight}>
                <Image style={styles.iconRight} source={iconRight} />
            </TouchableOpacity>
        </View>
    )
}

export default React.memo(Header);