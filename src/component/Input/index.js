import React from 'react'
import { View, TextInput, Image, TouchableOpacity} from 'react-native'
import styles from './styles'

const Input = ({ placeholder, value, onChangeText }) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                placeholderTextColor='#C2C2C2'
                onChangeText={onChangeText}
                placeholder={placeholder}
                value={value}></TextInput>
            <TouchableOpacity>
                <Image style={styles.icon} source={require('../../assets/Home/ei_search.png')} />
            </TouchableOpacity>
        </View>
    )
}

export default React.memo(Input);

