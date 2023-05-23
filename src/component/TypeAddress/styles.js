import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        borderColor: '#C2C2C2',
        borderWidth: 1,
        marginRight: 11
    },
    containerActive: {
        borderColor: '#005AA9',
    },
    text: {
        color: '#000000',
        fontSize: 16
    },
    textActive: {
        color: '#005AA9',
    }
})

export default styles;