import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
    container: {
        width: 104,
        height: 145,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        marginRight: 16,
        marginBottom: 16,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 2,
        backgroundColor: '#FFFFFF',
    },
    icon: {
        width: 46,
        height: 40
    },
    text: {
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center',
        marginTop: 4
    }
})
export default styles