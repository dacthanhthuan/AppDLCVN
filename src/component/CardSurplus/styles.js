import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#C2C2C2',
        borderRadius: 7,
        alignItems: 'center',
        padding: 8
    },
    iconContainer: {
        backgroundColor: '#005AA9',
        alignItems: 'center',
        borderRadius: 30,
        padding: 8,
        justifyContent: 'center'
    },
    icon: {
        width: 26,
        height: 26
    },
    title: {
        fontSize: 16,
        fontFamily: 'Montserrat',
        marginBottom: 6,
        color: '#000000'
    },
    value: {
        fontSize: 13,
        fontFamily: 'Montserrat',
        color: '#000000',
        marginTop: 6,
        fontWeight: '700'
    }

})

export default styles;