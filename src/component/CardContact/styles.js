import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        marginTop: 16
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    name: {
        fontSize: 20,
        color: '#000000',
        fontWeight: '500',
    },
    phone: {
        fontSize: 16,
        color: '#000000',
        fontWeight: '500',
        marginTop: 10
    },
    title: {
        fontSize: 13,
        color: '#000000',
        marginTop: 20
    },
    borderAddressDefault: {
        borderWidth: 1,
        borderColor: '#005AA9',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 12,
        padding: 4
    },
    textAddressDefault: {
        color: '#005AA9',
        fontSize: 14
    }
})

export default styles;