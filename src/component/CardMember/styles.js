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
        width: 42,
        height: 42,
    },
    name: {
        fontSize: 16,
        color: '#005AA9',
        fontFamily: 'Montserrat',
    },
    phone: {
        fontSize: 13,
        color: '#C2C2C2',
    },
    checkContainer: {
        backgroundColor: '#005AA9',
        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        marginRight: 6
    }
})

export default styles;