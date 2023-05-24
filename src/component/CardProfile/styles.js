import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1, 
        borderColor: '#C2C2C2',
        borderRadius: 7,
        padding: 12,
        marginBottom: 10,
    },
    icon: {
        width: 49,
        height: 49,
    },
    name: {
        fontSize: 20,
        color: '#005AA9',
        fontFamily: 'Montserrat'
    },
    id: {
        fontSize: 16,
        color: '#C2C2C2',
    },
    textProfile:{
        fontSize: 13, 
        color: '#005AA9'
    }
})

export default styles;