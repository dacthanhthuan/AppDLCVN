import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';

const Button = ({text, onPress, style, styleText}) =>{
    return(
        <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
            <Text style={[styles.text, styleText]}>{text}</Text>
        </TouchableOpacity>
    )
}

export default React.memo(Button);
