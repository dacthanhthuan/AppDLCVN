import { StyleSheet } from "react-native"


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00000099',
        paddingHorizontal: 32
    },
    centeredView: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        width: '100%',
        height: 220,
        borderRadius: 25,
        paddingTop: 30,
        paddingHorizontal: 16,
    },
    icon: {
        width: 40,
        height: 40
    },
    modalTitle: {
        fontSize: 18,
        color: '#000000',
        marginVertical: 20,
        textAlign: 'center'
    },
    modalDescription: {
        fontSize: 16,
        color: '#000000',
        textAlign: 'center'
    },
})

export default styles;