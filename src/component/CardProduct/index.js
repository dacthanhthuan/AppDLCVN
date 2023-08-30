import React from 'react'
import { Image, Text, Pressable, View } from 'react-native'
import styles from './styles'

const CardProduct = ({ title, categori, price, style, image, onPress }) => {
    return (
        <View style={[styles.container, style]}>
            <Pressable style={styles.containerView} onPress={onPress} >
                {image ? (
                    <Image style={styles.image} resizeMode='contain' source={{ uri: image }} />
                ) : (<View style={styles.image} />)}
                <Text style={styles.title} numberOfLines={2}>{title}</Text>
                <Text style={styles.id}>{categori}</Text>
                <Text style={styles.price}>{price}</Text>
            </Pressable>
        </View>
    )
}

export default React.memo(CardProduct);

