import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
    },
    containerItem: {
        width: '100%',
        backgroundColor: '#019BDB',
        padding: 16,
        borderRadius: 10,
    },
    textBank: {
        color: '#FFFFFF',
        fontSize: 20
    },
    textBankAccount: {
        color: '#FFFFFF',
        fontSize: 26,
    },
    textAddBank: {
        color: '#005AA9',
        fontSize: 16
    },
    containerFooter: {
        flexDirection: 'row',
        marginTop: 16
    },
    textFooterTitle: {
        fontSize: 14,
        color: '#FFFFFF'
    },
    textFooterValue: {
        fontSize: 18,
        color: '#FFFFFF'
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00000099',
    },
    centeredView: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        width: 350,
        height: 180,
        borderRadius: 25,
        paddingVertical: 16,
        paddingHorizontal: 6
    },
    modalTitle: {
        fontSize: 22,
        color: '#000000',
        fontWeight: '500',
        marginBottom: 8
    },
    textTitle: {
        fontSize: 16,
        marginTop: 8,
        color: '#000000'
    },
    button: {
        marginTop: 16,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#005AA9',
        padding: 8
    },
    textButton: {
        fontSize: 18,
        color: '#065FD4',
        fontWeight: '500'
    },
    icon: {
        width: 46,
        height: 46,
        marginLeft: 8
    }
})

export default styles;
