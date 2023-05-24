import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 7,
        padding: 12,
        marginBottom: 10,
        elevation: 2,
        marginHorizontal: 2
    },
    icon: {
        width: 37,
        height: 37,
    },
    name: {
        fontSize: 14,
        color: '#000000',
    },
    phone: {
        fontSize: 10,
        color: '#8B8787',
    },
    textPV: {
        fontSize: 14,
        color: '#09355C'
    }
})

export default styles;