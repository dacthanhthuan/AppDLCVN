import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        borderRadius: 7,
        padding: 12,
        alignItems: 'center',
        marginBottom: 10,
        marginHorizontal: 2,
        //iOS
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        // Android
        elevation: 2,
    },
    icon: {
        width: 20,
        height: 20,
    },
    text: {
        fontSize: 13,
        color: '#000000',
        marginLeft: 10,
    }
})

export default styles;