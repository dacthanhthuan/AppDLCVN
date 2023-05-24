import React from 'react'
import { Image, Text, TouchableOpacity } from 'react-native'
import styles from './styles'

const CardProduct = ({ title, categori, price, style, image, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
            <Image style={styles.image} source={image} />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.id}>{categori}</Text>
            <Text style={styles.price}>{price} Point</Text>
        </TouchableOpacity>
    )
}

export default React.memo(CardProduct);

