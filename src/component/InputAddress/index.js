import React from 'react'
import { View, TextInput, Text } from 'react-native'
import styles from './styles'

const InputAddress = ({ title, keyboardType , style}) => {
    return (
        <View style={[styles.inputContainer, style]}>
            <Text style={styles.titleInput}>{title}</Text>
            <TextInput
                style={styles.input}
                keyboardType={keyboardType}
                multiline={true}
                numberOfLines={2}
            />
        </View>
    )
}

export default React.memo(InputAddress);

