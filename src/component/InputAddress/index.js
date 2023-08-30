import React from 'react'
import { View, TextInput, Text } from 'react-native'
import styles from './styles'

const InputAddress = ({ title, keyboardType, style, value, onChangeText }) => {
    return (
        <View style={[styles.inputContainer, style]}>
            <Text style={styles.titleInput}>{title}</Text>
            <TextInput
                style={styles.input}
                keyboardType={keyboardType}
                multiline={true}
                numberOfLines={2}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    )
}

export default React.memo(InputAddress);

