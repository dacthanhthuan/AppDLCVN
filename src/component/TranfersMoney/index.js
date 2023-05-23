import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import styles from './styles';

const Button = ({text, onPress, image}) =>{
    return(
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Image style={styles.icon} source={image}/>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

export default React.memo(Button);