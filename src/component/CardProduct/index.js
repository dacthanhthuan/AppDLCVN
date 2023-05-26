import React from 'react'
import { Image, Text, Pressable, View } from 'react-native'
import styles from './styles'

const CardProduct = ({ title, categori, price, style, image, onPress }) => {
    return (
        <View style={[styles.container, style]}>
            <Pressable style={styles.containerView} onPress={onPress} >
                <Image style={styles.image} resizeMode='contain' source={image} />
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.id}>{categori}</Text>
                <Text style={styles.price}>{price} Point</Text>
            </Pressable>
        </View>
    )
}

export default React.memo(CardProduct);

